import { base_url } from "./common"
let http_user = {}
/*
    登录
*/
http_user.login = function (Vue, params) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "/user/login", Vue.$qs.stringify(params))
            .then(result => {
                resolve(result.data);
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
            .post(base_url + "/user/register", Vue.$qs.stringify(params))
            .then(result => {

                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}
export default http_user
