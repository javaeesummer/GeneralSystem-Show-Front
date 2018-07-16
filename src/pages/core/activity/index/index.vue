<template>
    <v-container fluid grid-list-md>
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm6 md10>
                <el-card>
                    <v-layout column>
                        <v-flex>
                            <h2>{{activity.name}}</h2>
                        </v-flex>
                        <v-flex>
                            <span>{{activity.describe}}</span>
                        </v-flex>
                        <v-layout align-center justify-start row>
                            <v-flex md1>
                                <span class="v-icon">
                                    <v-icon>people</v-icon>
                                    <span class="v-icon-number">{{activity.attend_person}}</span>
                                </span>
                            </v-flex>
                            <v-flex md2>
                                <span class="v-icon">
                                    <v-icon>access_time</v-icon>
                                    <span class="v-icon-number">{{activity.time}}</span>
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
                                步骤一
                                <small>Summarize if needed</small>
                            </v-stepper-step>
                            <v-stepper-content step="1">
                                <v-card color="grey lighten-3" class="mb-5" height="200px"></v-card>
                            </v-stepper-content>
                            <v-stepper-step :complete="e6 > 2" step="2"> 步骤二</v-stepper-step>
                            <v-stepper-content step="2">
                                <el-card class="box-card">
                                </el-card>
                            </v-stepper-content>
                            <v-stepper-step :complete="e6 > 3" step="3"> 步骤三</v-stepper-step>
                            <v-stepper-content step="3">
                                <el-card class="box-card">
                                </el-card>
                            </v-stepper-content>
                            <v-stepper-step step="4"> 步骤四</v-stepper-step>
                            <v-stepper-content step="4">
                                <v-card color="grey lighten-3" class="mb-5" height="200px"></v-card>
                                <!-- <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn> -->
                            </v-stepper-content>
                        </v-stepper>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex d-flex xs12 sm6 md2 fill-height>
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
    </v-container>
</template>

<script>
import ActivityItem from "@/components/activity-item/index.vue";
export default {
    data() {
        return {
            lorem: "lorem",
            activity: {
                name: "活动标题",
                describe: "活动描述",
                attend_person: 123,
                time: "2017-08-08",
                activityId: 222
            },
            e6: 2
        };
    },
    components: {
        ActivityItem
    },
    methods: {
        toPlayer() {
            this.$router.push({
                name: "player",
                params: { playerId: 123 }
            });
        },
        toJudeg() {
            this.$router.push({
                name: "judge",
                params: { judgeId: 123 }
            });
        },
        toWork() {
            this.$router.push({
                name: "vote-work-index",
                
            });
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
</style>
