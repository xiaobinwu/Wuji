<template lang="jade">
	button(:disabeld="disabled", @click="fn") {{text}}
</template>
<script>
    import Vue from 'vue'
    export default{
        name: 'countDown',
        data(){
        	return {
        		time: 0,
        		disabled: false
        	}
        },
        props: {
        	sec: {
        		type: Number,
        		default: 60
        	},
        	start: {
        		type: Boolean,
        		default: false
        	},
        	callback: {
        		type: Function
        	}
        },
        watch: {
        	start(bol){
        		if(bol === true){
        			this.run();
        		}
        	},
        	time(val){
        		if(val > 0){
        			this.disabled = true;
        		}else{
        			this.disabled = false;
        		}
        	}
        },
        methods: {
        	run(){
        		this.time = this.sec;
        		this.countDown();
        	},
        	countDown(){
                if(this.time > 0) {
                    this.time--;
                    setTimeout(this.countDown, 1000);
                }else{
                	this.$emit('countDown');
                }
        	},
        	fn(){
        		if(!this.disabled){
        			this.callback && this.callback();
        		}
        	}
        },
        computed: {
        	text(){
        		return this.time > 0 ? this.time + '秒后重新获取' : '获取验证码';
        	}
        },
        components: {}
    }
</script>
<style lang="sass">
	@import "../public/scss/_variables.scss";
	
</style>