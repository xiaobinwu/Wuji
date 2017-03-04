<template lang="jade">
    div.account-container
        slot(name="content")
</template>
<script>
    import Vue from 'vue'
    export default{
        name: 'accountContainer',
        props: {

        },
        components: {}
    }
</script>
<style lang="sass">
    @import "../public/scss/_variables.scss";
    $border-radius: 6px;
    body{
        background-color: $main;
    }
    input::-webkit-input-placeholder,
    input:-moz-placeholder,
    input::-moz-placeholder,
    input:-ms-input-placeholder,
    input::placeholder{
        color: $white!important;
    }    
    .account-container{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
        margin: auto;
        width: 400px;
        height: auto;
    }
    .el-input{
        .el-input__inner,
        .el-input-group__prepend{
            background-color: transparent;
            border: 1px $white solid;
            color: $white;
        }
        .el-input-group__prepend{
            border-right: 0;
        }
        .el-input__inner{
            border-left: 0;
            &:focus {
                outline: none;
                border-color: $white;
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
            background-color: $white;
            color: $main;
            border-radius: $border-radius;
            text-decoration: none;
            text-align: center;           
        }
    }
</style>