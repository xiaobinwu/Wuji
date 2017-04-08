/*
策略模式
 */
const strategys = {

	trim: (str) =>{
		return str.replace(/\s/g, '');
	},

	//判断是否为空
	isNotEmpty: (value, errorMsg, _this) => {
		if(value === ''){
			return errorMsg;
		}
	},

	//限制最小长度
	minLength: (value,length,errorMsg, _this) => {
        if(value.length < length) {
            return errorMsg;
        }
    },

    //判断密码前后是否一致
    confirmPwd: (value, pwd, errorMsg, _this) => {
    	if(_this.trim(value) !== _this.trim(pwd)){
    		return errorMsg;
    	}
    },

    // 手机号码格式
    mobileFormat: (value,errorMsg, _this) => {
        if(!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    },

    //邮箱格式
    emailFormat: (value,errorMsg, _this) => {
        if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
            return errorMsg;
        }
    },

}

class Validator{
	constructor(){
	    this.cache = [];  // 保存效验规则
	}
	add(value,rules){
		for(let i = 0, rule; rule = rules[i++]; ){
			let strategyAry = rule.strategy.split(":");
			const errorMsg = rule.errorMsg;
			this.cache.push(() => {
                let strategy = strategyAry.shift();
                strategyAry.unshift(value);
                strategyAry.push(errorMsg);
                strategyAry.push(strategys);
                return strategys[strategy](...strategyAry);
			})
		}
		return this;
	}
	start(){
		for(let i = 0, validatorFunc; validatorFunc = this.cache[i++]; ) {
			const msg = validatorFunc();
			if(msg) {
				return msg;
			}
		}
	}
}

export default Validator

