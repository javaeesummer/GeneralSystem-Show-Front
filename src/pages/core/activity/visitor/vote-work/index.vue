<template>
    <v-container fluid grid-list-md class="main-container">
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
                            <v-flex>
                                <span class="v-icon">
                                    <v-icon>access_time</v-icon>
                                    <span class="v-icon-number">投票{{activity_state}}</span>

                                </span>
                            </v-flex>

                        </v-layout>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm12 md10>
                <el-card>
                    <v-layout column wrap>
                        <v-flex>
                            <h2>参赛作品</h2>
                        </v-flex>
                        <div v-if="hava_data">
                            <v-flex>
                                <v-layout column>
                                    <div v-for="item in items.slice((current_page-1)*page_size,current_page*page_size)" :key="item.workId">
                                        <v-flex>
                                            <work-item-show :data="item" :finish="finish" :router_param_value="item.attendorId"></work-item-show>
                                        </v-flex>
                                    </div>
                                </v-layout>
                            </v-flex>
                            <v-flex class="text-xs-center">
                                <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size" @current-change="onPageChange">
                                </el-pagination>
                            </v-flex>
                        </div>
                        <div v-else class="no-content">
                            <v-layout align-center justify-center column fill-height>
                                <v-spacer></v-spacer>
                                <v-flex>
                                    <small>别着急请等选手提交作品</small>
                                </v-flex>
                            </v-layout>
                        </div>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
import WorkItemShow from "@/components/work-item-show/index.vue";
import http_activity from "@/http/activity";
import http_work from "@/http/work";
import http_player from "@/http/player";
export default {
    created() {
        this.init();
    },
    components: {
        WorkItemShow
    },
    watch: {
        items: function(val) {
            this.total = val.length;
        },
        current_page: function(val) {}
    },
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
            hava_data: false,
            current_page: 1,
            page_size: 10,
            total: 0,
            activity_state: "",
            finish: false,
            items: []
        };
    },
    methods: {
        onPageChange(current_page) {
            this.current_page = current_page;
        },
        init() {
            this.getWorks();
            this.getActivityInfo();
        },
        async getWorks() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                this.items = await http_player.getAllPlayer(this, data);
                this.items = this.items.filter(item => {
                    return item.workname != null;
                });
            } catch (error) {
                console.error(error);
            }
        },
        async getActivityInfo() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };

                let activity_nodes;
                [this.activity, activity_nodes] = await Promise.all([
                    http_activity.getActivityById(this, data),
                    http_activity.getActivityNode(this, data)
                ]);
                this.nowState(this.activity, activity_nodes);
            } catch (error) {}
        },
        nowState(activity, activity_nodes) {
            let vote_node = activity_nodes.find(item => {
                return item.priority === 3;
            });
            if (vote_node) {
                if (activity.conutStatus < 3) {
                    this.activity_state = "未开始";
                    this.hava_data = false;
                } else if (activity.conutStatus === 3) {
                    this.activity_state = "进行中";
                    this.hava_data = true;
                } else if (activity.conutStatus > 3) {
                    this.activity_state = "已结束";
                    this.hava_data = true;
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
.main-container {
    padding-top: 5px;
}
.no-content {
    height: 200px;
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