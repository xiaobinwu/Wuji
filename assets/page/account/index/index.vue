<template lang="jade">
    div.main
        transition(name="slide")
            router-view
</template>

<script>

export default {
    name: 'account',
    data () {
        return {
        }
    },
    components: {
    },
    watch: {
      '$route' (to, from) {
      }
    }
}
</script>
<style lang="sass">
@import "../../../public/scss/_transition.scss";
</style>