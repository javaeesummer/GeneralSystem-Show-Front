<template>
    <el-card shadow="never" :body-style="{ padding: '10px' }">
        <v-layout row>
            <v-flex>
                <v-layout column>
                    <v-flex>
                        <span class="news__item-title" @click="to_another_page">{{data.id}}号</span>

                    </v-flex>
                    <v-flex>

                        <span class="news__item-subtitle">{{data.title}}</span>
                    </v-flex>
                    <v-flex>
                        <div class="article-excerpt">{{data.describe}}</div>
                    </v-flex>
                    <v-flex>
                        <span>票数:</span>
                        <span>{{data.vote_number}}</span>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-spacer></v-spacer>
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
        finish: {
            type: Boolean
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
            default: "vote-work-onework"
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
    margin-right: 10px;
}
.news__item-title:hover {
    color: blue;
}
.news__item-subtitle {
    display: inline;
    font-weight: 500;
    font-size: 14px;
    line-height: 28px;
    color: #212121;
    position: relative;
    vertical-align: middle;
}
.download {
    font-size: 14px;
    color: #888;
}
.download-src {
    font-size: 14px;
}
.article-excerpt {
    /* margin-bottom: 10px; */
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
