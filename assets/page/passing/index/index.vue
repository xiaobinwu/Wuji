<template lang="jade">
    div.main
        Aside(route="passing")
        transition(name="slide")
            router-view
        Footer
</template>

<script>
import Aside from 'component/aside'
import Footer from 'component/footer'
import {passing} from 'config/title'
export default {
    name: 'passing',
    data () {
        return {
        }
    },
    components: {
        Footer,
        Aside
    },
    watch: {
        '$route' (to, from) {
            document.title = passing[to.name];
        }
    }
}
</script>
<style lang="sass">
@import "../../../public/scss/_transition.scss";
</style>