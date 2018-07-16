<template>
    <el-card shadow="never" :body-style="{ padding: '10px' }">

        <span class="news__item-title" @click="to_another_page">{{data.title}}</span>
        <v-layout column>

            <v-flex>
                <div class="article-excerpt">{{data.content}}</div>
            </v-flex>
            <v-flex>
                <v-chip label color="green" text-color="white" small v-if="data.review==='true'">
                    <v-icon left v-if="data.review">label</v-icon>已评审
                </v-chip>
                 <v-chip label color="pink" text-color="white" small v-else>
                    <v-icon left v-if="data.review">label</v-icon>未评审
                </v-chip>
            </v-flex>
        </v-layout>

    </el-card>
</template>

<script>
export default {
    methods: {
        to_another_page() {
            var params = {};
            params[this.router_param_name] = this.router_param_value;
            this.$router.push({
                name: this.router_name,
                params: params
            });
        }
    },
    props: {
        data: {
            type: Object
        },
        router_param_name: {
            type: String,
            default: "workId"
        },
        router_param_value: {
            type: String,
            default: "123"
        },
        router_name: {
            type: String,
            default: "review-work"
        }
    }
};
</script>

<style>
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
