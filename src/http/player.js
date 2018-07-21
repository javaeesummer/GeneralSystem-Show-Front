import { base_url } from "./common"
import http_activity from "./activity";
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
    参赛者上传作品
*/
http_player.playUpWork = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "file/uploadFileDAate", Vue.$qs.stringify(data))
            .then(result => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

/*
    获取所有参赛者
*/
http_player.getAllPlayer = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/showAllAttendor", Vue.$qs.stringify(data),{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export default http_player