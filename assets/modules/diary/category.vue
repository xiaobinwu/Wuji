<template lang="jade">
div.wuji-container.center-block
	div.wuji-category
		el-button.add-btn(@click="handleAdd", type="primary") 添加我的分类
		el-table(:data="categoryList", style="width: 100%")
			el-table-column(prop="name", label="分类", align="center")
			el-table-column(prop="colorHex", label="颜色", align="center")
				template(scope="scope")
					span.color-span(:style="{backgroundColor: '#' + scope.row.colorHex}")
			el-table-column(prop="diaryCount", label="日记数", align="center")
			el-table-column(label="操作", align="center")
				template(scope="scope")
					el-button(size="small", v-if="scope.$index !== 0", @click="handleEdit(scope.$index, scope.row)") 编辑
					el-button(size="small", type="danger", v-if="scope.$index !== 0", @click="handleDelete(scope.$index, scope.row)") 删除
			div(slot="empty")
				span 暂时没有数据，
				a(href="javascript:;;", @click="handleAdd") 快速添加！
		el-dialog(:title="title", v-model="dialogFormVisible")
			el-form(:model="form")
				el-form-item
					el-input(v-model="form.categoryId", type="hidden", auto-complete="off")
				el-form-item(label="分类名称", :label-width="formLabelWidth")
					el-input(v-model="form.name", auto-complete="off")
				el-form-item(label="分类颜色", :label-width="formLabelWidth", placeholder="1-8个字符")
					el-select.category-select(v-model="form.colorHex", placeholder="请选择分类颜色")
						el-option(v-for="item in categoryColor", :label="item", :value="item.substr(1)")
							span.category-name {{ item }}
							span.category-color(:style="{backgroundColor: item}")
			div(slot="footer", class="dialog-footer")
				el-button(@click="dialogFormVisible = false") 取消
				el-button(type="primary", @click="doSave") 保存
</template>
<script>
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex'
  	import { categoryColor } from 'config/color'
  	import Validator from 'utils/validator'
    import {Table, TableColumn, Button, Dialog, Form, FormItem, Input, Select, Option, Message, MessageBox} from "element-ui"
	// 引入组件
	Vue.use(Table)
	Vue.use(TableColumn)
	Vue.use(Button)
	Vue.use(Dialog)
	Vue.use(Form)
	Vue.use(FormItem)
	Vue.use(Input)
	Vue.use(Select)
	Vue.use(Option)
    export default{
        name: 'category',
        data(){
        	return{
        		categoryColor: categoryColor,
        		dialogFormVisible: false,
        		formLabelWidth: '120px',
        		isCreate: true,
        		editRow: null,
        		form: {
        			name: '',
        			colorHex: '',
        			categoryId: ''
        		}
        	}
        },
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
	        valid(){
	            let validator = new Validator();
	            const errorMsg = validator.add(this.form.name, [
	                {strategy: 'isNotEmpty', errorMsg:'分类名称不能为空！'},
	                {strategy: 'maxLength:8', errorMsg:'分类名称1-8个字符！'}
	            ]).add(this.form.colorHex, [
	                {strategy: 'isNotEmpty', errorMsg:'分类颜色不能为空！'},
	            ]).start();
	            validator = null;
	            return errorMsg;
	        },
	        handleEdit(index, row){
	        	this.editRow = row;
	        	this.form.name = row.name;
	        	this.form.colorHex = row.colorHex;
	        	this.isCreate = false;
	        	this.dialogFormVisible = true;
	        },
	        handleDelete(index, row){
	        	const _self = this;
		        MessageBox.confirm('此操作将永久删除该分类, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		            _self.deleteCategory(row).then(result => {
		            	if(!result.error){
		            		return Message({ message: '删除成功', type: 'success', duration: 2000 });
		            	}
		            });
		        }).catch(() => {
		    
		        });
	        },
	        handleAdd(){
	        	this.dialogFormVisible = true;
	        },
	        isSameName(item, index, array){
	        	return item.name.trim() == this.form.name.trim();
	        },
	        isSameColorHex(item, index, array){
	        	return item.colorHex.trim() == this.form.colorHex.trim();
	        },
	        doSave(){
	            const _self = this, errorMsg = this.valid();
	            let params;
	            if(this.isCreate){
		            params = {
	                    "categoryId": this.categoryList.length + Math.floor(Math.random()*1000),
	                    "userId": 533519,
	                    "name": this.form.name,
	                    "colorHex": this.form.colorHex,
	                    "diaryCount": 0
		            };
	            }else{
		            params = {
	                    "categoryId": this.editRow.categoryId,
	                    "userId": this.editRow.userId,
	                    "name": this.form.name,
	                    "colorHex": this.form.colorHex,
	                    "diaryCount": this.editRow.diaryCount
		            };
	            }
	            if(errorMsg){
	                return Message({ message: errorMsg, type: 'error', duration: 2000 });
	            }else if((this.categoryList.some(this.isSameName) || this.categoryList.some(this.isSameColorHex)) && this.isCreate){
	            	return Message({ message: '分类名称和颜色不能有相同的！', type: 'error', duration: 2000 });
	            }else if(!this.isCreate){
	            	let filterList = this.categoryList.filter(item => {
	            		return item.categoryId !== _self.editRow.categoryId
	            	});
	            	if(filterList.some(this.isSameName)){
	            		return Message({ message: '分类名称不能有相同的！', type: 'error', duration: 2000 });
	            	}
	            }
	            /*
	            	异步保存处理成功后处理store
	             */
	            if(this.isCreate){
		            this.addCategory(params).then(result => {
		            	if(!result.error){
		            		_self.reset();
		            		return Message({ message: '添加成功', type: 'success', duration: 2000 });
		            	}
		            });
	            }else{
		            this.editCategory(params).then(result => {
		            	if(!result.error){
		            		_self.reset();
		            		return Message({ message: '修改成功', type: 'success', duration: 2000 });
		            	}
		            });
	            }
	        },
	        reset(){
    		    this.dialogFormVisible = false;
        		this.form.name = '';
        		this.form.colorHex = '';
	        	this.editRow = null;
	        	this.isCreate = true;
	        },
	        ...mapActions([
	          'getCategoryList',
	          'addCategory',
	          'editCategory',
	          'deleteCategory'
	        ])
        },
        computed:{
	        ...mapState({
	            categoryList: state => state.diary.categoryList
	        }),
	        title(){
	        	return this.isCreate ? '添加分类' : '编辑分类';
	        }
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
	    	@include clearfix();
	    	padding: 80px 0 40px 0;
	    	.color-span{
	    		display: inline-block;
	    		width: 40px;
	    		height: 20px;
	    	}
	    	.add-btn{
	    		float: right;
	    		margin-bottom: 20px;
	    	}
	    }
	}
	.el-select-dropdown{
    	.category-color{
    		display: inline-block;
    		width: 40px;
    		height: 20px;
    		float: right;
    	}
	}
	.el-select-dropdown__item.selected.hover{
		background-color: $main;
	}
</style>