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
			el-row(:gutter="20")			
				el-col(:span="5")
					div.label 是否同步过客
					el-switch(v-model="isPassby", on-text="", off-text="")
				el-col(:span="7")
					div.label 当前所在位置：
					div.location {{location}}
				el-col(:span="6")
					el-select.category-select(v-model="weather", placeholder="天气好吗")
						el-option(v-for="item in weatherList", :label="item.name", :value="item.value")
							span.weather-name {{ item.name }}
							span.weather-icon 
								img(:src="item.url")
				el-col(:span="6")
					el-date-picker(v-model="createDate", type="datetime", placeholder="选择创建日期", align="right", :picker-options="pickerOptions")
		div.wuji-content(:contenteditable="true", :style="styleObject")  吾记网页版
</template>
<script>
    import Vue from 'vue'
    import Api from "utils/api"
    import {fontColor} from 'config/color'
    import weather from 'config/weather'
    import {Row, Col, Select, Option, Slider, Switch, Message, DatePicker} from "element-ui"
	// 引入组件
	Vue.use(Row)
	Vue.use(Col)
	Vue.use(Select)
	Vue.use(Option)
	Vue.use(Slider)
	Vue.use(Switch)
	Vue.use(DatePicker)
    export default{
        name: 'diarydedit',
        data(){
        	return{
        		categoryList: [],
        		colorList: fontColor,
        		weatherList: weather,
        		categoryId: 0,
        		fontsize: 14,
        		fontcolor: '000000',
        		isPassby: false,
        		weather: 0,
        		createDate: '',
        		location: '',
		        pickerOptions: {
		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              picker.$emit('pick', new Date());
		            }
		          }, {
		            text: '昨天',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24);
		              picker.$emit('pick', date);
		            }
		          }, {
		            text: '一周前',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', date);
		            }
		          }]
		        }
        	}
        },
        created(){
        	this.getCategoryList();
        },
        mounted(){
        	this.getLocation();
        },
        computed:{
        	styleObject(){
        		return {
        			fontSize: this.fontsize + 'px',
        			color: '#' + this.fontcolor
        		}
        	}
        },
        methods:{
        	getLocation(){
        		//动态创建script，实现跨域
        		const head = document.getElementsByTagName('head')[0];
        		let script = document.createElement('script'), _self = this;
        		script.type = 'text/javascript';
        		script.src = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
        		head.appendChild(script);
				script.onload = script.onreadystatechange = function() {
				    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
				        if(remote_ip_info.ret == 1){
				        	_self.location = remote_ip_info.province + remote_ip_info.city + remote_ip_info.district;
				        }else{
				        	_self.location = '获取不到定位';
				        }
				        script.onload = script.onreadystatechange = null;
				        head.removeChild(script);
				    }
				};
        	},
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
			padding: 20px 0 10px 0;
			.el-row{
				margin-bottom: 10px;
			}
			.label, .location{
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
			.el-switch__core{
				top: 4px;
			}
			.el-date-editor.el-input{
				width: 210px;
			}
	    }
		.#{$prefix}-content{
			padding: 10px;
			outline: none;
			background-color: $white;
			border: 1px $white solid;
			min-height: 500px;
			border-radius: 4px;
			&:focus{
				border: 1px $main solid;
			}
		}
	}
	.el-scrollbar{
		.category-name,
		.weather-name{
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
		.weather-icon{
			float: right;
			img{
				width: 20px;
				height: auto;
			}
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