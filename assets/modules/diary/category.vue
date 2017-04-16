<template lang="jade">
div.wuji-container.center-block
	div.wuji-category
		el-table(:data="categoryList", style="width: 100%")
			el-table-column(prop="name", label="分类")
			el-table-column(prop="colorHex", label="颜色")
				template(scope="scope")
					span.color-span(:style="{backgroundColor: '#' + scope.row.colorHex}")		
			el-table-column(prop="diaryCount", label="日记数")
			el-table-column(label="操作")
				template(scope="scope")
					el-button(size="small", @click="handleEdit(scope.$index, scope.row)") 编辑
					el-button(size="small", type="danger", @click="handleDelete(scope.$index, scope.row)") 删除
</template>
<script>
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex'
    import {Table, TableColumn, Button} from "element-ui"
	// 引入组件
	Vue.use(Table)
	Vue.use(TableColumn)
	Vue.use(Button)
    export default{
        name: 'category',
        created(){
        	//防止页面强刷，store丢失
        	if(this.$store.state.diary.categoryList.length === 0){
        		this.loadCategoryList();
        	}
        },
        methods:{
	        loadCategoryList(params = {}){
	            this.getCategoryList(params)
	        },        
	        handleEdit(index, row){

	        },
	        handleDelete(index, row){

	        },
	        ...mapActions([
	          'getCategoryList'
	        ])            	
        },
        computed:{
	        ...mapState({
	            categoryList: state => state.diary.categoryList
	        })       
        },
        components: {}
    }
</script>
<style lang="sass">
	@import "../../public/scss/index.scss";
	$prefix: 'wuji';
	$container-width: 900px;
	.#{$prefix}-container{
	    width: $container-width;
	    .#{$prefix}-category{
	    	padding: 80px 0 40px 0;
	    	.color-span{
	    		display: inline-block;
	    		width: 40px;
	    		height: 20px;
	    	}
	    }
	}
</style>