<template lang="jade">
	div.wuji-container.center-block
		div.wuji-header
			el-row(:gutter="20")
				el-col.wuji-category(:span="8")
					el-select.category-select(v-model="categoryId", placeholder="请选择分类")
						el-option(v-for="item in categoryList", :label="item.name", :value="item.categoryId")
							span.category-name {{ item.name }}
							span.category-color(:style="{backgroundColor: '#' + (item.colorHex ? item.colorHex : 'transparent')}")
				el-col(:span="8")
					div.label 颜色
					el-select.font-select(v-model="fontcolor", placeholder="请选择字体颜色")
						el-option(v-for="item in colorList", :label="item", :value="item.substr(1)")
							span {{ item }}
							span.font-color(:style="{backgroundColor: item}")
				el-col(:span="8")
					div.label 字体
					el-slider(v-model="fontsize", :min="10", :max="40", format-tooltip="formatTooltip")
		div.wuji-content(:contenteditable="true")  fasd;dkalda'sld
</template>
<script>
    import Vue from 'vue'
    import Api from "utils/api"
    import {fontColor} from 'config/color'
    import {Row, Col, Select, Option, Slider, Message} from "element-ui"
	// 引入组件
	Vue.use(Row)
	Vue.use(Col)
	Vue.use(Select)
	Vue.use(Option)
	Vue.use(Slider)
    export default{
        name: 'diarydedit',
        data(){
        	return{
        		categoryList: [],
        		colorList: fontColor,
        		categoryId: 0,
        		fontsize: 14,
        		fontcolor: '000000'
        	}
        },
        created(){
        	window.a = this;
        	this.getCategoryList();
        },
        methods:{
	        getCategoryList(){
	            let _self = this, params;
	            //params => 参数
	            Api.getCategoryList(params).then(result => {
	                _self.categoryList = result;
	            }).catch(error => {
	                Message({message: error, type: 'error', showClose: true});
	            });
	        },
	        formatTooltip(font){
	        	return font + 'px';
	        }
        },
        components: {}
    }
</script>
<style lang="sass">
	@import "../../public/scss/index.scss";
	$prefix: 'wuji';
	.#{$prefix}-container{
	    width: $container-width;
	    .#{$prefix}-header{
			padding: 20px 0;
			.label{
				float: left;
				margin-top: 7px;
				margin-right: 5px;
			}
			.category-select{
				display: block;
			}
			.font-select{
				margin-left: 5px;
				width: 248px;
			}
			.el-slider{
				padding-left: 45px;
			}
	    }
		.#{$prefix}-content{
			outline: none;
			background-color: $white;
			border: 1px $white solid;
			min-height: 500px;
			&:focus{
				border: 1px $main solid;
			}
		}
	}
	.el-scrollbar{
		.category-name{
			float: left;
		}
		.category-color,
		.font-color{
			float: right;
			display: inline-block;
			margin-top: 4px;
			width: 14px;
			height: 14px;
			border-radius: 50%;
		}
	}
	//reset
	.el-select-dropdown__item.selected.hover{
		background-color: $main;
	}
	.el-slider__button:hover, .el-slider__button.hover, .el-slider__button.dragging {
	    transform: scale(1.5);
	    background-color: $main;
	}
</style>