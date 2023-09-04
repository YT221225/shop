//对于axios的第二次封装
import axios from "axios"

//导入处理业务的一些插件
//nprogerss
import nprogerss from "nprogress"
import "nprogress/nprogress.css"

//创建axios的实例对象 以及配置一些参数
const requests = axios.create({
    //延迟5秒自动请求失败
    timeout:5000,
    //基础路径发送请求 在url后面自动加上/api
    baseURL:"/mock"
})
//axios的二次封装主要的原因就是重写请求拦截器和相应拦截器
//请求拦截器
requests.interceptors.request.use((config)=>{
    //配置对象 主要看里面的headers信息 在发送请求之前对业务做一些的处理
    nprogerss.start()

    return config
})
//相应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调 在这里可以在数据响应回来之后做一些对数据的处理
    nprogerss.done()
    return res.data
},(error)=>{
    //失败的回调 返回错误信息
    return error
})

export default requests