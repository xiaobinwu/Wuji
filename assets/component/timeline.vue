<template lang="jade">
	div.timeline(:style="timeLineStyle")
		template(v-if="list.length > 0")
			div.line
			ul
				li(v-for="(item, index) in list", :style="{marginLeft: (index+1) % 2 === 0 ? liEvenStyle : '0'}", :key="item.id", @click="detail()")
					span.circle(:style="{backgroundColor: '#' + (item.colorHex ? item.colorHex : 'f5f5f5'), borderColor: '#' + (item.colorHex ? item.colorHex : '808080')}")
						i.fa(:style="{color: '#' + (item.colorHex ? 'fff' : '808080')}", :class="'fa-' + computedType(item)")
					div.item-container
						div.item-header
							span {{item.createDate | date}}&nbsp;{{item.weekday | weekday}}
							span
								{{item.createDate | time}}&nbsp;&nbsp;
								img.weather-icon(:src="item.weather | weather")
						div.item-content
							p.text-container(v-html="item.content", :class="{ hasImg: item.MediaChildren.length > 0 }")
							div.img-container(v-if="item.MediaChildren.length > 0")
								img.item-content-img(:src="getImg(item)")
								div.mask(v-if="isVideo(item)")
									i.fa.fa-video-camera
		template(v-else)
			img.no-data(src="../public/images/dist/noDataFound.png")
</template>
<script>
    import Vue from 'vue'
    import t from 'utils/transform'
	import weather from 'config/weather'
	import weekday from 'config/weekday'
    export default{
        name: 'timeline',
        data(){
        	return{
        	}
        },
        props: {
            width: {
                type: [String, Number],
                required: true
            },
            list: {
            	type: Array,
            	default: []
            }
        },
	    filters: {
	        date(value){
	            return value.substr(0,4) + '-' + value.substr(4,2) + '-' + value.substr(6,2);
	        },
  			weekday(index){
  				return weekday[index-1].name;
  			},
  			time(value){
  				return value.substr(8,2) + ':' + value.substr(10,2);
  			},
  			weather(index){
  				return weather[index].url;
  			}
	    },
        methods: {
        	computedType(item){
        		const len = item.MediaChildren.length;
        		if(len > 0){
        			for (let i = len - 1; i >= 0; i--) {
        				if(item.MediaChildren[i].mediaType === 2){
        					return 'video-camera';
        				}
        			}
        			return 'picture-o';
        		}else{
        			return 'file-text';
        		}
        	},
        	getImg(item){
        		const len = item.MediaChildren.length;
    			for (let i = len - 1; i >= 0; i--) {
    				if(item.MediaChildren[i].mediaType === 2){
    					return item.MediaChildren[i].videoThumbnail;
    				}
    			}
    			return item.MediaChildren[0].Qnurl;
        	},
        	isVideo(item){
        		const len = item.MediaChildren.length;
    			for (let i = len - 1; i >= 0; i--) {
    				if(item.MediaChildren[i].mediaType === 2){
    					return true;
    				}
    			}
    			return false;
        	},
        	detail(id){
        		//传递token值
        		this.$router.push({ path: 'detail', query: { id: 'HhvO4cPKwCAM8ECqoiIb6IDSKC9tiDzZk8LpccfAPn9zLpKzYFesEJiY' }});
        	}
        },
        computed: {
        	timeLineStyle(){
				return {
	                width: t.transformCssUnit(this.width)
	            }
        	},
        	liEvenStyle(){
				return t.transformCssUnit(15 - this.width);	
        	}
        },
        components: {}
    }
</script>
<style lang="sass">
	@import "../public/scss/_variables.scss";
	@import "../public/scss/_mixins.scss";
	$border-radius: 5px;
	$item-padding: 10px;
	$img-width: 95px;
	.timeline{
		position: relative;
		float: right;
		.line{
			width: 1px;
			height: 100%;
			background-color: #c5c5c5;
			position: absolute;
			left: 7px;
			z-index: -1;
		}
		.no-data{
			margin: 100px auto;
		}
		ul{
			li{
				cursor: pointer;
				box-sizing: border-box;
				position: relative;
				width: 100%;
			    padding-left: 25px;
			    margin-bottom: 30px;
			    .circle{
			    	box-sizing: border-box;
					width: 30px;
					height: 30px;
					line-height: 28px;
					border: 1px solid $main;
					border-radius: $circle-radius;
					position: absolute;
					top: 8px;
					text-align: center;
					font-size: 12px;
			    }
				&:after{
					content: '';
					width: 0;
					height: 0;
					border-width: 8px;
					border-style: solid;
					position: absolute;
					top: 13px;
				}
				&:nth-child(odd){
					padding: 0 0 0 38px;
					.circle{
						left: -8px;
					}
					&:after{
						border-color: transparent $white transparent transparent;
						left: 22px;
					}
				}
			    &:nth-child(even){
					padding: 0 38px 0 0;
					.circle{
						right: -8px;
					}
					&:after{
						border-color: transparent transparent transparent $white;
						right: 22px;
					}
			    }
			}
		}
		.item-container{
			display: block;
			width: 100%;
			border-radius: 5px;
			.item-header{
				@include clearfix();
				padding: 0 $item-padding;
				height: 40px;
				line-height: 40px;
				background-color: $white;
				border: 1px solid $white;
				color: $gray;
				border-top-left-radius: $border-radius;
				border-top-right-radius: $border-radius;
				.weather-icon{
					width: 23px;
					height: auto;
					vertical-align: text-top;
				}
				span{
					&:first-child{
						float: left;
					}
					&:last-child{
						float: right;
					}
				}
			}
			.item-content{
				@include clearfix();
				padding: $item-padding;
				color: $gray;
				background-color: $white;
				border: 1px solid $white;
				border-top: 0;
				border-bottom-left-radius: $border-radius;
				border-bottom-right-radius: $border-radius;
				.text-container{
					line-height: 1.4;
					text-align: justify;
					max-height: 100px;
					overflow: hidden;
					&.hasImg{
						float: left;
						width: 290px;
					}
				}
				.img-container{
					float: left;
					margin-left: 5px;
					width: $img-width;
					height: $img-width;
					overflow: hidden;
					position: relative;
					.item-content-img{
						position: absolute;
						width: $img-width;
						height: auto;
					}
					.mask{
						position: absolute;
						width: $img-width;
						height: $img-width;
						line-height: $img-width;
						text-align: center;
						font-size: 28px;
						background-color: rgba(0,0,0,.5);
						z-index: 2;
					}
				}
			}
		}
	}
</style>