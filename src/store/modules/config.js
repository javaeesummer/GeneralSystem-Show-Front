import db from '@/libs/db.js';

export default {
    state: {
        login_dialog: false,
        dialog: false,
        drawer: null,
        items: [
            { icon: "contacts", text: "首页", routerName: "index" },

            { icon: "content_copy", text: "评审", routerName: "judge" },

            {
                icon: "keyboard_arrow_up",
                "icon-alt": "keyboard_arrow_down",
                text: "More",
                model: false,
                children: [
                    { text: "Import" },
                    { text: "Export" },
                    { text: "Print" },
                    { text: "Undo changes" },
                    { text: "Other contacts" }
                ]
            },
            { icon: "settings", text: "Settings" },
            { icon: "chat_bubble", text: "Send feedback" },
            { icon: "help", text: "Help" },
            { icon: "phonelink", text: "App downloads" },
            { icon: "keyboard", text: "Go to the old version" }
        ]
    },
    mutations: {
        saveloginDialog(state, login_dialog) {
            state.login_dialog = login_dialog
        },
        /**
            * @class 通用工具
            * @description 将 state 中某一项存储到数据库 如果已经有的话就更新数据 不需要 uuid 所有用户共享
            * @param {state} state vuex state
            * @param {string} key key name
        */
        vuex2Db(state, key) {
            const row = db.get(key).find({ pub: 'pub' })
            if (row.value()) {
                row.assign({ value: state[key] }).write()
            } else {
                db.get(key).push({
                    pub: 'pub',
                    value: state[key]
                }).write()
            }
        },
        /**
            * @class 通用工具
            * @description 从数据库取值到 vuex 不需要 uuid 所有用户共享
            * @param {state} state vuex state
            * @param {object} param1 key and default value
        */
        db2Vuex(state, { key, defaultValue }) {
            const row = db.get(key).find({ pub: 'pub' }).value()
            state[key] = row ? row.value : defaultValue
        },
        /**
            * @class 通用工具
            * @description 删除数据库中对应 vuex 的某一个字段 不需要 uuid 所有用户共享
            * @param {state} state vuex state
            * @param {object} param1 key & empty value
        */
        dbRemove(state, { key, emptyValue }) {
            db.get(key).remove({ pub: 'pub' }).write()
            state[key] = emptyValue
        },
    }

}