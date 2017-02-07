<template lang="jade">
	div.sidebar
		button.burger-icon(@click="open")
			i.fa.fa-bars(aria-hidden="true")
		div.aside-shade(@click="close", :class="{active: isAcitve}")
		div.sidebar-left(:class="{open: isAcitve}")
			div.sidebar-header
				div.sidebar-header-top
					Avatar.sidebar-avatar(src="https://llp0574.github.io/img/avatar.png", width="54", height="54")
					button.recover-icon(@click="close")
						i.fa.fa-reply(aria-hidden="true")
				div.sidebar-header-dec
					div.username 24k小清新
					div.starnum 
						span 星星&nbsp;
						i.el-icon-star-off
						span &nbsp;x 6
					div.dec(title="态度决定一切态度决定一切态度决定一切态度决定一切") 态度决定一切态度决定一切态度决定一切态度决定一切
			div.sidebar-content
				el-menu.el-menu-vertical-demo(:default-active="routeIndex",@open="handleOpen", @close="handleClose", @select="handleSelect", :unique-opened="true")
					el-menu-item(index="3")
						i.fa.fa-file-text
						日记	
					el-menu-item(index="4")
						i.fa.fa-group
						过客	
					el-submenu(index="1")
						template(slot="title")
							i.fa.fa-user-circle-o
							我的
						el-menu-item-group(title="账户管理")
							el-menu-item(index="1-1")
								i.fa.fa-user-o
								资料修改
							el-menu-item(index="1-2")
								i.fa.fa-paper-plane-o
								续费高级账户	
						el-menu-item-group(title="更多")
							el-menu-item(index="1-3")
								i.fa.fa-thumbs-o-up
								好评鼓励
							el-submenu(index="1-4")
								template(slot="title") 
									i.fa.fa-clone
									更多功能								
								el-menu-item(index="1-4-1")
									导出日记
								el-menu-item(index="1-4-2")
									提醒写日记
								el-menu-item(index="1-4-3")
									我的收藏
								el-menu-item(index="1－4-4")
									垃圾箱
							el-submenu(index="1-5")
								template(slot="title") 
									i.fa.fa-cog
									设置								
								el-menu-item(index="1-5-1")
									意见反馈
								el-menu-item(index="1-5-2")
									关于吾记				
					el-menu-item(index="2")
						i.fa.fa-comment
						系统通知
			div.signout
				el-button(size="large",:plain="true", type="success" @click="signout") 退出登录	
</template>
<script>
    import Vue from 'vue'
	import { Menu, Submenu, MenuItemGroup, MenuItem, Button } from 'element-ui'
    import Avatar from './avatar'
	// 引入组件
	Vue.use(Menu)
	Vue.use(Submenu)
	Vue.use(MenuItemGroup)
	Vue.use(MenuItem)
	Vue.use(Button)
	const menuItems = {
		'dataModification' : {index: '1-1', url: ''},
		'renewals' : {index: '1-2', url: ''},
		'praise': {index: '1-3', url: ''},
		'exportJournal': {index: '1-4-1', url: ''},
		'remind': {index: '1-4-2', url: ''},
		'myCollection': {index: '1-4-3', url: ''},
		'trashCan': {index: '1-4-4', url: ''},
		'feedback': {index: '1-5-1', url: ''},
		'about': {index: '1-5-2', url: ''},
		'journals': {index: '3', url: '/'},
		'passing': {index: '4', url: '/passing'},
	}
    export default{
        name: 'aside',
	    data () {
	        return {
	          isAcitve: false,
	          routeIndex: '3'
	        }
	    },
	    props: {
		    route: {
		      type: String,
		      default: 'journals'
		    }
	    },
	    mounted(){
	    	this.init();
	    },
	    methods:{
	    	init(){
	    		this.setRouteIndex();
	    	},
	    	setRouteIndex(item){
	    		let activeItem = item || this.route;
	    		this.routeIndex = menuItems[activeItem].index;
	    	},
	  		open(){
	  			this.isAcitve = true;
	  		},
	  		close(){
	  			this.isAcitve = false;
	  		},
	  		signout(){
	  			console.log("signout out");
	  		},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleSelect(index){
				for(let i in menuItems){
					if(menuItems[i].index == index){
						window.location.href = menuItems[i].url;
					}
				}
			}
	    },
        components: {
        	Avatar
        }
    }
</script>
<style lang="sass">
	@import "../public/scss/index.scss";
	$icon-top: 30px;
	$icon-size: 20px;
	.sidebar{
		.burger-icon{
			background: 0,0;
			cursor: pointer;
			border: none;
			outline: 0;
			position: fixed;
			top: $icon-top;
			left: 20px;
			z-index: 8;
			font-size: $icon-size;
			width: 20px;
			height: 20px;
			color: #757575;
		}
		.sidebar-left{
			width: 0;
			min-height: 100%;
			transform: translate3d(-280px,0,0);
		    position: fixed;
		    top: 0;
		    bottom: 0;
		    left: 0;	    
		    z-index: 10;
		    background-color: $white;
		    overflow-y: auto;
	    	overflow-x: hidden;
	    	border: none;
	    	display: block;
		    box-shadow: 2px 0 15px rgba(0,0,0,.35);	
		    transition: all .5s cubic-bezier(.55,0,.1,1);
		    &.open{
				min-width: 280px;
			    width: 280px;
			    transform: translate3d(0,0,0);	    	
		    }
		    .sidebar-header{
		    	height: 158px;
		    	background: url("https://llp0574.github.io/img/sidebar_header.png") no-repeat center center;
		    	background-size: cover;
		    	padding: $icon-top 16px 0 16px;
		    	.sidebar-header-top{
					@include clearfix;
			    	.recover-icon{
						float: right;
						background: 0,0;
						cursor: pointer;
						border: none;
						outline: 0;		
						font-size: $icon-size;	
						height: 55px;
						color: $white;	
						@include opacity;
			    	}
		    	}
		    	.sidebar-header-dec{
		    		color: $white;
		    		text-shadow: 0 2px 1px $black;
		    		margin-top: 10px;
		    		& > div{
		    			line-height: 1.8
		    		}
		    		.dec{
		    			@extend %ellipsis;
		    		}
		    		.starnum{
		    			i{
		    				text-shadow: none;
		    				font-size: $size-h2;
		    				color: $purple;
		    				position: relative;
		    				top: 1px;
		    			}
		    		}
		    	}
		    }
		}
		.aside-shade{
			&.active{
				@include opacity;
			    visibility: visible;
			    transition-delay: 0;			
			}
		    visibility: hidden;
		    position: fixed;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    opacity: 0;
		    background: $black;
		    z-index: 9;
		    transition: visibility 0 linear .4s,opacity .4s cubic-bezier(.4,0,.2,1);
		    transform: translateZ(0);
		}
		.sidebar-content{
			color: $gray;
			.el-menu,
			.el-submenu .el-menu{
				background-color: $white;
				.fa{
					margin-right: 10px;
				}
				.is-active{
					color: $main;
				} 
			}
		}
		.signout{
			padding: 0 20px;
			.el-button{
				margin-top: 20px;
			    width: 100%;
			    @include center-block;
			}	
		}
	}
</style>