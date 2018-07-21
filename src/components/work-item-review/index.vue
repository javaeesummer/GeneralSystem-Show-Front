<template>
    <div>
        <el-card shadow="never" :body-style="{ padding: '10px' }">

            <span class="news__item-title" @click="openDialog()">{{data.title}}</span>
            <v-layout column>
                <v-flex>
                    <v-chip label color="green" text-color="white" small v-if="data.review===true">
                        <v-icon left v-if="data.review">label</v-icon>已评审
                    </v-chip>
                    <v-chip label color="pink" text-color="white" small v-else>
                        <v-icon left v-if="data.review">label</v-icon>未评审
                    </v-chip>
                </v-flex>
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
                                    <v-subheader>{{openview.workname}}</v-subheader>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>参赛者编号</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-subheader>{{openview.attendorid}}</v-subheader>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>作品简介</v-subheader>
                                </v-flex>
                                <v-flex xs8>
                                    <v-subheader>{{openview.description}}</v-subheader>
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
                                    <v-text-field :value="openview.result" solo></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs12 sm6 md12>
                            <v-layout row>
                                <v-flex xs4>
                                    <v-subheader>评语</v-subheader>
                                </v-flex>
                                <v-flex xs8 md6>
                                    <v-textarea :value="openview.advice" solo></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">关闭</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="upGrade()">提交</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
import http_judege from "@/http/judge";
export default {
    methods: {
        upGrade() {
            this.up();
        },
        openDialog() {
            this.dialog = true;
            this.openReview();
        },

        async openReview() {
            try {
                // let data={
                //     attendorId:,
                //     judgeId:
                // }
                let mydata = {
                    attendorId: this.player_id,
                    judgeId: this.$route.params.judgeId
                };
                this.openview = await http_judege.openReview(this, mydata);
                console.log("1", this.openview);
                console.log("2", this.openview.description);
            } catch (error) {
                console.error(error);
            }
        },
        async up() {
            const loading = this.$loading({
                lock: true,
                text: "上传中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            try {
                let mydata = {
                    reviewId: this.openview.reviewid,
                    attendorId: this.openview.attendorid,
                    result: this.openview.result,
                    advice: this.openview.advice,
                    judgeId: this.$route.params.judgeId
                };
                let success = await http_judege.modifyView(this, mydata);
                if (success) {
                    this.$message.success("修改成功");
                } else {
                    this.$message.error("修改失败");
                }
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
        },
        player_id: {
            type: Number
        }
    },
    data() {
        return {
            dialog: false,
            openview: {
                advice: "",
                description: "",
                attendorid: "",
                result: "",
                reviewid: "",
                workname: ""
            }
        };
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
