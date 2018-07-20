<template>
    <v-container fluid grid-list-md style="padding-top:5px">
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm12 md10>
                <el-card>
                    <v-layout column>
                        <v-flex>
                            <h2>{{activity.activityName}}</h2>
                        </v-flex>
                        <v-flex>
                            <span>{{activity.description}}</span>
                        </v-flex>
                        <v-layout align-center justify-start row>
                            <v-flex md1>
                                <span class="v-icon">
                                    <v-icon>people</v-icon>
                                    <span class="v-icon-number">{{activity.attend_person}}</span>
                                </span>
                            </v-flex>
                            <v-flex md4>
                                <span class="v-icon">
                                    <v-icon>access_time</v-icon>
                                    <span class="v-icon-number">{{activity.startTime}} {{sign}} </span>

                                    <span class="v-icon-number"> {{activity.endTime}}</span>
                                </span>
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
        <v-layout row justify-center d-flex>
            <v-flex d-flex xs12 sm8 md8>
                <v-layout column>
                    <v-flex>
                        <v-stepper v-model="step" vertical non-linear>
                            <v-stepper-step :complete="step > 1" step="1">
                                报名阶段
                            </v-stepper-step>
                            <v-stepper-content step="1">
                                <div v-if="nodes.length>=1">
                                    <span>描述:</span>
                                    <span>{{nodes[1].description}}</span>
                                    <br>
                                    <span>开始时间:</span>
                                    <span>{{nodes[1].startTime}}</span>
                                    <br>
                                    <span>结束时间:</span>
                                    <span>{{nodes[1].endTime}}</span>
                                </div>
                            </v-stepper-content>
                            <v-stepper-step :complete="step > 2" step="2">作品提交</v-stepper-step>
                            <v-stepper-content step="2">
                                <div v-if="nodes.length>=2">
                                    <span>描述:</span>
                                    <span>{{nodes[2].description}}</span>
                                    <br>
                                    <span>开始时间:</span>
                                    <span>{{nodes[2].startTime}}</span>
                                    <br>
                                    <span>结束时间:</span>
                                    <span>{{nodes[2].endTime}}</span>
                                </div>
                            </v-stepper-content>
                            <v-stepper-step :complete="step > 3" step="3"> 大众评审</v-stepper-step>
                            <v-stepper-content step="3">
                                <div v-if="nodes.length>=3">
                                    <span>描述:</span>
                                    <span>{{nodes[3].description}}</span>
                                    <br>
                                    <span>开始时间:</span>
                                    <span>{{nodes[3].startTime}}</span>
                                    <br>
                                    <span>结束时间:</span>
                                    <span>{{nodes[3].endTime}}</span>

                                </div>
                            </v-stepper-content>
                            <v-stepper-step :complete="step > 4" step="4"> 专家评审</v-stepper-step>
                            <v-stepper-content step="4">
                                <div v-if="nodes.length>=4">
                                    <span>描述:</span>
                                    <span>{{nodes[4].description}}</span>
                                    <br>
                                    <span>开始时间:</span>
                                    <span>{{nodes[4].startTime}}</span>
                                    <br>
                                    <span>结束时间:</span>
                                    <span>{{nodes[4].endTime}}</span>
                                </div>
                            </v-stepper-content>
                            <v-stepper-step :complete="step > 5" step="5"> 活动完成</v-stepper-step>
                            <v-stepper-content step="5">
                                <router-link :to="{name:'final-result'}">
                                    <span>查看结果</span>
                                </router-link>
                            </v-stepper-content>

                        </v-stepper>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 sm4 md2 fill-height>
                <v-layout column>
                    <v-flex>
                        <el-card>
                            <v-layout column justify-center>
                                <v-flex>
                                    <h2>参赛作品</h2>
                                </v-flex>
                                <v-layout column justify-center align-center>
                                    <v-flex>
                                        <v-btn large color="blue lighten-4" @click="toWork()">点击查看</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </el-card>
                    </v-flex>
                    <v-flex>
                        <el-card>
                            <v-layout column justify-center>
                                <v-flex>
                                    <h2>用户入口</h2>
                                </v-flex>
                                <v-layout column justify-center align-center>
                                    <v-flex>
                                        <v-btn large color="blue lighten-4" @click="toNext('参赛者')">我要参赛</v-btn>
                                    </v-flex>
                                    <v-flex>
                                        <v-btn large color="blue lighten-4" @click="toNext('评委')">我要评审</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </el-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ActivityItem from "@/components/activity-item/index.vue";
import Cookie from "js-cookie";
import http_activity from "@/http/activity";
import http_user from "@/http/user";
import { mapState } from "vuex";
export default {
    data() {
        return {
            activity: {
                activityName: "暂无",
                description: "暂无",
                attend_person: 0,
                startTime: "暂无",
                activityId: 0,
                endTime: ""
            },
            sign: " 至 ",
            step: 1,
            endTime: "2017-09",
            intercept_dialog: {
                dialog_vis: false
            },
            user_type: "",
            nextId: "",
            nodes: []
        };
    },
    components: {
        ActivityItem
    },
    computed: {
        ...mapState({
            user_module: state => state.user
        })
    },
    created() {
        this.init();
    },
    methods: {
        toNext(destination) {
            if (!!this.user_module.user_id) {
                //已登录
                this.toNextPage(destination);
            } else {
                //未登录
                let that = this;
                let messagebox_content = "请先登录";
                this.$confirm(messagebox_content, "提示", {
                    confirmButtonText: "前去登录",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        that.$store.commit("saveloginDialog", true);
                    })
                    .catch(() => {});
            }
        },
        toWork() {
            this.$router.push({
                name: "vote-work-index"
            });
        },
        async getActivityById() {
            try {
                console.log(1);
                let data = {
                    activityId: this.$route.params.activityId
                };
                this.activity = await http_activity.getActivityById(this, data);
                // console.log(activity)
            } catch (error) {
                console.error(error);
            }
        },
        async getActivityPoints() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                this.nodes = await http_activity.getActivityNode(this, data);

                this.nodes = this.sortNode(this.nodes);
            } catch (error) {
                console.error(error);
            }
        },
        async toNextPage(destination) {
            let that = this;
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            try {
                // 1.根据acitivityID、userID获取用户类型,playerId或judgeId
                let data = {
                    activityId: this.$route.params.activityId,
                    userId: this.user_module.user_id
                };

                await http_user.getUserInfo(this, data);

                // 2.
                if (destination === "评委") {
                    this.$route.push({
                        name: "judge",
                        params: { judgeId: judgeId }
                    });
                } else if (destination === "参赛者") {
                    this.$route.push({
                        name: "player",
                        params: { playerId: playerId }
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                loading.close();
                that.$router.push({
                    name: "judge",
                    params: { playerId: 123 }
                });
            }
        },
        sortNode(data) {
            function sequence(a, b) {
                if (a.priority > b.priority) {
                    return 1;
                } else if (a.priority < b.priority) {
                    return -1;
                } else {
                    return 0;
                }
            }
            return data.sort(sequence);
        },
        init() {
            this.getActivityById();

            this.getActivityPoints();
        }
    }
};
</script>

<style scoped>
.box-card {
    height: 240px;
}
.v-icon-number {
    font-size: 12px;
}
.v-icon {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    vertical-align: middle;
}
.v-container {
    padding-top: 5px;
}
</style>

