<template>

</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            config: state => state.config,
            user: state => state.user
        })
    },
    created(){
        this.$store.commit('saveloginDialog',false)
    }
};
</script>

<style>
</style>
