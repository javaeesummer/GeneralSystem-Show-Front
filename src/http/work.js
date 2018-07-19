import { base_url } from "./common"
const http_work = {}

/*
    上传作品信息
*/
http_work.getWorks = function (Vue, data) {
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

export default http_work