
<template>
    <v-app id="inspire" v-scroll="onScroll">
        <!-- <navigation></navigation> -->
        <header-bar v-if="header_show"></header-bar>
        <v-content>
            <router-view></router-view>
            <!-- <router-view> -->
        </v-content>
        <v-layout row justify-center>
            <v-dialog v-model="config.login_dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                        <span class="headline">登录</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="账号名" required v-model="username" :rules="[rules.required,rules.counter]"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="密码" type="password" required v-model="password" :rules="[rules.required,rules.counter]"></v-text-field>
                                </v-flex>

                                <v-flex>
                                    <small>*没有账号?</small>
                                    <small class="register" @click="toRegister()">注册</small>
                                </v-flex>
                            </v-layout>
                        </v-container>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="closeDialog()">取消</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="login()">登录</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>

    </v-app>
</template>

<script>
import HeaderBar from "./pages/layout/Headbar";
import Navigation from "./pages/layout/Navigation";
import { mapState } from "vuex";
import http_user from "@/http/user.js";
import Cookie from "js-cookie";
export default {
    data() {
        return {
            header_show: true,
            username: "",
            password: "",
            rules: {
                required: value => !!value || "不可或缺",
                counter: value => value.length <= 10 || "Max 10 characters"
            },
            items: ["参赛者", "评委"],
            defaultType: "参赛者",
            offsetTop: [],
            offsetTops: [],
            index: 0
        };
    },
    created() {
        let userId = Cookie.get("userId");
        if (userId) {
            this.$store.commit("saveUserId", userId);
        }
    },
    computed: {
        ...mapState({
            config: state => state.config,
            user: state => state.user
        })
    },
    components: {
        HeaderBar,
        Navigation
    },
    methods: {
        toRegister() {
            this.$router.push({ name: "register" });
        },
        closeDialog() {
            this.$store.commit("saveloginDialog", false);
        },
        vaild() {
            if (!!this.username & !!this.password) {
                return true;
            } else {
                return false;
            }
        },
        async login() {
            if (this.vaild()) {
                try {
                    let params = {
                        username: this.username,
                        password: this.password
                    };
                    let data = await http_user.login(this, params);
                    let userId = 57;

                    this.$message({
                        showClose: true,
                        message: "登录成功",
                        type: "success"
                    });

                    Cookie.set("userId", userId);
                    this.$store.commit("saveloginDialog", false);
                    this.$store.commit("saveUserId", userId);
                } catch (error) {
                    this.$message.error("请输入正确的账号或密码");
                }
            } else {
                this.$message.error("请输入正确的账号或密码");
            }
        },

        onScroll(e) {
            let offsetTop =
                window.pageYOffset || document.documentElement.scrollTop;
            this.offsetTops[this.index] = offsetTop;
            this.index++;
            if (this.offsetTops[this.index] > this.offsetTops[this.index - 1]) {
                // this.header_show = true;
            } else {
                // this.header_show = false;
            }
            if (this.index > 10) {
                this.index = 0;
            }
            // console.log(this.index, this.offsetTops);
        }
    }
};
</script>
<style scoped>
.register {
    color: blue;
    cursor: pointer;
}
</style>
