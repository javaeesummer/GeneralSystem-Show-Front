<template>
    <v-footer :fixed="fixed" app>
        <span>&copy; 2017</span>
    </v-footer>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            isFullScreen: state => state.d2admin.isFullScreen
        })
    },
    data() {
        return {
            fixed: false
        };
    }
};
</script>

<style>
</style>
