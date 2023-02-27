import useEventBus from "../composables/eventBus";
import Cookies from "js-cookie"
const {emit} = useEventBus()
const STRIP_SLASHES_PATTERN = "/^\/+|\/+$/"

const API = class{
    constructor(){
        this.base_url = import.meta.env.VITE_API_ENDPOINT;
        this.headers = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json"
        })
        if (Cookies.get("token")) {
            this.headers.set("Authorization", "Bearer " + Cookies.get("token"))
        }
    };

    async get(path, paginate = false){
        try{
            path = path.replace(STRIP_SLASHES_PATTERN, '');
            if (paginate) {
                path += `?perPage=${paginate.perPage}&page=${paginate.page}`
            }
            let response_data = await fetch(this.base_url + path, {
                    method: "GET",
                    headers: this.headers
                })
                .then(re => re.json())
                .then(data => {
                    return data;
                });
                
            emit("triggerToast", {type: 'success', text: response_data.message})
            return response_data.data;
        }catch(error){
            emit("triggerToast", {type: 'error', text: 'There was a problem fetching the Entities'})
        }
    }

    async post(path, data){
        try {
            path = path.replace(STRIP_SLASHES_PATTERN, '');
            if (data.id) {
                path += `/${data.id}`
            }
            let response_data = await fetch(this.base_url + path, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(re => re.json())
            .then(data => {
                return data;
            });
        
            emit("triggerToast", {type: 'success', text: response_data.message})
            return response_data
        } catch (error) {
            emit("triggerToast", {type: 'error', text: 'There was an error creating the Entity'})
        }
    }
    async patch(path, data){
        try {
            path = path.replace(STRIP_SLASHES_PATTERN, '');
            if (data.id) {
                path += `/${data.id}`
            }
            let response_data = await fetch(this.base_url + path, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(data)
            })
            .then(re => re.json())
            .then(data => {
                return data;
            });
        
            emit("triggerToast", {type: 'success', text: response_data.message})
            return response_data
        } catch (error) {
            emit("triggerToast", {type: 'error', text: 'There was an error updating the Entity'})
        }
    }

    async destroy(path, id){
        try {
            path = path.replace(STRIP_SLASHES_PATTERN, '') + `/${id}`;
            let response_data = await fetch(this.base_url + path, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(re => re.json())
            .then(data => {
                return data;
            });
        
            emit("triggerToast", {type: 'success', text: response_data.message})
            return response_data
        } catch (error) {
            emit("triggerToast", {type: 'error', text: 'There was an error deleting the Entity'})
        }
    }
}

export default new API