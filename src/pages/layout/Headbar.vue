<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="config.drawer = !config.drawer"></v-toolbar-side-icon>
          
                <span class="hidden-md-and-down" @click="toHome()">通用系统作品</span>
           
        </v-toolbar-title>
        <!-- <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field> -->
        <v-spacer></v-spacer>
        <!-- <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn> -->
        <v-menu offset-y left >
            <v-toolbar-title slot="activator">
                <v-icon>perm_identity</v-icon>
            </v-toolbar-title>
            <v-list>
                <v-list-tile @click="filter()">
                    <v-list-tile-title v-if="!user.is_login" @click="login()">登录</v-list-tile-title>
                    <v-list-tile-title v-else @click="loginOut()">注销</v-list-tile-title>
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
            config: state => state.config,
            user:state=>state.user
        })
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        toHome(){
            this.$router.push({name:"index"})
        },
        filter(){
            
        },
        login(){
            this.$store.commit('saveloginDialog',true)

        },
        loginOut(){

        }
    },
    data() {
        return {
            items: [
                {
                    title: "登录"
                }
            ]
        };
    }
};
</script>


<style scoped>
.hidden-md-and-down{
    cursor: pointer;
}
</style>
