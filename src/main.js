import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import {Icon,MessageBox} from "element-ui"
//在入口文件中注册
import router from "@/router"
import store from "@/store"
//注册全局组件
import TypeNav from "@/components/TypeNav"
import Carsouel from "@/components/Carouel"
import Pagination from "@/components/Pagination"
//引入mock
import "@/mock/mockServe"
//引入vue-lazyload
import VueLazyload from 'vue-lazyload'
//引入Swiper样式
import "swiper/css/swiper.css"
//统一引入api接口中全部的请求函数
import * as API from "@/api"
import GGbond from "@/assets/GGbond.gif"
//注册全局组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsouel.name,Carsouel)
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
Vue.use(Icon)
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:GGbond
})
//引入表单校验插件
import "@/plugins/validate"
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
new Vue({
  //配置全局事件总线$bus 和 全局API
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
  //注册路由
  router,
  store
}).$mount('#app')

