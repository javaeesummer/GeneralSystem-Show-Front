<template>
    <v-container fluid grid-list-md style="padding-top:5px">
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm12 md10>
                <el-card>
                    <v-layout column align-center wrap>
                        <v-flex>
                            <h2>注册</h2>
                        </v-flex>

                        <v-flex>
                            <v-text-field :rules="[rules.required]" prepend-icon="account_circle" label="账号名" single-line v-model="username"></v-text-field>
                        </v-flex>

                        <v-flex>
                            <v-text-field :rules="[rules.required]" @click:append="show = !show" :append-icon="show? 'visibility_off' : 'visibility'" :type="show ? 'text' : 'password'" prepend-icon="lock" label="密码" single-line v-model="password"></v-text-field>
                        </v-flex>
                        <small>*评委请向主办方询问账号</small>
                        <br>
                        <v-flex>
                            <v-btn @click="register()">注册</v-btn>
                        </v-flex>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import http_user from "@/http/user";
export default {
    data() {
        return {
            username: "",
            password: "",
            show: false,
            rules: {
                required: value => !!value || "必不可少"
            }
        };
    },
    created() {
        this.$store.commit("saveloginDialog", false);
    },
    methods: {
        init() {},
        async register() {
            if (this.vaild()) {
                try {
                    let data = {
                        username: this.username,
                        password: this.password
                    };
                    await http_user.register(this, data);
                    this.$message.success("注册成功");
                    this.$router.push({
                        name: "index"
                    });
                } catch (error) {
                    this.$message.error("请输入正确的账号或密码");
                    console.error(error);
                }
            } else {
                this.$message.error("请输入正确的账号或密码");
            }
        },
        vaild() {
            if (!!this.username & !!this.password) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>

 <style scoped>
.v-text-field {
    width: 400px;
}
</style>

