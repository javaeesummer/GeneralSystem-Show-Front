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
        <span @click="filter()" style="cursor:pointer">{{title}}</span>
        <!-- <span v-else @click="loginOut()" style="cursor:pointer">注销</span> -->
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">注销</v-card-title>
                <v-card-text>
                    确定注销吗
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                        取消
                    </v-btn>
                    <v-btn color="green darken-1" flat="flat" @click="dialog_confirm()">
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-toolbar>

</template>
    
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            config: state => state.config,
            user: state => state.user,
            is_login: state => state.user.is_login
        })
    },
    watch: {
        is_login: function(val) {
            if (this.title === "登录") {
                this.title = "注销";
            } else if (this.title === "注销") {
                this.title = "登录";
            }
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
        },
        toHome() {
            this.$router.push({ name: "index" });
        },
        filter() {
            if (this.title === "登录") {
                this.login();
            } else if (this.title === "注销") {
                this.loginOut();
            }
        },
        login() {
            this.$store.commit("saveloginDialog", true);
        },
        loginOut() {
            this.dialog = true;
        },
        //自闭
        dialog_confirm() {
            this.dialog = false;
            this.$store.commit("saveLogin", false);
        }
    },
    data() {
        return {
            dialog: false,

            title: "登录"
        };
    }
};
</script>


<style scoped>
.hidden-md-and-down {
    cursor: pointer;
}
</style>
