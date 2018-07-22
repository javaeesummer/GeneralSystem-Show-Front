<template>
    <v-container fluid grid-list-md class="main-container">
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm6 md10>
                <el-card>
                    <v-layout column>
                        <v-flex>
                            <h2>{{page.name}}</h2>
                        </v-flex>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm6 md10>
                <el-card :body-style="{padding:'10px'}">
                    <v-chip label @click="filterWork('全部')">全部</v-chip>
                    <v-chip label color="green darken-1" text-color="white" @click="filterWork('已评审')">
                        已评审
                    </v-chip>
                    <v-chip label color="pink" text-color="white" @click="filterWork('未评审')">未评审</v-chip>
                    <v-card flat>
                        <v-card-text>
                            <div v-for="i in works.length" :key="i">
                                <v-flex>
                                    <work-item :data="works[i-1]" :router_param_value="works[i-1].workId" :player_id="works[i-1].attendorid" :can_review="can_review"></work-item>
                                </v-flex>
                            </div>
                        </v-card-text>
                    </v-card>
                </el-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
import WorkItem from "@/components/work-item-review/index.vue";
import http_judge from "@/http/judge.js";
import http_activity from "@/http/activity";
export default {
    data() {
        return {
            dialog: false,
            can_review: false,
            page: {
                name: "我的评审",
                describe: "分配的小组:",
                attend_person: "未上传"
            },
            works: []
        };
    },
    components: {
        WorkItem
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            // this.getWorks();
            this.getPageInfo();
            this.getActivityInfo();
        },
        async filterWork(condition) {
            await this.getPageInfo();
            if (condition === "已评审") {
                this.works = this.works.filter(item => {
                    return item.review === true;
                });
            } else if (condition === "未评审") {
                this.works = this.works.filter(item => {
                    return item.review === false;
                });
            }
        },
        async getPageInfo() {
            const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            try {
                let data = {};
                let that = this;
                let judgeList = await http_judge.getJudge(this, data);
                let judge = judgeList.find(item => {
                    return (item.judgeid = that.$route.params.judgeId);
                });

                data = {
                    activityId: this.$route.params.activityId,
                    groupId: judge.jugegroupid,
                    judgeId: judge.judgeid
                };
                let workList = await http_judge.getWorksByGroup(this, data);
                this.works = workList;
                /*
                 {
                    title: "作品4",
                    workId: "13",
                    review: true,
                    content: "活动简介"
                }
                */
                this.works = this.works.filter(element => {
                    return element.workname != null;
                });
                this.works.forEach(element => {
                    element["title"] = element.workname;
                    element["review"] = element.ifjudged ? true : false;
                });
            } catch (error) {
                console.error(error);
            } finally {
                loading.close();
            }
        },
        async getActivityInfo() {
            let that = this;
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                this.activity = await http_activity.getActivityById(this, data);
                while (this.step < this.activity.conutStatus) {
                    this.step = this.step + 1;
                }

                this.nodes = await http_activity.getActivityNode(this, data);
                this.nodes = this.sortNode(this.nodes);

                this.nowState(this.activity, this.nodes);
            } catch (error) {
                console.error("error", error);
            } finally {
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
        nowState(activity, activity_nodes) {
            let vote_node = activity_nodes.find(item => {
                return item.priority === 4;
            });
            if (vote_node) {
                if (activity.conutStatus < 3) {
                    this.can_review = false;
                } else if (activity.conutStatus === 4) {
                    this.can_review = true;
                } else if (activity.conutStatus > 4) {
                    this.can_review = false;
                }
            } else {
                this.$route.push({
                    name: "404"
                });
            }
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
.card-body {
    padding-top: 5px;
    padding-left: 5px;
}
.main-container {
    padding-top: 5px;
}
</style>
