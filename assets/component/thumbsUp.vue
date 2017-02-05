<template lang="jade">
    button.icobutton.icobutton--heart(@click="onCheck",:class="{ active: isChecked }")
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
                activeColor: '#F35186'
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init(){
                this.initAnimocon();
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
                let elspan = this.$el.querySelector('span');
                return [
                    // ring animation
                    new mojs.Transit({
                        parent: _self.$el,
                        duration: 750,
                        type: 'circle',
                        radius: {0: 20},
                        fill: 'transparent',
                        stroke: _self.activeColor,
                        strokeWidth: {35:0},
                        opacity: 0.2,
                        x: '-6.5%',     
                        y: '-4%',
                        isRunLess: true,
                        easing: mojs.easing.bezier(0, 1, 0.5, 1)
                    }),
                    new mojs.Transit({
                        parent: _self.$el,
                        duration: 500,
                        delay: 100,
                        type: 'circle',
                        radius: {0: 20},
                        fill: 'transparent',
                        stroke: _self.activeColor,
                        strokeWidth: {5:0},
                        opacity: 0.2,
                        x: '-89%', 
                        y: '-77%',
                        shiftX : 40, 
                        shiftY : -60,
                        isRunLess: true,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Transit({
                        parent: _self.$el,
                        duration: 500,
                        delay: 180,
                        type: 'circle',
                        radius: {0: 15},
                        fill: 'transparent',
                        stroke: _self.activeColor,
                        strokeWidth: {5:0},
                        opacity: 0.5,
                        x: '-200%', 
                        y: '-20%',
                        shiftX : -10, 
                        shiftY : -80,
                        isRunLess: true,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Transit({
                        parent: _self.$el,
                        duration: 800,
                        delay: 240,
                        type: 'circle',
                        radius: {0: 20},
                        fill: 'transparent',
                        stroke: _self.activeColor,
                        strokeWidth: {5:0},
                        opacity: 0.3,
                        x: '10%', 
                        y: '-75%',
                        shiftX : -70, 
                        shiftY : -10,
                        isRunLess: true,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Transit({
                        parent: _self.$el,
                        duration: 800,
                        delay: 240,
                        type: 'circle',
                        radius: {0: 10},
                        fill: 'transparent',
                        stroke: _self.activeColor,
                        strokeWidth: {5:0},
                        opacity: 0.4,
                        x: '250%', 
                        y: '-100%',
                        shiftX : 80, 
                        shiftY : -50,
                        isRunLess: true,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Transit({
                        parent: _self.$el,
                        duration: 1000,
                        delay: 300,
                        type: 'circle',
                        radius: {0: 15},
                        fill: 'transparent',
                        stroke: _self.activeColor,
                        strokeWidth: {5:0},
                        opacity: 0.2,
                        x: '100%', 
                        y: '-150%',
                        shiftX : 20, 
                        shiftY : -100,
                        isRunLess: true,
                        easing: mojs.easing.sin.out
                    }),
                    new mojs.Transit({
                        parent: _self.$el,
                        duration: 600,
                        delay: 330,
                        type: 'circle',
                        radius: {0: 25},
                        fill: 'transparent',
                        stroke: _self.activeColor,
                        strokeWidth: {5:0},
                        opacity: 0.4,
                        x: '-130%', 
                        y: '-100%',
                        shiftX : -40, 
                        shiftY : -90,
                        isRunLess: true,
                        easing: mojs.easing.sin.out
                    }),
                    // icon scale animation
                    new mojs.Tween({
                        duration : 1200,
                        easing: mojs.easing.ease.out,
                        onUpdate: function(progress) {
                            if(progress > 0.3) {
                                var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                                elspan.style.WebkitTransform = elspan.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                            }
                            else {
                                elspan.style.WebkitTransform = elspan.style.transform = 'scale3d(0,0,1)';
                            }
                        }
                    })
                ]
            },
            onCheck(){
                if(!this.isChecked){
                    this.isChecked = true;
                    this.timeline.play();
                }
            },
        },
        components: {}
    }
</script>
<style lang="sass">
/* Icons button */
.icobutton {
    font-size: 25px;
    position: relative;
    top: 20px;
    margin: 0 20px 0 0;
    padding: 0;
    color: #c0c1c3;
    border: 0;
    background: none;
    overflow: visible;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    &.active{
        color: #F35186;
    }
    .fa {
        padding: 0 5px;
    }
    .icobutton__text {
        text-align: center;
        font-size: 18px;
        vertical-align: middle;
        color: #a6a6a6;
    }
    /* fix for mo.js */
    svg {
        left: 0;
    }
    &:hover,
    &:focus {
        outline: none;
    }
    /* Unicorn */
    .icobutton--unicorn svg {
        fill: #c0c1c3;
    }
}
</style>