import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(VueAxios, axios)
app.component('Loading', LoadingPlugin)
app.use(router)
app.mount('#app')
