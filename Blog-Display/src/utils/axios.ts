import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://codegorgeous.top:2550/api',
})

instance.interceptors.request.use((config) => {
    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data)
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
    return response.data
}, (err) => {
    return Promise.reject(err)
})


export default instance

