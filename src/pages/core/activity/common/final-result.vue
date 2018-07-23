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
                        <!-- <v-layout align-center justify-start row>
                            <v-flex>
                                <span class="v-icon">
                                    <v-icon>access_time</v-icon>
                                    <span class="v-icon-number">投票{{activity_state}}</span>
                                </span>
                            </v-flex>
                        </v-layout> -->
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm12 md10>
                <el-card>
                    <v-layout column wrap>
                        <v-flex>
                            <h2>优秀作品</h2>
                        </v-flex>
                        <div>
                            <div v-if="hava_data">
                                <v-flex>
                                    <v-layout column>
                                        <div v-for="item in items" :key="item.workId">
                                            <v-flex>
                                                <player-item-result-show :data="item" :finish="finish" :router_param_value="item.id"></player-item-result-show>
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
                                        <small>这个活动有点冷清</small>
                                    </v-flex>
                                </v-layout>
                            </div>
                        </div>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
import PlayerItemResultShow from "@/components/player-item-result-show/index.vue";
import http_activity from "@/http/activity";
import http_work from "@/http/work";
export default {
    created() {
        this.init();
    },
    components: {
        PlayerItemResultShow
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
            total: 10,
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
            this.getActivity();
        },
        async getWorks() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                let works = await http_work.getWorks(this, data);
              
                let itemlist = new Array();
                if (works) {
                    for (let i = 0; i < works.length; i++) {
                       
                        let object = {};
                        object.title = works[i].workname;
                        object.file_name = works[i].workname;
                        // object.workId = 1;
                        //      id: "3",
                        // title: "参赛作品名",
                        // describe: "描述",
                        // workId: "12",
                        // file_name: "文件1",
                        // vote_number: 30
                        object.id = works[i].userid;
                          object.attendorId = works[i].attendorId;
                        object.describe = works[i].description;
                        object.vote_number = works[i].votenum;
                        object.author = works[i].username;
                        if (object.file_name) {
                            itemlist.push(object);
                        }
                    }

                  
                
                    this.items = itemlist;
                    if (this.items.length > 0) {
                        this.hava_data = true;
                    }
                    // this.items = works;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getActivity() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                this.activity = await http_activity.getActivityById(this, data);
                let state = this.nowState(this.activity);
                if (state < 0) {
                    this.activity_state = "未开始";
                } else if ((state = 0)) {
                    this.activity_state = "进行中";
                } else if (state > 0) {
                    this.activity_state = "已结束";
                }
            } catch (error) {
                console.error(error);
            }
        },
        nowState(activity) {
            if (activity.totalCount === 6) {
                if (activity.conutStatus < 3) {
                    return -1;
                } else if (activity.conutStatus === 3) {
                    return 0;
                } else if (activity.conutStatus > 3) {
                    return 1;
                }
            } else if (activity.totalCount === 5) {
                if (activity.conutStatus < 3) {
                    return -1;
                } else if (activity.conutStatus === 3) {
                    return 0;
                } else if (activity.conutStatus > 3) {
                    return 1;
                }
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
.no-content {
    height: 200px;
}
</style>