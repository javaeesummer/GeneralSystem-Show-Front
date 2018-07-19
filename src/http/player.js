import { base_url } from "./common"
const http_player = []
/*
    获取参赛者信息
*/
http_player.getPlayerById = function (Vue, data) {
    return new Promise((resolve, reject) => {
        Vue.$axios
            .post(base_url + "", Vue.$qs.stringify(data))
            .then(result => {
                console.log(result)
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

export default http_player