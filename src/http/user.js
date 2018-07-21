import { base_url } from "./common"
let http_user = {}
/*
    登录
*/
http_user.login = function (Vue, params) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "user/login", Vue.$qs.stringify(params))
            .then(result => {

                resolve(result.data);
                // resolve()
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
    注册
*/
http_user.register = function (Vue, params) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "user/register", Vue.$qs.stringify(params))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/*
    获取一个活动id和用户id 获取他在活动中身份
*/
http_user.getUserInfo = function (Vue, params) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "judge/getUserInfo", Vue.$qs.stringify(params))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

/*
    用户注册成参赛者
*/
http_user.registerPlayer = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "user/registerAttendor", Vue.$qs.stringify(data))
            .then(result => {
                resolve(result.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
export default http_user
