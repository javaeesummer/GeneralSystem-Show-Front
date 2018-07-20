import { base_url } from "./common"
const http_activity = {}
/*
    获取所有活动
*/
http_activity.getActivitys = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "user/getActivity", Vue.$qs.stringify(data))
            .then(result => {

                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
    通过活动Id获取活动

*/

http_activity.getActivityById = function (Vue, data) {

    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "user/getActivityById", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
    通过活动的节点信息
*/
http_activity.getActivityNode = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "user/getActivityNode", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
export default http_activity