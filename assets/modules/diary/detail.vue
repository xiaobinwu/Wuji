<template lang="jade">
	div.detail 我是日记详情
</template>
<script>
    import Vue from 'vue'
    export default{
        name: 'diarydetail',
        mounted(){
        	console.log(this.$route.query.id);
        },
        components: {}
    }
</script>
<style lang="sass">
	@import "../../public/scss/index.scss";
</style>