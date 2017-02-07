<template lang="jade">
	div.timeline(:style="timeLineStyle")
		div.line
		ul
			li(v-for="n in 10", :style="{marginLeft: n % 2 === 0 ? liEvenStyle : 0}") 
				div.item-container
					div.item-header 2017.01.29 周日
					div.item-content 2011-2013在学校获得了各种奖项2011-2013在学校获得了各种奖项2011-2013在学校获得了各种奖项					
</template>
<script>
    import Vue from 'vue'
    import t from '../utils/transform'
    export default{
        name: 'timeline',
        props: {
            width: {
                type: [String, Number],
                required: true
            }
        },
        computed: {
        	timeLineStyle(){
				return {
	                width: t.transformCssUnit(this.width)
	            }       		
        	},
        	liEvenStyle(){
				return t.transformCssUnit(15 - this.width);      		
        	}
        },
        components: {}
    }
</script>
<style lang="sass">
	@import "../public/scss/_variables.scss";
	@import "../public/scss/_mixins.scss";
	$border-radius: 5px;
	$item-padding: 10px;
	.timeline{
		position: relative;
		float: right;
		.line{
			width: 1px;
			height: 100%;
			background-color: $gray;
			position: absolute;
			left: 7px;
			z-index: -1;
		}
		ul{
			li{
				box-sizing: border-box;
				position: relative;
				width: 100%;
			    padding-left: 25px;
			    line-height: 30px;
			    margin-bottom: 30px;
				&:before{
					content: '';
					width: 13px;
					height: 13px;
					background-color: #f5f5f5;
					border: 1px solid $main;
					border-radius: $circle-radius;
					position: absolute;
					top: 15px;
				}
				&:after{
					content: '';
					width: 0;
					height: 0;
					border-width: 8px;
					border-style: solid;
					position: absolute;
					top: 13px;
				}
				&:nth-child(odd){
					&:before{
						left: 0;
					}		
					&:after{
						border-color: transparent $main transparent transparent;
						left: 9px;
					}			
				}
			    &:nth-child(even){
					padding: 0 25px 0 0;
					&:before{
						right: 0;
					}
					&:after{
						border-color: transparent transparent transparent $main;
						right: 9px;
					}						
			    }			
			}
		}
		.item-container{
			display: block;
			width: 100%;
			box-shadow: 0 2px 0 rgba(0,0,0,.2);
			border-radius: 5px;
			.item-header{
				padding: 0 $item-padding;
				height: 40px;
				line-height: 40px;
				background-color: $main;
				border: 1px solid $main;
				color: $white;
				border-top-left-radius: $border-radius; 
				border-top-right-radius: $border-radius; 
			}
			.item-content{
				padding: $item-padding;
				color: $gray;
				border: 1px solid rgba(0,0,0,.2);
				border-top: 0;
				border-bottom-left-radius: $border-radius; 
				border-bottom-right-radius: $border-radius; 
			}
		}
	}
</style>