<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex d-flex xs12 sm12 md10>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="title">热门活动</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <v-flex ma-2>
                            <activity-item :data="items[o-1]" 
                            :router_param_name="activityId"
                            :router_param_value="items[o-1].activityId"
                            :router_name="activity"
                            ></activity-item>
                        </v-flex>
                    </div>

                </el-card>
            </v-flex>
            <!-- <v-spacer></v-spacer> -->
            <v-flex d-flex xs0 sm0 md2 fill-height>
                <v-layout row wrap>
                    
                    <v-flex d-flex>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span class="title">{{ lorem.slice(0, 70) }}</span>
                            </div>
                        </el-card>
                    </v-flex>
                </v-layout>
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
    created: function() {
        console.log("tewt");
    },
    data() {
        return {
            lorem: "12aa3",
            items: [
                {
                    title:"活动1",
                    sponsorName: "主办方asd",
                    content: "活动真是好啊",
                    people: 10,
                    activityId:"123",
                    startData: "2018-08-08"
                },
                {
                    title:"活动1",
                    sponsorName: "主办方asd",
                    content: "活动真是好啊",
                    people: 10,
                    activityId:"124",
                    startData: "2018-08-08"
                },
                {
                    title:"活动2",
                    sponsorName: "主办方asd",
                    content: "活动真是好啊",
                    people: 10,
                    activityId:"125",
                    startData: "2018-08-08"
                },
                {
                    title:"活动2",
                    sponsorName: "主办方asd",
                    content: "活动真是好啊",
                    people: 12,
                    activityId:"126",
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


