<template>
    <v-container fluid grid-list-md>
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm6 md9>
                <el-card>
                    <v-layout column>
                        <v-flex>
                            <h2>{{activity.name}}</h2>
                        </v-flex>
                        <v-flex>
                            <span>{{activity.describe}}</span>
                        </v-flex>
                        <v-flex>
                            <span class="v-icon">
                                <svg version="1.1" role="presentation" width="9.142857142857142" height="9.142857142857142" viewBox="0 0 1024 1024" class="svg-icon active" style="width: 15px; height: 15px; transform: rotate(0deg) scale(1, 1);">
                                    <path d="M987.428571 369.714286q0 12.571429-14.857143 27.428571l-207.428571 202.285714 49.142857 285.714286q0.571429 4 0.571429 11.428571 0 12-6 20.285714t-17.428571 8.285714q-10.857143 0-22.857143-6.857143l-256.571429-134.857143-256.571429 134.857143q-12.571429 6.857143-22.857143 6.857143-12 0-18-8.285714t-6-20.285714q0-3.428571 1.142857-11.428571l49.142857-285.714286-208-202.285714q-14.285714-15.428571-14.285714-27.428571 0-21.142857 32-26.285714l286.857143-41.714286 128.571429-260q10.857143-23.428571 28-23.428571t28 23.428571l128.571429 260 286.857143 41.714286q32 5.142857 32 26.285714z" stroke="transparent"></path>
                                </svg>
                                <span class="v-icon-number">{{activity.attend_person}}</span>
                            </span>
                        </v-flex>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm6 md9>

                <v-stepper v-model="e6" vertical>
                    <v-stepper-step :complete="e6 > 1" step="1">
                        {{commit}}
                        <small>Summarize if needed</small>
                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                        <v-btn color="primary" @click="e6 = 2">提交作品</v-btn>
                    </v-stepper-content>
                    <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>
                    <v-stepper-content step="2">
                        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                    </v-stepper-content>
                    <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>
                    <v-stepper-content step="3">
                        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                    </v-stepper-content>
                    <v-stepper-step step="4">View setup instructions</v-stepper-step>
                    <v-stepper-content step="4">
                        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>

                    </v-stepper-content>
                </v-stepper>

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
                name: "我的作品",
                describe: "作品描述",
                attend_person: "未上传"
            },
            e6: 0,
            commit: "提交"
        };
    },
    components: {
        ActivityItem
    },
    methods: {
        toPlayer() {
            this.$router.push({ name: "player" });
        },
        toJudeg() {
            this.$router.push({ name: "judge" });
        }
    }
};
</script>

<style scoped>
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
