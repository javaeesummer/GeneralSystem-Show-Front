import { base_url } from "./common"
const http_activity = {}
/*
    获取所有活动
*/
http_activity.getActivitys = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "user/getAllActivity", Vue.$qs.stringify(data))
            .then(result => {
                console.log(result)
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
    通过活动Id获取活动
    1.活动基本信息
    2.活动节点
*/

http_activity.getActivityById = function (Vue, data) {
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
    通过活动的节点信息
*/
http_activity.getActivityPointById = function (Vue, data) {
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
export default http_activity