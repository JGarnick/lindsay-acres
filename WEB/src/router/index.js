import { createRouter, createWebHistory } from 'vue-router'
import API from "../services/api"
import Cookies from "js-cookie"

const token = Cookies.get("token")

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

router.beforeEach((to, from)=>{
    if (Cookies.get("isAuthenticated") === undefined) {
        Cookies.set("isAuthenticated", false)
    }
    //If user is unauthenticated but there is a token
    if (Cookies.get("isAuthenticated") === 'false' && Cookies.get("token") !== undefined) {
        // API.get("auth/user")
        
    }
    
})

export default router