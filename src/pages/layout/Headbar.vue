<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="config.drawer = !config.drawer"></v-toolbar-side-icon>
            <span class="hidden-md-and-down">通用系统作品</span>
        </v-toolbar-title>
        <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-menu transition="slide-y-transition" bottom >
            <v-toolbar-title slot="activator">
                <v-icon>perm_identity</v-icon>
            </v-toolbar-title>
            <v-list>
                <v-list-tile v-for="(item, index) in items" :key="index" @click="">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>

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
    },
    data() {
        return {
            items: [
                {
                    title: "个人中心"
                },
                {
                    title: "注销"
                }
            ]
        };
    }
};
</script>


<style scoped>
</style>
