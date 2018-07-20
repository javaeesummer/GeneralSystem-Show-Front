<template>
    <v-container fluid grid-list-md style="padding-top:5px">
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm12 md10>
                <el-card>
                    <v-layout column>
                        <v-flex>
                            <h2>作品标题</h2>
                        </v-flex>
                        <v-layout align-center justify-start row>
                            <v-flex md1>
                                <span class="v-icon">
                                    <v-icon>person</v-icon>
                                    <span class="v-icon-number">作者</span>
                                </span>
                            </v-flex>
                            <v-flex md2>
                                <span class="v-icon-click" @click="vote()" @mouseenter="enter" @mouseleave="leave">
                                    <v-icon :color="vote_icon_color">thumb_up_alt</v-icon>
                                    <span class="v-icon-number">票数</span>
                                </span>
                            </v-flex>
                        </v-layout>
                        <small>*点击票数即可投票</small>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
        <v-layout row justify-center d-flex>
            <v-flex d-flex xs12 sm12 md10>
                <el-card body-style="{min-hight:'500px'}">
                    <v-layout column>
                        <v-flex>
                            <h2>作品介绍</h2>
                        </v-flex>
                        <v-flex class="content">
                            作品介绍
                        </v-flex>
                        <v-flex>
                            <h2>下载地址</h2>
                        </v-flex>
                        <v-flex>
                            <a>作品名字</a>
                        </v-flex>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import http_work from "@/http/work";
import VueStar from "vue-star";
export default {
    components: {
        VueStar
    },
    data() {
        return {
            activity: {
                name: "活动标题",
                describe: "活动描述",
                attend_person: 123,
                time: "2017-08-08",
                activityId: 222
            },
            vote_icon_color: "red",
            e6: 2
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getWork();
        },
        async getWork() {
            try {
                let data = {};
                let work = await http_work.getWork(this, data);
            } catch (error) {
                console.error(error);
            }
        },
        async vote() {
            try {
                let data = {};
                this.$alert("点赞成功", "恭喜", {
                    confirmButtonText: "确定",
                    callback: action => {
                       
                    }
                });
                await http_work.vote(this, data);
            } catch (error) {
                console.error(error);
            }
        },
        enter() {
            this.vote_icon_color = "red";
            console.log();
        },
        leave() {
            this.vote_icon_color = "undefined";
        }
    }
};
</script>

<style scoped>
.content {
    min-height: 200px;
    _height: 450px;
}
.v-icon-number {
    font-size: 12px;
}
.v-icon {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    vertical-align: middle;
}
.v-container {
    padding-top: 5px;
}
.v-icon-click {
    font-size: 12px;
    cursor: pointer;
}
</style>
