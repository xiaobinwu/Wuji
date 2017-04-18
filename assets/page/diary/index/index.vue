<template lang="jade">
    div.main
        Aside(route="journals")
        transition(appear, name="slide", mode="out-in", @after-enter="afterEnter")
            router-view
        Footer(:body-height="bodyHeight")
</template>

<script>
import Aside from 'component/aside'
import Footer from 'component/footer'
import {diary} from 'config/title'
export default {
    name: 'diary',
    data () {
        return {
            bodyHeight: 0
        }
    },
    components: {
        Footer,
        Aside
    },
    methods:{
        afterEnter(){
            this.bodyHeight = document.querySelector('body').offsetHeight;
        }
    },
    watch: {
      '$route' (to, from) {
            document.title = diary[to.name];
      }
    }
}
</script>
<style lang="sass">
@import "../../../public/scss/_transition.scss";
</style>