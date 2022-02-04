import axios from 'axios'
import { IResponse } from '@/types/interfaces'

const instance = axios.create({
    baseURL: 'http://localhost:2550/api',
})

instance.interceptors.request.use((config) => {
    if (config.method === 'POST' || config.method === 'PUT') {
        config.data = JSON.stringify(config.data)
    }
    return config;
}, (err) => {
    return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
    const data: IResponse = response.data;
    return data;
}, (err) => {
    return Promise.reject(err)
})


export default instance

