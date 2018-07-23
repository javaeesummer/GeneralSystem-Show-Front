<template>
    <v-container fluid grid-list-md class="main-container">
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm10 md10>
                <el-card>
                    <v-layout column>
                        <v-flex>
                            <h2>{{activity.name}}</h2>
                        </v-flex>
                        <v-flex>
                            <span class="v-icon">
                                <svg version="1.1" role="presentation" width="9.142857142857142" height="9.142857142857142" viewBox="0 0 1024 1024" class="svg-icon active" style="width: 15px; height: 15px; transform: rotate(0deg) scale(1, 1);">
                                    <path d="M987.428571 369.714286q0 12.571429-14.857143 27.428571l-207.428571 202.285714 49.142857 285.714286q0.571429 4 0.571429 11.428571 0 12-6 20.285714t-17.428571 8.285714q-10.857143 0-22.857143-6.857143l-256.571429-134.857143-256.571429 134.857143q-12.571429 6.857143-22.857143 6.857143-12 0-18-8.285714t-6-20.285714q0-3.428571 1.142857-11.428571l49.142857-285.714286-208-202.285714q-14.285714-15.428571-14.285714-27.428571 0-21.142857 32-26.285714l286.857143-41.714286 128.571429-260q10.857143-23.428571 28-23.428571t28 23.428571l128.571429 260 286.857143 41.714286q32 5.142857 32 26.285714z" stroke="transparent"></path>
                                </svg>
                                <span class="v-icon-number">{{attend_person}}</span>
                            </span>
                        </v-flex>
                        <v-flex>
                            <v-btn color="primary" @click="lookwork()">{{btnName}}</v-btn>
                        </v-flex>
                    </v-layout>
                </el-card>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">上传作品</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="作品名" required v-model="upLoadData.workname"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="作品简介" required v-model="upLoadData.description"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <div v-if="step===2">
                                    <div v-if='havawork===false'>
                                        <el-upload ref="upload" action="http://47.104.236.227:8080/summar/file/uploadFile" :limit="limit" :onError="uploadError" :on-success="onSuccess">
                                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                        </el-upload>
                                    </div>
                                    <div v-else>
                                        <a :href="worksrc" target="_blank">我的作品</a>
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">关闭</v-btn>
                    <v-btn v-if='havawork===false' color="blue darken-1" flat @click.native="confirm()">上传</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm10 md10>

                <v-stepper v-model="step" vertical>
                    <v-stepper-step :complete="step > 1" step="1">
                        报名阶段
                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <span>报名成功</span>
                    </v-stepper-content>
                    <v-stepper-step :complete="step > 2" step="2">
                        作品提交阶段
                    </v-stepper-step>
                    <v-stepper-content step="2">
                        <small v-if="flag1">未提交作品</small>
                    </v-stepper-content>
                    <v-stepper-step :complete="step > 3" step="3">
                        大众评审阶段

                    </v-stepper-step>
                    <v-stepper-content step="3">
                    </v-stepper-content>
                    <v-stepper-step :complete="step > 4" step="4">
                        专家评审阶段

                    </v-stepper-step>
                    <v-stepper-content step="4">
                    </v-stepper-content>
                    <v-stepper-step step="5">最终结果</v-stepper-step>
                    <v-stepper-content step="5">
                        <router-link :to="{name:'final-result'}">
                            <small>查看结果</small>
                        </router-link>
                    </v-stepper-content>
                </v-stepper>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import http_work from "@/http/work";
import http_player from "@/http/player";
import http_activity from "@/http/activity";
export default {
    created() {
        this.init();
    },
    watch: {
        attend_person: function(val) {
            if (val === "已上传") {
                this.btnName = "查看作品";
            }
        },
        step: function(val) {
          
        },
        havawork: function(val) {
            if (this.havawork) {
                //有作品
                this.btnName = "查看作品";
            }
        }
    },
    data() {
        return {
            flag1: false,
            rules: {
                have: value => false
            },
            btnName: "未上传",
            upLoadData: {
                attendorid: this.$route.params.playerId,
                workname: "",
                description: "",
                filepath: "",
                filesize: ""
            },
            limit: 1,
            dialog: false,
            activity: {
                name: "参赛者主页",
                describe: "作品描述"
            },
            attend_person: "未上传",
            step: 0,
            worksrc: "",
            havawork: false,
            /*
            我的作品状态
            0.未提交
            1.已提交
            2.大众评审中
            3.大众评审完毕
            4.专家评审中
            5.专家评审完毕
            6.最终结果
            */
            state: 0,
            workState: [
                {
                    state_name: "未提交"
                },
                {
                    state_name: "已提交"
                },
                {
                    state_name: "大众评审中"
                },
                {
                    state_name: "大众评审完毕"
                },
                {
                    state_name: "专家评审中"
                },
                {
                    state_name: "专家评审完毕"
                },
                {
                    state_name: "最终结果"
                }
            ]

            // activity_info: {
            //     conutStatus: 0
            // }
        };
    },
    methods: {
        lookwork() {
            let open = false;
            if (this.havawork) {
                open = true;
            }
            if (this.step === 2) {
                open = true;
            }

            if (open) {
              
                this.dialog = true;
            }
        },
        init() {
            this.getPageInfo(), this.getPlayerById(), this.getWork();
        },

        onSuccess(response, file, fileList) {
            this.upLoadData.filepath = response.data.filepath;
            this.upLoadData.filesize = response.data.fileSize;
        },
        uploadError() {
            this.$message.error("上传文件失败");
        },
        submitUpload() {
            this.upLoadData.attendorod = this.$route.params.attendorId;

            this.$refs.upload.submit();
        },
        async getPlayerById() {
            try {
                let data = {
                    attendorId: this.$route.params.playerId
                };
                let player = await http_player.getPlayerById(this, data);
            } catch (error) {
                console.error(error);
            }
        },
        async getWork() {
            try {
                let data = {
                    attendorId: this.$route.params.playerId
                };
                let work = await http_work.getWork(this, data);

                if (work.length > 0) {
                    this.havawork = true;
                    this.upLoadData = work[0];
                    this.attend_person = "已上传";
                    this.worksrc =
                        "http://47.104.236.227:8080/summar/file/downloadFile?attendorid=" +
                        this.upLoadData.attendorid;
                }
            } catch (error) {
                console.error(error);
            }
        },
        async getPageInfo() {
            try {
                let that = this;
                let data = {
                    activityId: this.$route.params.activityId
                };
                let activity_info = await http_activity.getActivityById(
                    this,
                    data
                );
                //step 表示当前结点
                /*
                    1.报名阶段
                    2.提交作品阶段
                    3.其他阶段
                */
             
                this.step = activity_info.conutStatus;
                data = {
                    attendorId: this.$route.params.playerId
                };
                let work = await http_work.getWork(this, data);

                if (work.length > 0) {
                    this.havawork = true;
                    this.upLoadData = work[0];
                    this.attend_person = "已上传";
                    this.worksrc =
                        "http://47.104.236.227:8080/summar/file/downloadFile?attendorid=" +
                        this.upLoadData.attendorid;
                }
                if (this.step > 2 && this.havawork === false) {
                    this.step = 2;
                    this.flag1 = true;
                }
            } catch (error) {
                console.error(error);
            }
        },
        sortNode(data) {
            function sequence(a, b) {
                if (a.priority > b.priority) {
                    return 1;
                } else if (a.priority < b.priority) {
                    return -1;
                } else {
                    return 0;
                }
            }
            return data.sort(sequence);
        },
        confirm() {
            this.upWork();
        },
        async upWork() {
            const loading = this.$loading({
                lock: true,
                text: "上传中",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            try {
                let data = this.upLoadData;
                http_player.playUpWork(this, data);
                this.dialog = false;
            } catch (error) {
                console.error(error);
                this.$message.error(error);
            } finally {
                this.getPageInfo();
                this.getPlayerById();
                this.getWork();
                loading.close();
            }
        },
        downloadFile() {
            let data = {
                attendorId: "123",
                filePath: "/file/2018-07-19/chrome.exe.sig"
            };
            http_work.downloadFile(this, data);
        },
        fmtDate(obj) {
            var date = new Date(obj);
            var y = 1900 + date.getYear();
            var m = "0" + (date.getMonth() + 1);
            var d = "0" + date.getDate();
            return (
                y +
                "-" +
                m.substring(m.length - 2, m.length) +
                "-" +
                d.substring(d.length - 2, d.length)
            );
        }
    }
};
</script>

<style scoped>
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
.main-container {
    padding-top: 5px;
}
</style>
