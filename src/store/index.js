//引入Vue和Vuex
import Vue from 'vue'
import vuex from "vuex"

//在Vue身上引入此插件 
Vue.use(vuex)

//导入模块
import home from "./home"
import search from "./search"
import detail from './detail'
import shopcart  from './shopcart'
import user from './user'
import trade from './trade'

//对外暴露一个对象 并在mian.js中引入
export default new vuex.Store({
    //模块化vuex
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})