<template>
    <v-container fluid grid-list-md>
        <v-layout column wrap justify-center>
            <v-flex d-flex xs12 sm12 md10>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="title">热门活动</span>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <v-flex ma-2>
                            <activity-item :data="items[o-1]" :router_param_value="items[o-1].activityId"></activity-item>
                        </v-flex>
                    </div>
                    <div class="text-xs-center">
                        <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size">
                        </el-pagination>
                    </div>
                </el-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import ActivityItem from "@/components/activity-item/index.vue";
import http_activity from "@/http/activity.js";
export default {
    components: {
        ActivityItem
    },
    methods: {
        axios_getActivitys() {
            var that = this;
            // console.log("12")
            let LoginParam = {
                username: "a",
                password: "123"
            };
            return new Promise((resolve, reject) => {
                that.$axios
                    .post("http://47.104.236.227:8080/summar/user/login", this.$qs.stringify(LoginParam))
                    .then(result => {
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        init() {
            this.getActivitys();
        },
        async getActivitys() {
            try {
                await http_activity.getActivitys(this);
                // this.items=await this.axios_getActivitys();
            } catch (error) {
                console.log("error", error);
            }
        }
    },
    created() {
        this.init();
    },
    data() {
        return {
            page_size: 10,
            total: 15,
            items: [
                {
                    title: "活动1",
                    sponsorName: "主办方asd",
                    content: "活动真是好啊",
                    people: 10,
                    activityId: "123",
                    startData: "2018-08-08"
                },
                {
                    title: "活动1",
                    sponsorName: "主办方asd",
                    content: "活动真是好啊",
                    people: 10,
                    activityId: "124",
                    startData: "2018-08-08"
                },
                {
                    title: "活动2",
                    sponsorName: "主办方asd",
                    content: "活动真是好啊",
                    people: 10,
                    activityId: "125",
                    startData: "2018-08-08"
                },
                {
                    title: "活动2",
                    sponsorName: "主办方asd",
                    content: "活动真是好啊",
                    people: 12,
                    activityId: "126",
                    startData: "2018-08-08"
                }
            ]
        };
    }
};
</script>

<style scoped>
.title {
    color: black;
}
</style>


