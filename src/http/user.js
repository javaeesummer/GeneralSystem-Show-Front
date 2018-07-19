import {base_url} from "./common"
let http_user = {}
/*
    登录
*/
http_user.login = function (Vue,params) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post("/api/user/login", Vue.$qs.stringify(params))
            .then(result => {
                console.log(result)
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export default http_user
