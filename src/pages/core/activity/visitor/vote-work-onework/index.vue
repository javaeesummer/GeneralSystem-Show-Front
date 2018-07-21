<template>
    <v-container fluid grid-list-md style="padding-top:5px">
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm12 md10>
                <el-card>
                    <v-layout column>
                        <v-flex>
                            <h2>{{work.workname}}</h2>
                        </v-flex>
                        <v-layout align-center justify-start row>
                            <v-flex md1>
                                <span class="v-icon">
                                    <v-icon>person</v-icon>
                                    <span class="v-icon-number">{{attendorId}}</span>
                                </span>
                            </v-flex>
                            <v-flex md2>
                                <span class="v-icon-click" @click="vote()" @mouseenter="enter" @mouseleave="leave">
                                    <v-icon :color="vote_icon_color">thumb_up_alt</v-icon>
                                    <span class="v-icon-number">{{vote_num}}</span>
                                </span>
                            </v-flex>
                        </v-layout>
                        <small>*点击票数即可投票</small>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
        <v-layout row justify-center d-flex>
            <v-flex d-flex xs12 sm12 md10>
                <el-card body-style="{min-hight:'500px'}">
                    <v-layout column>
                        <v-flex>
                            <h2>作品介绍</h2>
                        </v-flex>
                        <v-flex class="content">
                            {{work.description}}
                        </v-flex>
                        <v-flex>
                            <h2>下载地址</h2>
                        </v-flex>
                        <v-flex>
                            <a :href="work.filepath" target="_blank">作品名字</a>
                        </v-flex>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import http_work from "@/http/work";
import http_activity from "@/http/activity";
import http_player from "@/http/player";
import VueStar from "vue-star";
export default {
    components: {
        VueStar
    },
    data() {
        return {
            can_vote: true,
            activity: {
                name: "活动标题",
                describe: "活动描述",
                attend_person: 123,
                time: "2017-08-08",
                activityId: 222
            },
            vote_icon_color: "",
            e6: 2,
            attendorId: "",
            vote_num: 0,
            work: {
                workname: "",
                worksid: "",
                description: "作品介绍",
                filepath: ""
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getPageInfo();
            this.getActivityInfo();
        },
        async getPageInfo() {
            try {
                let data = {
                    attendorId: this.$route.params.workId
                };
                let player = await http_player.getPlayerById(this, data);
                this.attendorId = player.attendorid + "号";
                this.vote_num = player.votenum;
                this.work = (await http_work.getWork(this, data))[0];
                this.work.filepath =
                    "http://47.104.236.227:8080/summar/file/downloadFile?attendorid=" +
                    this.attendorId;
            } catch (error) {
                console.error(error);
            }
        },

        async vote() {
            if (this.can_vote === true) {
                try {
                    let data = {
                        attendorId: this.$route.params.workId,
                        activityId: this.$route.params.activityId
                    };
                    let suceess = await http_work.vote(this, data);

                    if (suceess) {
                        this.$alert("点赞成功", "恭喜", {
                            confirmButtonText: "确定",
                            callback: action => {}
                        });
                        this.can_vote = false;
                        this.vote_icon_color = "red";
                    } else {
                        this.$alert("服务器出错", "抱歉", {
                            confirmButtonText: "确定",
                            callback: action => {}
                        });
                    }
                } catch (error) {
                    console.error(error);
                    this.$alert("服务器出错", "抱歉", {
                        confirmButtonText: "确定",
                        callback: action => {}
                    });
                } finally {
                    await this.getPageInfo();
                }
            } else {
                this.$alert("不能投票", "抱歉", {
                    confirmButtonText: "确定",
                    callback: action => {}
                });
            }
        },

        enter() {
            this.vote_icon_color = "red";
        },
        leave() {
            if (this.can_vote === true) {
                this.vote_icon_color = "undefined";
            }
        },
        async getActivityInfo() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                let activity;
                let activity_nodes;
                [activity, activity_nodes] = await Promise.all([
                    http_activity.getActivityById(this, data),
                    http_activity.getActivityNode(this, data)
                ]);
                this.nowState(activity, activity_nodes);
            } catch (error) {}
        },
        nowState(activity, activity_nodes) {
            //找到投票节点
            let vote_node = activity_nodes.find(item => {
                return item.priority === 3;
            });
            console.log(activity.conutStatus);
            //如果有
            if (vote_node) {
                if (activity.conutStatus < 3) {
                    this.can_vote = false;
                } else if (activity.conutStatus === 3) {
                    this.can_vote = true;
                } else if (activity.conutStatus > 3) {
                    this.can_vote = false;
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
.content {
    min-height: 200px;
    _height: 450px;
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
.v-icon-click {
    font-size: 12px;
    cursor: pointer;
}
</style>
