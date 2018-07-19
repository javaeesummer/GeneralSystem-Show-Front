
<template>
  <v-app id="inspire">
    <navigation></navigation>
    <header-bar></header-bar>
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
                <small>*没有账号?</small>
                <small class="register" @click="toRegister()">注册</small>
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
import Cookie from 'js-cookie'
export default {
    data() {
        return {
            username: "",
            password: "",
            rules: {
                required: value => !!value || "不可或缺",
                counter: value => value.length <= 10 || "Max 10 characters"
            }
        };
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
                    await http_user.login(this, params);
                    Cookie.set("uuid","123");
                    this.$store.commit("saveLogin", true);
                    this.$store.commit("saveloginDialog", false);
                } catch (error) {
                    this.$message.error("请输入正确的账号或密码");
                }
            } else {
                this.$message.error("请输入正确的账号或密码");
            }
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
