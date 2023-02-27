import { createRouter, createWebHistory } from 'vue-router'
import API from "../services/api"
import Cookies from "js-cookie"

const routes = [
    {
        name: "Dashboard", 
        path: '/', 
        component: () => import('../pages/Dashboard.vue'),
    },
    {
        path: '/lists',
        component: () => import('../pages/Lists/Lists.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from)=>{
    if (Cookies.get("isAuthenticated") === undefined) {
        Cookies.set("isAuthenticated", false)
    }
    //If user is unauthenticated but there is a token
    if (Cookies.get("isAuthenticated") === 'false' && Cookies.get("token") !== undefined && Cookies.get("user") === undefined) {
        let {user} = await API.get("auth/user")
        Cookies.set("user", JSON.stringify(user))
        Cookies.set("isAuthenticated", "true")
    }
})

export default router