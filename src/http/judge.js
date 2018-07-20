import { base_url } from "./common"
const http_judge = {}
/*
    根据groupId获取作品列表
*/
http_judge.getWorksByGroup = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "getWorksByGroup", Vue.$qs.stringify(data))
            .then(result => {

                resolve();
            })
            .catch(err => {

                var data = [{
                    title: "作品1",
                    workId: "3",
                    review: true,
                    content: "活动简介"
                },
                {
                    title: "作品2",
                    workId: "4",
                    review: false,
                    content: "活动简介"
                },
                {
                    title: "作品3",
                    workId: "2",
                    review: true,
                    content: "活动简介"
                },
                {
                    title: "作品4",
                    workId: "13",
                    review: true,
                    content: "活动简介"
                }]
                reject(data);
            });
    });
}
/*
   打代码=>自闭
   裁判上传评分
*/
http_judge.upGrade = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "upGrade", Vue.$qs.stringify(data))
            .then(result => {

                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
   获取评委信息
*/
http_judge.getJudge = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "", Vue.$qs.stringify(data))
            .then(result => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export default http_judge