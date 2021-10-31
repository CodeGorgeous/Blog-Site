import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:2550/api',
})

instance.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = JSON.stringify(config.data)
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
    return response
}, (err) => {
    return Promise.reject(err)
})


export default instance

