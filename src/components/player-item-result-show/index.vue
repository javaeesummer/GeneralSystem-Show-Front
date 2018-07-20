<template>
    <div>
        <el-card shadow="never" :body-style="{ padding: '10px' }">

            <span class="news__item-title" @click="to_another_page">{{data.title}}</span>
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
                        <v-flex md2>
                            <span class="v-icon-click">
                                <font-awesome-icon icon="user-tie" size="1x" />
                                <span class="v-icon-number">{{data.vote_number}}</span>
                            </span>
                        </v-flex>
                    </v-layout>
                </v-layout>
                <v-spacer></v-spacer>
                <v-layout>
                    <v-flex>
                        <v-btn>查看专家评语</v-btn>
                    </v-flex>
                </v-layout>
            </v-layout>

        </el-card>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title primary-title>
                    <span class="headline">作品评审</span>
                </v-card-title>
                <v-card-text>

                    <v-layout wrap>
                        <v-flex xs12 sm6 md12>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>作品名称</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-subheader>{{data.title}}</v-subheader>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>参赛者编号</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-subheader>{{data.workId}}</v-subheader>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>作品简介</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-subheader>{{data.content}}</v-subheader>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>作品</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-subheader>作品</v-subheader>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>你的评分</v-subheader>
                                </v-flex>
                                <v-flex xs8 md6>
                                    <v-text-field :value="data.grade" solo></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>评语</v-subheader>
                                </v-flex>
                                <v-flex xs8 md6>
                                    <v-text-field :value="data.grade" solo></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">关闭</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="upGrade">提交</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
export default {
    methods: {
        to_another_page() {
            this.dialog = true;
        },
        upGrade() {
            this.dialog = false;
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
            dialog: false
        };
    }
};
</script>

<style>
.v-icon-click{
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
