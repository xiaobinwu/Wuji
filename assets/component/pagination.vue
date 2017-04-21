<template lang="jade">
	div.page-wrap
		span.span-page(v-show="type === 1 ? prePage : 'true'", @click="goPrePage", :class="{disabled: type !== 1 && !prePage}", v-html="preIcon ? preIcon : '上一页'")
		span(v-for="i in showPages", :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}", @click="goPage(i)", v-show="type === 1")
			a.notPointer(v-if="i") {{i}}
			a(v-else) ...
		span.span-page(v-show="type === 1 ? nextPage : 'true'", @click="goNextPage", :class="{disabled: type !== 1 && !nextPage}", v-html="nextIcon ? nextIcon : '下一页'")
</template>
<script>
    import Vue from 'vue'
	import { mapState, mapActions } from 'vuex'
    /*
    	component: 分页组件
    	params ->
    	total: 数据总条数
    	num: 每页总条数
    	type: 显示类型
    	source: [https://github.com/luyilin/Minemine-pagination]
     */
    export default{
        name: 'pagination',
        data(){
        	return{
        		preDisabled: false,
        		nextDisabled: false
        	}
        },
        created(){
            this.resetOffset()
        },
        props: {
        	total: {
        		type: Number,
        		require: true
        	},
        	num: {
        		type: Number,
        		require: true
        	},
        	type: {
        		type: Number,
        		default: 1
        	},
        	icons: {
        		type: Array,
        		default: () =>{
                    return []
                }
        	}
        },
        computed: {
	        ...mapState({
	            offset: state => state.offset
	        }),
	        preIcon(){
	        	return this.icons.length >= 2 ? '<i class="fa fa-' + this.icons[0] + '" aria-hidden="true"></i>' : '';
	        },
	        nextIcon(){
	        	return this.icons.length >= 2 ? '<i class="fa fa-' + this.icons[1] + '" aria-hidden="true"></i>' : '';
	        },
        	totalPage(){
        		return Math.ceil(this.total / this.num);
        	},
        	currentPage(){
        		return Math.ceil(this.offset / this.num) + 1;
        	},
        	prePage(){
        		return this.offset !== 0 && this.total;
        	},
        	nextPage(){
        		return (this.offset + this.num < this.total) && this.total;
        	},
        	showPages(){
        		let totalPage = this.totalPage,
        			index = this.currentPage,
        			arr = [];
        			console.log(this.offset)
        		if(totalPage <= 5){
		            for(let i = 1; i <= totalPage; i++) {
		              arr.push(i)
		            }
		            return arr;
        		}
        		if(index <= 2){ return [1,2,3,0,totalPage]; }
        		if(index >= totalPage - 1){ return [1,0,totalPage - 2,totalPage - 1,totalPage]; }
        		if(index === 3){ return [1,2,3,4,0,totalPage]; }
        		if(index === totalPage - 2){ return [1,0,totalPage - 3,totalPage - 2,totalPage - 1,totalPage]; }
        		return [1,0,index - 1, index, index + 1,0,totalPage];
        	}
        },
        methods: {
	        ...mapActions([
	          'toPrePage',
	          'toNextPage',
	          'toGoPage',
              'resetOffset'
	        ]),
        	goPage(i){
        		if(i === 0 || i === this.currentPage) { return; }
    			this.toGoPage({ offset: this.num * (i-1)});
    			this.$emit('page', i);
        	},
			goPrePage() {
				if(this.type !== 1){
					if(!this.prePage){return;}
				}
				this.toPrePage({ offset: this.num});
				this.$emit('page', this.currentPage);
			},
			goNextPage() {
				if(this.type !== 1){
					if(!this.nextPage){return;}
				}
				this.toNextPage({ offset: this.num});
				this.$emit('page', this.currentPage);
			}
        },
        components: {
        }
    }
</script>
<style lang="sass" scoped>
	@import "../public/scss/_variables.scss";
    @import "../public/scss/_mixins.scss";
	.page-wrap {
	    text-align: center;
	    margin-bottom: 45px;
        @include clearfix();
	    span {
			color: $gray;
			padding: 5px 8px;
			margin: 0 5px;
			border: 1px solid $gray;
            a{
                color: $gray;
            }
	      }
	    .pointer {
			cursor: pointer;
	    }
	    .hover {
			&:hover {
				color: $main;
				border-color: $main;
                a{
                    color: $main;
                }
			}
	    }
	    .span-page {
			line-height: 1.5;
			cursor: pointer;
			color: $gray;
			&:hover {
				color: $main;
                border-color: $main;
			}
			&.disabled{
				cursor: not-allowed;
				@include opacity(65);
			}
	    }
	    .active {
            color: $white;
			border-color: $main;
            background-color: $main;
            a{
                color: $white;
            }
	    }
	}
</style>