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

export default {
    components: {
        ActivityItem
    },
    methods: {
       
        init() {
            // this.getActivitys();
        },
       
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


