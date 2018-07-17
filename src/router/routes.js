// import { resolve } from "path";
const meta = { requiresAuth: true }

//  1.common
import activity_layout from '../pages/core/activity/layout'
import activity_index from '../pages//core/activity/index/index'
import myindex from '../pages/core/index'
import final_result from '../pages/core/activity/common/final-result'

//  2.裁判
import judge_index from '../pages//core/activity/judge/index/index'
import review_work_index from '../pages/core/activity/judge/review-work/index'
//  3.参赛者
import player_index from '../pages/core/activity/player/index/index'
//  4.游客
import vote_work_layout from '../pages/core/activity/visitor/layout'
import vote_work_index from '../pages/core/activity/visitor/vote-work/index'
import vote_work_onework from "../pages/core/activity/visitor/vote-work-onework/index"


// const alive = true
const routes = [
    {
        path: '/',
        name: "index",
        component: myindex,
    },
    {
        path: '/activity/:activityId',
        name: "activity",
        redirect: { name: "activity-index" },
        component: activity_layout,
        children: [
            {
                path: 'index',
                name: "activity-index",
                component: activity_index,
            },
            {
                path: 'judge/:judgeId',
                name: "judge",
                component: judge_index,

            },
            {
                path: 'player/:playerId',
                name: 'player',
                component: player_index,
            },
            {
                path: 'review-work/:workId',
                name: 'review-work',
                component: review_work_index,
                
            },
            {
                path: 'vote-work',
                name: 'vote-work',
                redirect: { name: "vote-work-index" },
                component: vote_work_layout,
                children: [
                    {
                        path: 'index',
                        name: 'vote-work-index',
                        component: vote_work_index,
                    },
                    {
                        path: 'vote/:workId',
                        name: 'vote-work-onework',
                        component: vote_work_onework,
                    },
                ]
            },
            {
                path: 'final_result',
                name: 'final-result',
                component: final_result,
            },

        ]
    },


]

export default routes