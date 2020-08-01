import { request } from "network/request.js"

//首页只需要面向这个模块开发就可以，所有首页的数据请求都放在这个文件下

export function getHomeMultidata() {
    return request({
        url:'/home/multidata'
    })
}