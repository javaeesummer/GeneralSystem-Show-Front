// import { resolve } from "path";


const meta = { requiresAuth: true }


import myindex from '../pages/core/index';
// const alive = true
const routes = [
    {
        path: '/',
        name: "indesx",
        component: myindex,

    },
    {
        path: '/a',
        name: "index",
        component: myindex,

    }
]

export default routes