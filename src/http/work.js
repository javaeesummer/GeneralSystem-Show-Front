import {base_url} from "./common"
const http_work = {}

http_work.getWork = function (Vue,data) {
    let data = {
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
http_work.getWorks = function (Vue,data) {
   
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
export default http_work