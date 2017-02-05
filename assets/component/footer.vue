<template lang="jade">
	div.footer
		div.left-section  不知道写什么
		div.center-section Copyright © 2017 吾记
		div.right-section 不知道写什么
</template>
<script>
    import Vue from 'vue'
    export default{
        name: 'footer',
        components: {}
    }
</script>
<style lang="sass">
	@import "../public/scss/index.scss";
	.footer{
		display: flex;
		flex-flow: row wrap;
		box-pack: justify;
		justify-content: space-between;
		box-sizing: border-box;
		height: 100px;
		padding: 40px;
		background-color: $white;
		.center-section{
			margin-left: auto;
		    margin-right: auto;
		    text-align: center;			
		}
	}
</style>