<template lang="jade">
div.avatar(:style="avatarStyle")
    img(:src="src", :class="{circle: isRadius}")
</template>
<script>
    import Vue from 'vue'
    import t from 'utils/transform'
    export default{
        name: 'avatar',
        props: {
            isRadius: {
                type: Boolean,
                default: true
            },
            src: {
                type: String,
                default: 'https://llp0574.github.io/img/avatar.png',
                required: true
            },
            width: {
                type: [String, Number],
                required: true
            },
            height: {
            	type: [String, Number],
                required: true            	
            }
        },
        computed: {
        	avatarStyle(){
				return {
	                width: t.transformCssUnit(this.width),
	                height: t.transformCssUnit(this.height)
	            }       		
        	}
        },
        components: {}
    }
</script>
<style lang="sass">
	.avatar {
	    display: inline-block;
	    img {
	        width: 100%;
	        height: 100%;
	        &.circle{
	        	border-radius: 50%;
	        }
	    }
	}
</style>