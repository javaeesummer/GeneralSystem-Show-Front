<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="config.drawer = !config.drawer"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down">通用系统作品</span>
        </v-toolbar-title>
        <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>notifications</v-icon>
        </v-btn>
        <!-- <v-btn icon large>
            <v-avatar size="32px" tile>
                <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify">
            </v-avatar>
        </v-btn> -->
    </v-toolbar>
</template>
    
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            config: state => state.config
        })
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        }
    }
};
</script>


<style scoped>
</style>
