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
            <v-flex d-flex xs12 sm6 md8>
                <v-layout column>

                    <v-flex>
                        <v-stepper v-model="e6" vertical>
                            <v-stepper-step :complete="e6 > 1" step="1">
                                报名阶段
                                
                            </v-stepper-step>
                            <v-stepper-content step="1">
                                <small v-if="e6===2">选手请在{{endTime}}前提交作品</small>
                                <span>开始时间:</span>
                                <span>{{nodes[0].startTiem}}</span>
                                <br>
                                <span>结束时间:</span>
                                <span>{{nodes[0].endTime}}</span>
                            </v-stepper-content>
                            <v-stepper-step :complete="e6 > 2" step="2">作品提交</v-stepper-step>
                            <v-stepper-content step="2">
                             
                            </v-stepper-content>
                            <v-stepper-step :complete="e6 > 3" step="3"> 大众评审</v-stepper-step>
                            <v-stepper-content step="3">
                                <el-card class="box-card">
                                </el-card>
                            </v-stepper-content>
                            <v-stepper-step :complete="e6 > 4" step="4"> 专家评审</v-stepper-step>
                            <v-stepper-content step="4">
                                
                                <!-- <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn> -->
                            </v-stepper-content>
                            <v-stepper-step :complete="e6 > 5" step="5"> 活动完成</v-stepper-step>
                            <v-stepper-content step="5">
                             
                            </v-stepper-content>

                        </v-stepper>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex d-flex xs12 sm2 md2 fill-height>
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
                                        <v-btn large color="blue lighten-4" @click="toPlayer()">我要参赛</v-btn>
                                    </v-flex>
                                    <v-flex>
                                        <v-btn large color="blue lighten-4" @click="toJudeg()">我要评审</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-layout>
                        </el-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-dialog v-model="intercept_dialog.dialog_vis" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    提示
                </v-card-title>
                <v-card-text>
                    请先登录
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="intercept_dialog.dialog_vis">
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import ActivityItem from "@/components/activity-item/index.vue";
import Cookie from "js-cookie";
import http_activity from "@/http/activity";
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
            e6: 1,
            endTime: "2017-09",
            intercept_dialog: {
                dialog_vis: false
            },
            nodes: [{}, {}]
        };
    },
    components: {
        ActivityItem
    },
    created() {
        this.init();
    },
    methods: {
        intercept() {
            let next = true;
            if (next) {
                return true;
            } else {
                return false;
            }
        },
        toPlayer() {
            if (this.intercept()) {
                this.$router.push({
                    name: "player",
                    params: { playerId: 123 }
                });
            } else {
                this.intercept_dialog.dialog_vis = true;
            }
        },
        toJudeg() {
            if (this.intercept()) {
                this.$router.push({
                    name: "judge",
                    params: { judgeId: 123 }
                });
            } else {
                this.intercept_dialog.dialog_vis = true;
            }
        },
        toWork() {
            this.$router.push({
                name: "vote-work-index"
            });
        },
        async getActivityById() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                this.activity = await http_activity.getActivityById(this, data);
                // console.log(activity)
            } catch (error) {}
        },
        async getActivityPoints() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                await http_activity.getActivityPointByActivityId(this, data);
            } catch (error) {}
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

