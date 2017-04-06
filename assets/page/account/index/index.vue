<template lang="jade">
    div.main#particles-js
        div.account-container
            div.account-header
                h1.logo 吾记
                h2.subtitle 一款随手记的记账记事本
            div.account-nav
                div.account-navs-slider
                    router-link(:to="{ path: '/'}", :class="{active: isLogin}") 登录
                    router-link(:to="{ path: 'register'}", :class="{active: !isLogin}") 注册
                    span.navs-slider-bar(:class="{active: !isLogin}")
            transition(name="fade",  mode="out-in")
                router-view
            div.download-app-container
                div.qrcode-container(v-show="isShowQR")
                    img.qrcode-img(src="../../../public/images/dist/wuji_download.png")
                    div.sprite-index-icon-arrow
                a.download-app(href="javascript:;;", @click="showQR", v-text="text")
</template>

<script>
import particlesJS from 'particlesJS'
import particles from '../particles.json'
const title = {
    register : '吾记 - 吾记网页版在线写日记 － 注册',
    login: '吾记 - 吾记网页版在线写日记 － 登录'
}
export default {
    name: 'account',
    data () {
        return {
            isLogin: true,
            text: '下载吾记',
            isShowQR: false
        }
    },
    mounted(){
        particlesJS('particles-js', particles);
    },
    methods:{
        showQR(){
            this.isShowQR = !this.isShowQR;
        }
    },
    components: {
    },
    watch: {
        '$route' (to, from) {
            if(to.name === "register"){
                this.isLogin = false;
            }
            if(to.name === "login"){
                this.isLogin = true;
            }
            document.title = title[to.name];
            this.isShowQR = false;
        },
        'isShowQR' (bol){
            if(bol){
                this.text = '关闭二维码';
            }else{
                this.text = '下载吾记';
            }
        }
    }
}
</script>
<style lang="sass">
@import "../../../public/scss/_transition.scss";
@import "../../../public/scss/_variables.scss";
@import "../../../public/scss/_base.scss";
$border-radius: 6px;
.main{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    .account-container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
        margin: auto;
        width: 300px;
        height: auto;
        .account-header{
            text-align: center;
            .logo{
                font: 0/0 a;
                color: transparent;
                text-shadow: none;
                border: 0;
                margin: 0 auto;
                width: 160px;
                height: 74px;
                background: url(../../../public/images/dist/logo.png) no-repeat;
                background-size: contain;
            }
            .subtitle{
                margin: 15px 0 20px;
                font-weight: 400;
                font-size: $size-h2;
                line-height: 1;
                color: #555;
            }
        }
        .account-nav{
            margin-bottom: 10px;
            font-size: $size-h2;
            text-align: center;
            .account-navs-slider{
                display: inline-block;
                position: relative;
                a{
                    float: left;
                    width: 72px;
                    line-height: 35px;
                    opacity: .7;
                    -ms-filter: "alpha(Opacity=70)";
                    -webkit-transition: opacity .15s,color .15s;
                    transition: opacity .15s,color .15s;
                    &.active{
                        opacity: 1;
                        -ms-filter: "alpha(Opacity=100)";
                        color: $main;
                    }
                }
                .navs-slider-bar{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    margin: 0 16px;
                    width: 40px;
                    height: 2px;
                    background: $main;
                    -webkit-transition: left .15s ease-in;
                    transition: left .15s ease-in;
                    &.active{
                        left: 72px;
                    }
                }
            }
        }
    }
}
.el-input{
    .el-input__inner,
    .el-input-group__prepend{
        background-color: transparent;
        border: 1px $main solid;
        color: $main;
    }
    .el-input-group__prepend{
        border-right: 0;
    }
    .el-input__inner{
        border-left: 0;
        height: 45px;
        &:focus {
            outline: none;
            border-color: $main;
        }
    }
}
.account-submit{
    &:link,
    &:visited,
    &:hover,
    &:active{
        display: block;
        height: 40px;
        line-height: 40px; 
        background-color: $main;
        color: $white;
        border-radius: $border-radius;
        text-decoration: none;
        text-align: center;
    }
}
.download-app-container{
    position: relative;
    .qrcode-container{
        position: absolute;
        left: -5px;
        bottom: 68px;
        width: 310px;
        height: 310px;
        color: #555;
        background-color: $white;
        box-shadow: 0 0 8px 0 rgba(0,0,0,.15);
        border-radius: 10px;
        .qrcode-img{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 260px;
            height: 260px;
            margin: auto;
        }
        .sprite-index-icon-arrow{
            position: absolute;
            margin: auto;
            right: 0;
            bottom: -10px;
            left: 0;
            width: 54px;
            height: 38px;
            background: url(../../../public/images/dist/arrow.png) no-repeat 0 0;
        }
    }
    .download-app{
        &:link,
        &:visited,
        &:hover,
        &:active{
            display: block;
            height: 40px;
            line-height: 40px; 
            background-color: transparent;
            border: 1px $main solid;
            color: $main;
            border-radius: $border-radius;
            text-decoration: none;
            text-align: center;
            margin-top: 40px;
        }
    }    
}
</style>