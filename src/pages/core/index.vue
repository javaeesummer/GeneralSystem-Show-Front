<template>
    <v-container fluid grid-list-md>
        <v-layout column wrap justify-center>
            <v-flex d-flex xs12 sm12 md10>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="title">热门活动</span>
                    </div>
                    <div v-if="hava_date">
                        <div v-for="o in items.length" :key="o" class="text item">
                            <v-flex ma-2>
                                <activity-item :data="items[o-1]" :router_param_value="items[o-1].activityId"></activity-item>
                            </v-flex>
                        </div>
                        <div class="text-xs-center">
                            <el-pagination background layout="prev, pager, next" :total="total" :page-size="page_size" @current-change="onPageChange">
                            </el-pagination>
                        </div>
                    </div>
                    <div v-else>
                        <v-layout align-center justify-center column fill-height>
                            <v-spacer></v-spacer>
                            <v-flex>
                                <small>主办方快来发起活动把</small>
                            </v-flex>
                        </v-layout>
                    </div>
                </el-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import ActivityItem from "@/components/activity-item/index.vue";
import http_activity from "@/http/activity";
export default {
    components: {
        ActivityItem
    },
    methods: {
        init() {
            this.getActivity();
        },
        onPageChange(current_page) {
            this.current_page = current_page;
            this.getActivity();
        },
        async getActivity() {
            try {
                let data = {
                    pagenum: 1,
                    pagesize: 100
                };
                let previewdata = await http_activity.getActivitys(this, data);
                this.items = previewdata.activityBeanViewList;

                if (this.items.length > 0) {
                    this.total = previewdata.count;
                    if (previewdata.count === 0) {
                        this.total = this.items.length;
                    }
                    this.hava_date = true;
                    // this.$db.set("activitys", this.items);
                  
                }
                this.items = this.items.slice(
                    (this.current_page - 1) * this.page_size,
                    this.current_page * this.page_size
                );
            } catch (error) {}
        }
    },
    created() {
        this.init();
    },
    data() {
        return {
            hava_date: false,
            current_page: 1,
            page_size: 8,
            total: 15,
            items: []
        };
    }
};
</script>

<style scoped>
.title {
    color: black;
}
</style>


