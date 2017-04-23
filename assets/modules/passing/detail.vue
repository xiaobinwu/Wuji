<template lang="jade">
div.wuji-container.center-block
    div.wuji-header(:style="{backgroundImage: 'url(' + passingDetail.userBGUrl + ')'}")
        div.user-info
            avatar(:src="passingDetail.avatarUrl", width="180", height="180")
            div.user-name {{passingDetail.nickName}}
            div.user-subtitle {{passingDetail.subTitle}}
    div.wuji-title
        span.datetime {{passingDetail.createDate | datetime}}
        span.weekday {{passingDetail.weekday | weekday}}
        span.praise
            i.fa.fa-heart-o
            span {{passingDetail.praiseCount}}
        span.browse
            i.fa.fa-eye
            span {{passingDetail.browseCount}}
        i.fa.fa-exclamation-triangle.icon-right(@click="doReport")
        el-popover(ref="popover1", placement="bottom", trigger="hover")
            i.el-icon-share.icon-right(slot="reference")
            share(:description="description", :title="passingDetail.content ? passingDetail.content.substr(0,20) + '...' : ''", :q-code-position="true")
        i.icon-right(@click="doCollection", :class="{'el-icon-star-off': passingDetail.isCollection === 0, 'el-icon-star-on': passingDetail.isCollection !== 0}")
        i.fa.icon-right(@click="doPraise", :class="{'fa-heart-o': passingDetail.isPraised == 0, 'fa-heart': passingDetail.isPraised != 0}")
    div.wuji-content {{passingDetail.content}}


</template>
<script>
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex'
    import weekday from 'config/weekday'
    import fancyBox from 'component/fancyBox'
    import share from 'component/share'
    import avatar from 'component/avatar'
    import {Message, MessageBox, Popover} from 'element-ui'
    Vue.use(Popover)
    export default{
        name: 'passingdetail',
        data(){
        	return{
        		description: '吾记，属于你的心灵港湾'
        	}
        },
        created(){
        	this.init();
        },
        mounted(){
            console.log(this.passingDetail)
        },
        computed: {
            ...mapState({
                passingDetail: state => state.passing.passingDetail
            })
        },  
        filters:{
            datetime(date){
                if(!date){ return; }
                return date.substr(0,4) + '-' + date.substr(4,2) + '-' + date.substr(6,2) + ' ' + date.substr(8,2) + ':' + date.substr(10,2);
            },
            weekday(index){
                if(!index){ return; }
                return weekday[index-1].subname;
            }
        },
        methods:{
            init(){
                this.loadData(this.$route.query.id);
                this.recordBrowse();
            },
            loadData(id){
                let params = { keyValue: id };
                //params => 参数
                this.getPasserbyDetail(params);
            },
            recordBrowse(){
                /*
                    需要记录一次浏览
                 */
            },
            doPraise(){
                if(this.passingDetail.isPraised){
                    return Message({message: '您已经点赞过！', type: 'success', showClose: false, duration: 1000});
                }
                this.passingPraised({ isPraised: 1 }).then(result => {
                    console.log(result)
                    return Message({message: '已点赞', type: 'success', showClose: false, duration: 1000});
                });
            },
            doCollection(){
            	let params = { isCollection: !this.passingDetail.isCollection };
                this.passingCollection(params).then(result => {
                    if(result.isCollection){
                        return Message({message: '收藏成功！', type: 'success', showClose: false, duration: 1000});
                    }
                    return Message({message: '收藏取消！', type: 'success', showClose: false, duration: 1000});
                });
            },
            doReport(){
                MessageBox.prompt('举报原因', '我要举报', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    console.log(value);
                    /*
                        异步请求
                     */
                }).catch(() => {
 
                });
            },
            ...mapActions([
              'getPasserbyDetail',
              'passingCollection',
              'passingPraised'
            ])
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
        margin-bottom: 40px;
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
			.datetime,
            .weekday,
            .praise,
            .browse{
				margin-right: 20px;
                float: left;
                color: $gray;
                span{
                    margin-left: 5px;
                }
			}
			.icon-right{
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