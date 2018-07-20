<template>
    <v-container fluid grid-list-md class="main-container">
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm6 md10>
                <el-card>
                    <v-layout column>
                        <v-flex>
                            <h2>{{page.name}}</h2>
                        </v-flex>
                        <v-flex>
                            <span>
                                你好 {{"asd"}} 评委
                            </span>
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
                                    <work-item :data="works[i-1]" :router_param_value="works[i-1].workId"></work-item>
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
export default {
    data() {
        return {
            dialog: false,
            page: {
                name: "我的评审",
                describe: "分配的小组:",
                attend_person: "未上传"
            },
            works: [
                {
                    title: "作品1",
                    workId: "3",
                    review: true,
                    content: "活动简介"
                },
                {
                    title: "作品2",
                    workId: "4",
                    review: false,
                    content: "活动简介"
                },
                {
                    title: "作品3",
                    workId: "2",
                    review: true,
                    content: "活动简介"
                },
                {
                    title: "作品4",
                    workId: "13",
                    review: true,
                    content: "活动简介"
                }
            ]
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
            this.getWorks();
            this.getJudge();
        },
        getWork() {},
        toPlayer() {
            this.$router.push({ name: "player" });
        },
        toJudeg() {
            this.$router.push({ name: "judge" });
        },
        async filterWork(condition) {
            await this.getWorks(condition);
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
        async getWorks(condition) {
            try {
                // let data = {
                //     activityId:this.$route.params.activityId,
                //     group:,
                //     judgeId:
                // };
                this.works = await http_judge.getWorksByGroup(this, data);
            } catch (error) {
                console.error(error);
                this.works = error;
            }
        },
        async getJudge(condition) {
            try {
                let data = {};
                let judge = await http_judge.getJudge(this, data);
                
            } catch (error) {
                console.error(error);
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
