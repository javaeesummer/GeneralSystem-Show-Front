<template>
    <el-card shadow="never" :body-style="{ padding: '10px' }">

        <span class="news__item-title" @click="to_another_page">{{data.activityName}}</span>
        <v-layout column>
            <v-flex>
                <div class="article-excerpt">{{data.description}}</div>
            </v-flex>
            <v-flex>
                <v-layout row justify-start align-cente>
                    <v-flex md2 column>
                        <v-layout>
                            <v-icon color="">outlined_flag</v-icon>
                            <div class="article-meta">{{data.hostId}} </div>
                        </v-layout>
                    </v-flex>
                    <v-flex md2 column>
                        <v-layout>
                            <v-icon color=" ">access_time</v-icon>
                            <div class="article-meta"> {{data.startTime}} 至 {{data.endTime}}</div>
                        </v-layout>
                    </v-flex>
                    <v-flex md2 column>
                        <v-layout>
                            <v-icon color=" ">people_outline</v-icon>
                            <div class="article-meta"> {{data.count}}</div>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </el-card>
</template>

<script>
export default {
    methods: {
        to_another_page() {
            this.$router.push({
                name: "activity",
                params: { activityId: this.data.activityId }
            });
        }
    },
    props: {
        data: {
            type: Object
        }
    }
};
</script>

<style>
.header {
    size: 14px;
}
.news__item-title {
    display: inline;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #212121;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
}
.article-excerpt {
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    color: #888;
    font-size: 14px;
}
.article-meta {
    /* margin-bottom: 10px; */
    margin-top: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    color: #888;
    font-size: 12px;
    vertical-align: middle;

    height: 20px;
    line-height: 20px;
}
</style>
