<template>
    <div>
        <el-card shadow="never" :body-style="{ padding: '10px' }">

            <span class="news__item-title">{{data.title}}</span>
            <v-layout row>
                <v-layout column md8>
                    <v-flex>
                        <div class="article-excerpt">{{data.content}}</div>
                    </v-flex>
                    <v-flex>
                        <div class="article-excerpt">{{data.src}}</div>
                    </v-flex>
                    <v-layout justify-start row fill-height>
                        <v-flex md2>
                            <span class="v-icon-click">
                                <font-awesome-icon icon="thumbs-up" size="1x" />
                                <span class="v-icon-number">{{data.vote_number}}</span>
                            </span>
                        </v-flex>
                        <v-flex md5>
                            <span class="v-icon-click">
                                <font-awesome-icon icon="user-tie" size="1x" />
                                <span style="width:100px" class="v-icon-number">{{data.author}}</span>
                            </span>
                        </v-flex>
                    </v-layout>
                </v-layout>
                <v-spacer></v-spacer>
                <v-layout>
                    <v-flex>
                        <v-btn slot="activator" color="primary" dark @click="lookJudeReview()">查看专家评语</v-btn>
                    </v-flex>
                </v-layout>
            </v-layout>

        </el-card>
        <v-dialog v-model="dialog" persistent scrollable max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">评委评语</span>
                </v-card-title>
                <v-card-text style="height: 300px;">
                    <v-container grid-list-md>
                        <v-layout column wrap>
                            <div v-for="i in  judge_advices.length" :key="i">
                                <v-flex xs12 sm6 md4>
                                    <large>专家{{i}}</large>
                                </v-flex>
                                <v-flex xs12 sm6 md4>
                                    <small>建议:</small>
                                    <small>{{judge_advices[i].advice}}</small>
                                </v-flex>
                            </div>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">关闭</v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
import http_judge from "@/http/judge";
export default {
    methods: {
        lookJudeReview() {
            this.getReview();
        },
        async getReview() {
            const loading = this.$loading({
                lock: true,
                text: "加载中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            try {
                let data = {};
                this.judge_advices = await http_judge.getReview(this, data);
                console.log(this.judge_advices);
                this.dialog = true;
            } catch (error) {
                console.error(error);
            } finally {
                loading.close();
            }
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
    },
    data() {
        return {
            dialog: false,
            judge_advices: []
        };
    }
};
</script>

<style>
.v-icon-click {
    margin-left: 10px;
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
.news__item-title:hover {
    color: blue;
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
