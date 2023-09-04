//创建home模块化

//导入配置好的接口数据
import {reqCategoryList,reqGetBannerList,reqGetFloorList} from "@/api"

//state全局的共享数据
const state = {
    //数据起始值不能随便定义 需要找到接口对应的数据类 因为数组接受不了对象的值
    categoryList : [],
    bannerList : [],
    floorList:[]
}
//mutations唯一可以修改state的地方
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }

}
//actions处理业务逻辑 并异步的操作
const actions = {
    //处理接口数据 通过api里面的接口向服务器发送请求 获取服务器的数据
    async categoryList({commit}){
         let result = await reqCategoryList();
         if(result.code === 200){
            commit("CATEGORYLIST",result.data)
         }
    },
    //处理banner(轮播图)的mock数据接口
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code === 200){
            commit("GETBANNERLIST",result.data)
        }

    },
    //处理banner(轮播图)的mock数据接口
    async getFloorList({commit}){
        let result = await reqGetFloorList();
        if(result.code === 200){
            commit("GETFLOORLIST",result.data)
        }

    }    
}
//getters计算属性 用来简单化数据
const getters ={};
export default{
    state,
    mutations,
    actions,
    getters
}

