import Cookies from 'js-cookie'
import API from '@/services/api.js'

function checkForUserCookie(usersStore){
    if (Cookies.get("user") !== undefined) {
        let auth_user = JSON.parse(Cookies.get("user"))
        usersStore.user = auth_user
    }
}

async function login(data, usersStore){
    let result = await API.post("auth/login", data)
    
    if (result.success) {
        Cookies.set("token", result.token, {expires:1})
        usersStore.user = result.user
        Cookies.set("user", JSON.stringify(result.user))
        Cookies.set("isAuthenticated", "true")
    }

    return result
}

async function logout(usersStore){
    let result = await API.post("auth/logout", [])

    if (result.success) {
        Cookies.remove("user")
        Cookies.remove("token")
        Cookies.set("isAuthenticated", "false")
        Object.assign(usersStore.user, {})
    }

    return result
}

async function register(data){
    return await API.post("auth/register", data)
}

export { checkForUserCookie, login, logout, register }