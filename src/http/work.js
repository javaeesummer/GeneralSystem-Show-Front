import { base_url } from "./common"
const http_work = {}

/*
    获取所有作品
*/
http_work.getWorks = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/showAttendorEndResult", Vue.$qs.stringify(data))
            .then(result => {

                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
    获取单个作品信息
*/
http_work.getWork = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/getWorksDetail", Vue.$qs.stringify(data),

        )
            .then(result => {
                resolve(result.data);
            
            })
            .catch(err => {
                reject(err);
            });
    });
}

/*
    上传作品信息
*/
http_work.upWork = function (Vue, data) {
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
/*
    修改作品信息
*/
http_work.modifyWork = function (Vue, data) {
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
/*
    上传作品附件
*/
http_work.upWorkFile = function (Vue, data) {
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
/*
    上传作品附件
*/
http_work.upWork = function (Vue, data) {
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

/*
    投票
*/
http_work.vote = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/addVote", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
http_work.downloadFile = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "downloadFile", Vue.$qs.stringify(data))
            .then(result => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export default http_work