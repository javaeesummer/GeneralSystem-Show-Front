<template>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <!-- <v-toolbar-side-icon @click.stop="config.drawer = !config.drawer"></v-toolbar-side-icon> -->

            <span @click="toHome()" style="cursor:pointer">通用作品</span>

        </v-toolbar-title>
        <!-- <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field> -->
        <v-spacer></v-spacer>
        <!-- <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn> -->
        <span @click="filter()" class="action">{{!!user_id?'注销':'登录'}}</span>
        <!-- <span v-else @click="loginOut()" style="cursor:pointer">注销</span> -->

    </v-toolbar>

</template>
    
<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
    computed: {
        ...mapState({
            config: state => state.config,
            user: state => state.user,
            user_id: state => state.user.user_id
        })
    },
    methods: {
        handleSelect(key, keyPath) {},
        toHome() {
            this.$router.push({ name: "index" });
        },
        filter() {
            if (this.user_id) {
                // id不为空
                this.loginOut();
            } else {
                // id为空
                this.login();
            }
        },
        login() {
            this.$store.commit("saveloginDialog", true);
        },
        loginOut() {
            let that = this;
            this.$confirm("是否注销", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    that.$store.commit("saveUserId", "");
                    Cookie.remove("userId");
                    that.$router.go(0);
                })
                .catch(() => {});
        }
    },
    data() {
        return {};
    }
};
</script>


<style scoped>
.hidden-md-and-down {
    cursor: pointer;
}
.action {
    cursor: pointer;
}
.action:hover {
    color: gold;
}
</style>
