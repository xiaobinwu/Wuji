<template lang="jade">
    button.icobutton.icobutton--heart(@click="onCheck")
        span.fa.fa-heart
        span.icobutton__text.icobutton__text--side {{number}}
</template>
<script>
    import Vue from 'vue'
    import mojs from 'mo-js'
    import {mapActions, mapState} from 'vuex'
    export default{
        name: 'thumbsup',
        props: {
            isChecked: {
                type: Boolean,
                default: false
            },
            number: {
                type: Number,
                default: 1
            },
        },
        data(){
            return {
            
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init(){
                this.initAnimocon();
                console.log(this.timeline)
            },
            initAnimocon(){
                this.tweens = this.getTweens();
                this.timeline = new mojs.Timeline();
                for(let i = 0, len = this.tweens.length; i < len; ++i) {
                    this.timeline.add(this.tweens[i]);
                }
            },
            getTweens(){
                let _self = this;
                let el13span = this.$el.querySelector('span');
                return [
                        // burst animation
                        new mojs.Burst({
                            parent: _self.$el,
                            duration: 600,
                            shape : 'circle',
                            fill: '#C0C1C3',
                            x: '0%',
                            y: '0%',
                            childOptions: { 
                                radius: {60:0},
                                type: 'line',
                                stroke: '#988ADE',
                                strokeWidth: 1
                            },
                            radius: {80:250},
                            angle: -90,
                            count: 1,
                            isRunLess: true,
                            easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                        }),
                        // burst animation
                        new mojs.Burst({
                            parent: _self.$el,
                            duration: 600,
                            shape : 'circle',
                            fill: '#C0C1C3',
                            x: '0%',
                            y: '50%',
                            childOptions: { 
                                radius: {60:0},
                                type: 'line',
                                stroke: '#988ADE',
                                strokeWidth: 1
                            },
                            radius: {80:200},
                            angle: -90,
                            count: 1,
                            isRunLess: true,
                            easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                        }),
                        // burst animation
                        new mojs.Burst({
                            parent: _self.$el,
                            duration: 600,
                            shape : 'circle',
                            fill: '#C0C1C3',
                            x: '0%',
                            y: '100%',
                            childOptions: { 
                                radius: {60:0},
                                type: 'line',
                                stroke: '#988ADE',
                                strokeWidth: 1
                            },
                            radius: {80:250},
                            angle: -90,
                            count: 1,
                            isRunLess: true,
                            easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                        }),
                        // burst animation
                        new mojs.Burst({
                            parent: _self.$el,
                            duration: 600,
                            delay: 150,
                            shape : 'circle',
                            fill: '#C0C1C3',
                            x: '50%',
                            y: '50%',
                            childOptions: { 
                                radius: {30:0},
                                type: 'line',
                                stroke: '#988ADE',
                                strokeWidth: {2:1}
                            },
                            radius: {60:90},
                            degree: -90,
                            angle: 135,
                            count: 6,
                            isRunLess: true,
                            easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                        }),
                        // icon scale animation
                        new mojs.Tween({
                            duration : 1000,
                            onUpdate: function(progress) {
                                var elasticOutProgress = mojs.easing.elastic.out(progress);
                                el13span.style.WebkitTransform = el13span.style.transform = 'translate3d(' + -50*(1-elasticOutProgress) + '%,0,0)';
                            }
                        })
                    ]
            },
            onCheck(){
                if(!this.isChecked){
                    this.isChecked = true;
                    this.timeline._start();
                }
            },
        },
        components: {}
    }
</script>
<style lang="sass">
/* Icons button */
.icobutton {
    font-size: 3em;
    position: relative;
    margin: 0;
    padding: 0;
    color: #c0c1c3;
    border: 0;
    background: none;
    overflow: visible;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.icobutton .fa {
    display: block;
    padding: 0 0.1em;
}

.icobutton__text {
    font-size: 0.75em;
    position: absolute;
    top: 100%;
    left: -50%;
    width: 200%;
    text-align: center;
    line-height: 1.5;
    color: #a6a6a6;
}

.icobutton__text--side {
    top: 0;
    left: 100%;
    width: 100%;
    width: auto;
    padding: 0 0 0 0.25em;
}

/* fix for mo.js */
.icobutton svg {
    left: 0;
}

.icobutton:hover,
.icobutton:focus {
    outline: none;
}

/* Unicorn */
.icobutton--unicorn svg {
    fill: #c0c1c3;
}
</style>