<template lang="jade">
	div.footer(:class="{fixed: isFixed}")
		div.left-section  不知道写什么
		div.center-section Copyright © 2017 吾记
		div.right-section 不知道写什么
</template>
<script>
    import Vue from 'vue'
    import Browser from 'utils/browser'
    export default{
        name: 'footer',
        data(){
        	return{
        		isFixed: false,
        		isie: Browser.isIE(),
        		winHeight: this.isie ? document.documentElement.clientHeight : window.innerHeight
        	}
        },
        props:{
        	bodyHeight: Number
        },
        watch:{
        	bodyHeight(newVal){
        		if(this.winHeight - newVal >= 100){
        			this.isFixed = true;
        		}else{
        			this.isFixed = false;
        		}
        	}
        },
        components: {}
    }  
</script>
<style lang="sass">
	@import "../public/scss/_variables.scss";
	.footer{
		&.fixed{
			position: fixed;
			left: 0;
			bottom: 0;
		}
		width: 100%;
		min-width: $container-width;
		display: flex;
		flex-flow: row wrap;
		box-pack: justify;
		justify-content: space-between;
		box-sizing: border-box;
		height: 100px;
		padding: 40px;
		background-color: $white;
		.center-section{
			margin-left: auto;
		    margin-right: auto;
		    text-align: center;			
		}
	}
</style>