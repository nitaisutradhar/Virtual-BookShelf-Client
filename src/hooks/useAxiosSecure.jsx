import axios from 'axios';
import React from 'react';
import useAuth from './useAuth'

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
})
const useAxiosSecure = () => {
        const {user, logOut} = useAuth()
        const token = user?.accessToken;
        //intercept requests
    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    //intercept responses
    axiosInstance.interceptors.response.use(
        res => res,
        err => {
            if (err.status === 401 || err.status === 403) {
                logOut()
                .then(() => {
                    console.log(`You are logged out because of an error with ${err.status} code`)
                })
                .catch(err => console.log(err))
            }
            return Promise.reject(err)
        }
    )
    return axiosInstance
};

export default useAxiosSecure;