<template lang="jade">
    div.main#particles-js
        div.account-container
            div.account-header
                h1.logo 吾记
                h2.subtitle 一款随手记的记账记事本
            transition(name="slide")
                router-view
</template>

<script>
import particlesJS from 'particlesJS'
import particles from '../particles.json'
export default {
    name: 'account',
    data () {
        return {
        }
    },
    mounted(){
        particlesJS('particles-js', particles);
    },
    components: {
    },
    watch: {
      '$route' (to, from) {
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
                margin: 15px 0 40px;
                font-weight: 400;
                font-size: $size-h2;
                line-height: 1;
                color: #555;
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
        height: 36px;
        line-height: 36px; 
        background-color: $main;
        color: $white;
        border-radius: $border-radius;
        text-decoration: none;
        text-align: center;
    }
}
</style>