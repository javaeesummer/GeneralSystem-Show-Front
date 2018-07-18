<template>
    <div>
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
        <v-dialog v-model="dialog" persistent max-width="500px" >
            <v-card>
                <v-card-title>
                    <span class="headline">作品评审</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
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
                                        <v-subheader>参赛者</v-subheader>
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
                                        <v-text-field suffix="分"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">关闭</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="upGrade">保存</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
export default {
    methods: {
        to_another_page() {
           this.dialog=true
        },
        upGrade(){
            this.dialog = false
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
    data(){
        return{
            dialog:false
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
