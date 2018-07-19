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
                            <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size" @prev-click="prev_click" @next-click="next_click">
                            </el-pagination>
                        </v-flex>
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
import http_activity from '@/http/activity'
import http_works from '@/http/work'
export default {
    components: {
        WorkItemShow
    },
    data() {
        return {
            total: 20,
            page_size: 10,
            activity_state: "进行中",
            finish: false,
            items: [
                {
                    id: "1",
                    title: "参赛作品1",
                    describe: "描述",
                    workId: "123",
                    file_name: "文件1",
                    vote_number: 10
                },
                {
                    id: "2",
                    title: "参赛作品3",
                    describe: "描述",
                    workId: "124",
                    file_name: "文件1",
                    vote_number: 20
                },
                {
                    id: "3",
                    title: "参赛作品2",
                    describe: "描述",
                    workId: "12",
                    file_name: "文件1",
                    vote_number: 30
                }
            ]
        };
    },
    methods: {
        prev_click(current_page) {
            // console.log("current_page", current_page);
        },
        next_click(current_page) {
            // console.log("current_page", current_page);
        }
    }
};
</script>

<style scoped>
.main-container {
    padding-top: 5px;
}
</style>
