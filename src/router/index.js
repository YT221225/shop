//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
//引入store
import store from "@/store"
//安装插件到vue
Vue.use(VueRouter)
// //首先把push和replace原型方法保存一份，因为只需要封装一层回调不需要特别的改代码
// let originPush = VueRouter.prototype.push
// let originReplace = VueRouter.prototype.replace
// //重写push和replace方法
// //第一个参数告诉push和replace往哪里跳转 第二个参数就是成功的回调 第三个参数就是失败的回调
// //利用call来篡改函数的上下文(或者apply，不同点它是传递数组) 在执行回调函数
// VueRouter.prototype.push = function(location,resolve,reject){ 
//     if(resolve && reject){
//         originPush.call(this,location,resolve,reject)
//     }else{
//         originPush.call(this.location,()=>{},()=>{})
//     }
   
    
// }
// VueRouter.prototype.replace = function(location,resolve,reject){
//     if(resolve && reject){
//         originReplace.call(this,location,resolve,reject)
//     }else{
//         originReplace.call(this.location,()=>{},()=>{})
//     }
// }

//配置路由
let router =  new VueRouter({
    //配置全部的路由
    routes,
    //设置滚动条 y是控制垂直方向 0是在最顶部 可以根据像素来调节 但不能是负数 
    scrollBehavior(){
        return { y : 0}
    }

})
//全局守卫 前置守卫
router.beforeEach(async(to,from,next)=>{
    //用户登录了才会有token 没有登录是没有的 然后进行判断
    let token = store.state.user.token
    let userName = store.state.user.name
    if(token){
        if(to.path=='/login'){
            next('/')
        }else{
            //登录了 去的不是Login 
            //判断如果有用户信息 那么就放行 如果没有就派发action请求
            if(userName){
                next()
            }else{
                try {
                    //获取用户信息成功 然后放行
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    //token失效了 获取不到用户的信息 先清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        //未登录 不能去交易相关的页面 支付相关的页面 不能去个人中心 可以去home和搜索页面
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            //把未登录而没有去成功的信息 通过query参数保存起来 然后登录直接跳转到相应的页面
            next("/login?redirect="+toPath)
        }else{
            next()
        }

    }
})
export default router