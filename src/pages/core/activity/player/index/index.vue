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
                            <span>{{activity.describe}}</span>
                        </v-flex>
                        <v-flex>
                            <span class="v-icon">
                                <svg version="1.1" role="presentation" width="9.142857142857142" height="9.142857142857142" viewBox="0 0 1024 1024" class="svg-icon active" style="width: 15px; height: 15px; transform: rotate(0deg) scale(1, 1);">
                                    <path d="M987.428571 369.714286q0 12.571429-14.857143 27.428571l-207.428571 202.285714 49.142857 285.714286q0.571429 4 0.571429 11.428571 0 12-6 20.285714t-17.428571 8.285714q-10.857143 0-22.857143-6.857143l-256.571429-134.857143-256.571429 134.857143q-12.571429 6.857143-22.857143 6.857143-12 0-18-8.285714t-6-20.285714q0-3.428571 1.142857-11.428571l49.142857-285.714286-208-202.285714q-14.285714-15.428571-14.285714-27.428571 0-21.142857 32-26.285714l286.857143-41.714286 128.571429-260q10.857143-23.428571 28-23.428571t28 23.428571l128.571429 260 286.857143 41.714286q32 5.142857 32 26.285714z" stroke="transparent"></path>
                                </svg>
                                <span class="v-icon-number">{{activity.attend_person}}</span>
                            </span>
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
                                <v-text-field label="作品名" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="作品简介" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <el-upload :before-upload="beforeUpload()" ref="upload" action="http://47.104.236.227:8080/summar/uploadFile" :limit="limit" :onError="uploadError" :on-success="onSuccess">
                                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                </el-upload>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">关闭</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="confirm()">上传</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-layout row justify-center>
            <v-flex d-flex xs12 sm10 md10>
                <v-stepper v-model="step" vertical>
                    <v-stepper-step :complete="step > 1" step="1">
                        作品提交阶段

                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <small>{{workState[state===0?0:1].state_name}}</small>
                        <v-btn color="primary" @click="commitWork()">提交作品</v-btn>
                        <v-btn color="primary" @click="downloadFile()">下载作品测试</v-btn>

                    </v-stepper-content>
                    <v-stepper-step :complete="step > 2" step="2">大众评审阶段
                    </v-stepper-step>
                    <v-stepper-content step="2">
                        <small>{{workState[state===2?2:3].state_name}}</small>
                    </v-stepper-content>
                    <v-stepper-step :complete="step > 3" step="3">专家评审阶段</v-stepper-step>
                    <v-stepper-content step="3">
                        <small>{{workState[state===4?4:5].state_name}}</small>
                    </v-stepper-content>
                    <v-stepper-step step="4">最终结果</v-stepper-step>
                    <v-stepper-content step="4">
                        <small>{{workState[state].state_name}}</small>
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
    data() {
        return {
            upLoadData: {
                attendorod: "123",
                description: "123",
                workname: "asd"
            },
            limit: 1,
            dialog: false,
            activity: {
                name: "我的作品",
                describe: "作品描述",
                attend_person: "未上传"
            },
            step: 0,
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
            ],
            test: {
                attendorid: "123",
                filepath: "",
                workname: "asd",
                filesize: ""
            }
        };
    },
    methods: {
        onSuccess(response, file, fileList) {
            this.test.filepath = response.data.filepath;
            this.test.filesize = response.data.fileSize;
        },
        beforeUpload(file) {
            // let fd = new FormData();
            // fd.append("file", file); //传文件
            // fd.append("workname", "2"); //传其他参数
            // fd.append("attendorod", "1"); //传其他参数
            // this.$axios
            //     .post("http://47.104.236.227:8080/summar/uploadFile", fd)
            //     .then(function(res) {
            //         alert("成功");
            //     });
        },
        commitWork() {
            this.dialog = true;
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        uploadSuccess() {},
        uploadError() {},
        init() {
            this.getActivity();
            this.getPlayerById();
        },
        judgeState() {
            //判断当前作品的状态
        },
        async getActivity() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                let activity = await http_activity.getActivityById(this, data);
            } catch (error) {}
        },
        async getPlayerById() {
            try {
                let data = {
                    attendorId: this.$route.params.playerId
                };
                let player = await http_player.getPlayerById(this, data);
            } catch (error) {}
        },
        confirm() {
            let data = this.test;
            http_player.playUpWork(this, data);
        },
        downloadFile() {
            let data = {
                attendorId: "123",
                filePath: "/file/2018-07-19/chrome.exe.sig"
            };
            http_work.downloadFile(this, data);
        },
        async getActivityPoints() {
            try {
                let data = {
                    activityId: this.$route.params.activityId
                };
                await http_activity.getActivityNode(this, data);
                this.down();
            } catch (error) {}
        },
        down() {
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            formData.append("snNumber", $("#snNumber").val());
            formData.append("spec", $("#spec").val());
            formData.append("startCreateDate", $("#startCreateDate").val());
            formData.append("endCreateDate", $("#endCreateDate").val());
            formData.append("startActiveDate", $("#startActiveDate").val());
            formData.append("endActiveDate", $("#endActiveDate").val());
            formData.append("supplier", $("#supplier").val());
            formData.append("state", $("#cboDeviceStatus").val());
            xhr.open(
                "POST",
                vpms.ajaxUrl + vpms.manageUserUrl + "exportExcelDevices",
                true
            );
            xhr.setRequestHeader("accessToken", userInfo.accessToken);
            xhr.responseType = "blob";
            xhr.onload = function(e) {
                if (this.status == 200) {
                    var blob = this.response;
                    var filename = "设备导出{0}.xlsx".format(
                        vpms.core.date.format("yyyyMMddhhmmss")
                    );

                    var a = document.createElement("a");
                    blob.type = "application/excel";
                    var url = createObjectURL(blob);
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                }
            };
            xhr.send(formData);
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
