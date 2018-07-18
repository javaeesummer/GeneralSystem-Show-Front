
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
                  <v-text-field label="账号名" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="密码" type="password" required></v-text-field>
                </v-flex>
                <small>*没有账号?</small>
                <small class="register" @click="toRegister()">注册</small>
              </v-layout>
            </v-container>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="closeDialog()">取消</v-btn>
            <v-btn color="blue darken-1" flat @click.native="login()">保存</v-btn>
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
import Cookie from "js-cookie";
export default {
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
        login() {
            Cookie.set("uuid","woshiuuid");
            this.$store.commit("saveloginDialog", false);
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
