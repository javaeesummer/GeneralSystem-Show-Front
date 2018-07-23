import { base_url } from "./common"
const http_judge = {}
/*
    根据groupId获取作品列表
*/
http_judge.getWorksByGroup = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/getAttendorList", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(data);
            });
    });
}
/*
   打代码=>自闭
   裁判上传评分
*/
http_judge.modifyView = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/modifyReview", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
   创建view
*/
http_judge.upGrade = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/addReview", Vue.$qs.stringify(data))
            .then(result => {

                resolve(result.data);
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
            .post(base_url + "user/getJudge", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
http_judge.openReview = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/openReview", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    })
}

http_judge.getReview = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/getReviewByAttendorId", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    })
}
export default http_judge