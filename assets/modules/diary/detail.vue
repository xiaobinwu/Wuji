<template lang="jade">
    div.wuji-container.center-block
        div.wuji-header
            div.wuji-category
                {{diary.categoryName}}
                div.wuji-operate
                    i.fa.fa-trash-o(@click="del")
                    i.fa.fa-pencil-square-o(@click="edit")
            div.wuji-title
                span.date {{diary.createDate | date}}
                span.time {{diary.createDate | time}}
                span.weekday {{diary.weekday | weekday}}
                span.weather
                    img(:src="diary.weather | weather")
                span.address
                    i.fa.fa-map-marker
                    {{diary.address}}
        div.wuji-content(:style="styleObject")
            {{diary.content}}
        div.wuji-other(v-if="diary.MediaChildren.length > 0")
            el-row(:gutter="20")
                el-col.wuji-category(:span="6", v-for="(item, index) in media")
                    el-card.card(:body-style="{ padding: '5px' }")
                        div.img-container(@click="showImg(item, index)")
                            img(:src="item.url")
                            div.mask(v-if="item.type === 2")
                                i.fa.fa-video-camera
                        div.dec {{item.name}}
        fancy-box(:list="media", :visible="visible", :position="position")
</template>
<script>
    import Vue from 'vue'
    import Api from "utils/api"
    import obj from "utils/object"
    import weather from 'config/weather'
    import weekday from 'config/weekday'
    import fancyBox from 'component/fancyBox'
    import {Message, MessageBox, Card, Row, Col} from 'element-ui'
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(Card)
    export default{
        name: 'diarydetail',
        data(){
            return{
                diary: {},
                position: 0,
                visible: false
            }
        },
        created(){
            this.init();
        },
        mounted(){
        	console.log(this.$route.query.id);
        },
        computed:{
            styleObject(){
                return {
                    fontSize: this.diary.fontsize + 'px',
                    color: '#' + this.diary.fontcolor
                }
            },
            media(){
                let arr = [];
                const len = this.diary.MediaChildren.length;
                for (let i = len - 1; i >= 0; i--) {
                    if(this.diary.MediaChildren[i].mediaType === 2){
                        arr.push({
                            type: this.diary.MediaChildren[i].mediaType,
                            url: this.diary.MediaChildren[i].videoThumbnail,
                            name: this.diary.MediaChildren[i].url
                        });
                    }else{
                        arr.push({
                            type: this.diary.MediaChildren[i].mediaType,
                            url: this.diary.MediaChildren[i].Qnurl,
                            name: this.diary.MediaChildren[i].url
                        });
                    }
                }
                return arr;
            }
        },
        methods:{
            init(){
                let _self = this, params = { keyValue: this.$route.query.id };
                //params => 参数
                Api.getDiaryDetail(params).then(result => {
                    _self.diary = result;
                    console.log(_self.diary)
                }).catch(error => {
                    Message({message: error, type: 'error', showClose: true});
                });
            },
            showImg(item,index){
                if(item.type === 2){
                    return;
                }
                this.position = index;
                this.visible = true;
            },
            del(){
                MessageBox.confirm('是否确定删除该日记', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Message({message: '删除成功', type: 'success', showClose: false, duration: 1000, onClose: () =>{
                        console.log("已关闭");
                    }});
                }).catch(() => {
                    Message({message: '已取消删除', type: 'info', showClose: false, duration: 1000});
                });
            },
            edit(){
                this.$router.push({ path: 'edit', query: { id: 'Iqeu8U+/HhvO4cPKwCAM8ECqoiIb6IDSKC9tiDzZk8LpccfAPn9zLpKzYFesEJiY' }});
            }
        },
        filters:{
            date(date){
                return date.substr(0,4) + '.' + date.substr(4,2) + '.' + date.substr(6,2);
            },
            time(date){
                return date.substr(8,2) + ':' + date.substr(10,2);
            },
            weekday(index){
                return weekday[index-1].subname;
            },
            weather(index){
                return weather[index].url;
            }
        },
        components: {
            fancyBox
        }
    }
</script>
<style lang="sass" scoped>
	@import "../../public/scss/index.scss";
    $prefix: 'wuji';
    .#{$prefix}-container{
        width: $container-width;
        margin-bottom: 20px;
        .#{$prefix}-header{
            background-color: $white;
            padding: 0 10px;
            border-bottom: 1px #efefef solid;
            .#{$prefix}-category{
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: $size-h2;
                .#{$prefix}-operate{
                    float: right;
                    color: $main;
                    font-size: $size-h3;
                    .fa{
                        cursor: pointer;
                    }
                    .fa-trash-o{
                        margin-right: 20px;
                    }
                }
            }
            .#{$prefix}-title{
                padding: 10px 0;
                height: 30px;
                line-height: 30px;
                span:not(:last-child){
                    margin-right: 10px;
                }
                .date{
                    font-size: $size-h2;
                }
                .weather{
                    img{
                        width: 30px;
                        height: auto;
                        vertical-align: sub;
                    }
                }
                .address{
                    float: right;
                    i{
                        color: $main;
                        margin-right: 5px;
                        font-size: $size-h2;
                    }
                }
            }
        }
        .#{$prefix}-content{
            overflow: auto;
            padding: 10px 20px;
            outline: none;
            background-color: $white;
            height: 500px;
            text-align: justify;
        }
        .#{$prefix}-other{
            background-color: $white;
            padding-bottom: 20px;
            .card{
                margin: auto;
                width: 200px;
                height: 260px;
                .img-container{
                    width: 100%;
                    height: 200px;
                    position: relative;
                    cursor: pointer;
                    img{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        max-height: 100%;
                        max-width: 100%;
                    }
                    .mask{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        text-align: center;
                        font-size: 28px;
                        background-color: rgba(0,0,0,.5);
                        z-index: 2;
                        i{
                            margin-top: 50%;
                        }
                    }
                }
                .dec{
                    margin-top: 10px;
                    overflow: hidden;
                    word-break: break-all;
                }
            }
        }
    }

</style>