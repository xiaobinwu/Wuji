<template lang="jade">
	div.footer(:class="{fixed: isFixed}")
		div.left-section
			share
		div.center-section Copyright © 2015 - 2017 吾记v1.0
		div.right-section 粤ICP备17034106号
</template>
<script>
    import Vue from 'vue'
    import Browser from 'utils/browser'
    import share from './share'
    export default{
        name: 'footer',
        data(){
        	return{
        		isFixed: false,
        		isie: Browser.isIE(),
        		winHeight: this.isie ? document.documentElement.clientHeight : window.innerHeight
        	}
        },
        mounted(){
        	this.ininEvent();
        },
        methods:{
        	ininEvent(){
				const MutationObserver = window.MutationObserver
				  || window.WebKitMutationObserver
				  || window.MozMutationObserver, _self = this;
				const observeMutationSupport = !!MutationObserver;
				if(observeMutationSupport){
					let observer = new MutationObserver(function(records){
						_self.computed(document.body.offsetHeight);
					});
					const  options = {
	  					'childList': true,
	  					'subtree': true
					};
					observer.observe(document.body, options);
				}else{
					setInterval(()=>{ _self.computed(document.body.offsetHeight); }, 500);
					console.log('MutationObserver not support!');
				}
        	},
        	computed(height){
        		if(this.winHeight - height >= 100){
        			this.isFixed = true;
        		}else{
        			this.isFixed = false;
        		}
        	}
        },
        watch:{
        },
        components: {
        	share
        }
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