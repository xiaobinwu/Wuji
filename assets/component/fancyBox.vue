<template lang="jade">
	transition(name="fancy", mode="out-in")
		div.fancy(v-show="visible")
			div.box#box(v-for="(item, index) in list")
				transition(name="fancy", mode="out-in")
					img(:src="item.url", :style="imgStyle", :index="index", v-show="index === pos")
			div.pagination
				div.prev.step(@click="prev")
				div.next.step(@click="next")
			div.mask
			i.el-icon-close(@click="close")
</template>
<script>
    import Vue from 'vue'
    import Browser from 'utils/browser'
    export default{
        name: 'fancyBox',
        props: {
            list: {
                type: Array,
                default: true
            },
            visible:{
            	type: Boolean,
            	default: false
            },
            position: {
            	type: Number,
            	required: true
            }
        },
        data(){
        	return{
        		isie: Browser.isIE(),
        		winWidth: this.isie ? document.documentElement.clientWidth : window.innerWidth,
        		winHeight: this.isie ? document.documentElement.clientHeight : window.innerHeight,
        		paginationTop: 0,
        		pos: this.position
        	}
        },
        mounted(){
        	this.init();
        },
        computed:{
        	imgStyle(){
        		return{
	        		maxHeight: this.winHeight + 'px',
	        		maxWidth: (this.winWidth - 200) + 'px'
        		}
        	}
        },
        watch: {
        	position(val){
        		this.pos = val;
        	}
        },
        methods:{
        	init(){
        		window.a  =this
        		let _self = this;
        		this.box = document.getElementById('box');
        		window.onresize = () => {
	        		_self.winWidth = _self.isie ? document.documentElement.clientWidth : window.innerWidth;
	        		_self.winHeight = _self.isie ? document.documentElement.clientHeight : window.innerHeight;
        		};
        	},
        	close(){
        		this.$emit('close');
        	},
        	prev(){
        		if(this.pos == 0){
        			return;
        		}
        		this.pos--;
        	},
        	next(){
        		const index = this.pos;
        		if(this.pos == this.list.length -1){
        			return;
        		}
        		this.pos++;
        	}
        },
        components: {}
    }
</script>
<style lang="sass" scoped>
	@import "../public/scss/_variables.scss";
	@import "../public/scss/_transition.scss";
	@mixin position($position){
		position: $position;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.fancy{
		@include position(fixed);
		z-index: 2999;
		.box{
			@include position(fixed);
			z-index: 3001;
			img{
				@include position(absolute);
				margin: auto;

			}
		}
		.mask{
			@include position(fixed);
			z-index: 3000;
			background-color: rgba(0,0,0,.9);
		}
		.pagination{
			position: absolute;
			top: 50%;
			left:50%;
			transform: translate(-50%, -50%);
			width: 100%;
			height: 70px;
			z-index: 3003;
			.step{
				background: url(../public/images/dist/banner_arrow.png) no-repeat;
				width: 70px;
    			height: 70px;
    			cursor: pointer;
			}
			.next{
				margin-right: 20px;
				float: right;
				background-position: left bottom;
			}
			.prev{
				float: left;
				margin-left: 20px;
				background-position: left top;
			}
		}
		.el-icon-close{
			position: fixed;
			right: 35px;
			top: 35px;
			font-size: 20px;
			color: $white;
			z-index: 3002;
			cursor: pointer;
		}
	}
</style>