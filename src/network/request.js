import axios from "axios"

export function request(config) {
    //1 创建axios实例
    const instance = axios.create({
        baseURL: "http://152.136.185.210:8000/api/z8",
        timeout:5000
    });
    
    // 2.1 axios的拦截器
    instance.interceptors.request.use(config => {
        return config;   //拦截了之后要记得把数据返回出去，这样后面才可以使用
    }, err => {
            //console.log(err)
    })

    // 2.2 axios的拦截器
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {
            //console.log(err)
    })

    //3 发送真正的网络请求
    return instance(config)   //返回的是promise对象
}