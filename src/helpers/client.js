/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import * as types from '../store/types'
import store from '../store/store'
import router from '../router'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://app.grjf365.com:9080/';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.getters.bearToken !== null) {
            console.log("add token")
           config.headers.Authorization = store.getters.bearToken
        }
        return config;
    },
    err => {
         console.log("add error")
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error);
    });

export default axios;
