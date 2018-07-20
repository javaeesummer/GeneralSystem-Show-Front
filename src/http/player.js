import { base_url } from "./common"
const http_player = []
/*
    获取参赛者信息
*/
http_player.getPlayerById = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "user/getAttendor", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
    获取参
*/
http_player.playUpWork = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "uploadFileDAate", Vue.$qs.stringify(data))
            .then(result => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}
export default http_player