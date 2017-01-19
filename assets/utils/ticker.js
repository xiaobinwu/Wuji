/*
* tiker 工具
*/

/*
* 定时器
* @params:
*/
var TickerUtil = (function(){

	function Ticker(fn, sec){
		this.sec = sec || 300;
	}

	Ticker.prototype.exec = function(fn){
		var _self = this;
		if(this.ticker){
			clearTimeout(this.ticker);
		}
		this.ticker = setTimeout(function(){
			fn && fn();
			_self.ticker = null;
		}, this.sec)
	}

	return{
		create: function(sec){
			return new Ticker(sec);
		}
	}
})()

module.exports = TickerUtil;