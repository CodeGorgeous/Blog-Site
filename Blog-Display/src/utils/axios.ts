import axios from 'axios'
import store from "../store/index"


const instance = axios.create({
    baseURL: 'http://codegorgeous.top:2550/api',
})

instance.interceptors.request.use((config) => {
    store.commit("global/changeLoading", true);

    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data)
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
    store.commit("global/changeLoading", false);
    return response.data
}, (err) => {
    store.commit("global/changeLoading", false);
    return Promise.reject(err)
})


export default instance

