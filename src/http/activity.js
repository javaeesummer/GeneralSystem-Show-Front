import {base_url} from "./common"
const http_activity = {}

http_activity.getActivitys = function (Vue) {
    let LoginParam = {
        username: "a",
        password: "123"
    };
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url+"user/login", Vue.$qs.stringify(LoginParam))
            .then(result => {
                console.log(result)
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}
http_activity.getActivity = function (Vue) {
    let LoginParam = {
        username: "a",
        password: "123"
    };
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post("/api/user/login", Vue.$qs.stringify(LoginParam))
            .then(result => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}
export default http_activity