<template lang="jade">
	transition(name="fancy")
		div.fancy(v-show="visible")
			div.box(v-for="(item, index) in list", v-show="index === position")
				img( :src="item.url")
			div.mask
			i.fa.fa-times-circle-o
</template>
<script>
    import Vue from 'vue'
    export default{
        name: 'fancyBox',
        props: {
            list: {
                type: Array,
                default: true
            },
            visible:{
            	type: Boolean,
            	default: false
            },
            position: {
            	type: Number,
            	required: true
            }
        },
        components: {}
    }
</script>
<style lang="sass" scoped>
	@import "../public/scss/_variables.scss";
	@import "../public/scss/_transition.scss";
	@mixin position($position){
		position: $position;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.fancy{
		@include position(absolute);
		.box{
			@include position(fixed);
			max-width: 1200px;
			height: auto;
			margin: auto;
			z-index: 3001;
			img{
				width: 100%;
				height: auto;
				position : absolute;
				top: 50%;
				left:50%;
				transform: translate(-50%, -50%);
			}
		}
		.mask{
			@include position(fixed);
			z-index: 3000;
			background-color: rgba(0,0,0,.9);
		}
		.fa-times-circle-o{
			position: fixed;
			right: 10px;
			top: 10px;
			font-size: 40px;
			color: $white;
		}
	}
</style>