import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import router from "./router"
import "vue3-snackbar/dist/style.css";
import './style.css'
import App from './App.vue'

// Vuetify
import {vuetify} from './plugins/vuetify'

const pinia = createPinia()

const app = createApp(App)
.use(vuetify)
.use(router)
.use(pinia)
.use(SnackbarService)
.component("vue3-snackbar", Vue3Snackbar)
.mount('#app')