<template lang="jade">
	div.wuji-container.center-block(v-if="passing")
		div.wuji-header(:style="{backgroundImage: 'url(' + passing.userBGUrl + ')'}")
			div.user-info
				avatar(:src="passing.avatarUrl", width="180", height="180")
				div.user-name {{passing.nickName}}
				div.user-subtitle {{passing.subTitle}}
		div.wuji-title
			span.datetime {{passing.createDate | datetime}}
			span.weekday {{passing.weekday | weekday}}
			i.fa.fa-exclamation-triangle
			el-popover(ref="popover1", placement="bottom", trigger="hover")
					i.el-icon-share(slot="reference")
					share(:description="description", :title="passing.content.substr(0,20) + '...'", :q-code-position="true")
			i.el-icon-star-off(@click="doPraise")
			i.fa.fa-heart-o(@click="doCollection")
		div.wuji-content {{passing.content}}


</template>
<script>
    import Vue from 'vue'
    import Api from "utils/api"
    import Browser from 'utils/browser'
    import weekday from 'config/weekday'
    import fancyBox from 'component/fancyBox'
    import share from 'component/share'
    import avatar from 'component/avatar'
    import {Message, Popover} from 'element-ui'
    Vue.use(Popover)
    export default{
        name: 'passingDetail',
        data(){
        	return{
        		passing: null,
        		description: '吾记，属于你的心灵港湾'
        	}
        },
        created(){
        	this.init();
        },
        methods:{
            init(){
                this.getPasserbyDetail(this.$route.query.id);
            },
            getPasserbyDetail(id){
                let _self = this, params = { keyValue: id };
                //params => 参数
                Api.getPasserbyDetail(params).then(result => {
                    _self.passing = result;
                }).catch(error => {
                    Message({message: error, type: 'error', showClose: true});
                });
            },
            doPraise(){

            },
            doCollection(){
            	
            }
        },
        watch:{
        },
        filters:{
            datetime(date){
                return date.substr(0,4) + '-' + date.substr(4,2) + '-' + date.substr(6,2) + ' ' + date.substr(8,2) + ':' + date.substr(10,2);
            },
            weekday(index){
                return weekday[index-1].subname;
            }
        },
        components: {
        	share,
        	fancyBox,
        	avatar
        }
    }  
</script>
<style lang="sass" scoped>
	@import "../../public/scss/index.scss";
    $prefix: 'wuji';
    .#{$prefix}-container{
		width: $container-width;
		background-color: $white;
		.#{$prefix}-header{
			position: relative;
			height: 400px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            .user-info{
            	text-align: center;
            	color: $white;
            	position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
		        .avatar{
		        	border-radius: 50%;
					border: 1px solid $white;
					margin-bottom: 20px;
		        }
		        .user-name,
		        .user-subtitle{
		        	font-size: $size-h3;
				    letter-spacing: 0.5px;
				    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.4);
				    margin-bottom: 10px;
		        }
		        .user-subtitle{
		        	font-size: 13px;
		        }
            }
		}
		.#{$prefix}-title{
			height: 40px;
			line-height: 40px;
			padding: 0 10px;
			border-bottom: 1px #eee dashed;
			@include clearfix();
			.datetime{
				margin-right: 20px;
			}
			i{
				float: right;
                color: $main;
                margin-right: 20px;
                font-size: $size-h2;
                margin-top: 11px;
                cursor: pointer;
                &.fa-exclamation-triangle{
					margin-right: 0!important;
                }
			}
		}
		.#{$prefix}-content{
			padding: 30px 10px;
			line-height: 1.5;
			text-indent: 30px;
			text-align: justify;
		}
    }
</style>