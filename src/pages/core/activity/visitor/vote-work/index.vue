<template>
    <v-container fluid grid-list-md class="main-container">
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm6 md10>
                <el-card>
                    <v-layout column>
                        <v-flex>
                            <h2>参赛作品</h2>
                        </v-flex>

                        <v-flex>
                            <v-icon color="green darken-2">access_time</v-icon>
                            <span>{{activity_state}}</span>
                        </v-flex>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm6 md8>
                <el-card>
                    <v-layout column wrap>
                        <v-flex>
                            <h2>参赛作品</h2>
                        </v-flex>
                        <div v-if="hava_data">
                            <v-flex>
                                <v-layout column>
                                    <div v-for="item in items" :key="item.workId">
                                        <v-flex>
                                            <work-item-show :data="item" :finish="finish" :router_param_value="item.id"></work-item-show>
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
            <v-flex md2>
                <el-card>
                    <v-layout column wrap>
                        <v-flex>
                            <h2>专家评委</h2>
                        </v-flex>
                        <v-flex>
                            may not
                        </v-flex>
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
export default {
    created() {
        this.init();
    },
    components: {
        WorkItemShow
    },
    data() {
        return {
            hava_data: false,
            current_page: 1,
            page_size: 10,
            total: 10,
            activity_state: "进行中",
            finish: false,
            items: [
                {
                    id: "1",
                    title: "参赛作品名",
                    describe: "描述",
                    workId: "123",
                    file_name: "文件1",
                    vote_number: 10
                },
                {
                    id: "2",
                    title: "参赛作品名",
                    describe: "描述",
                    workId: "124",
                    file_name: "文件1",
                    vote_number: 20
                },
                {
                    id: "3",
                    title: "参赛作品名",
                    describe: "描述",
                    workId: "12",
                    file_name: "文件1",
                    vote_number: 30
                }
            ]
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
                let data = {};
                let works = await http_work.getWorks(this, data);
                if (works.length > 0) {
                    this.hava_data = true;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getActivity() {
            try {
                let data = {};
                await http_activity.getActivityById(this, data);
            } catch (error) {
                console.error(error);
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
</style>