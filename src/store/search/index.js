import {reqGetSearchInfo} from "@/api/"

//state全局的共享数据
const state = {
    searchList:{}
}
//mutations唯一可以修改state的地方
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
//actions处理业务逻辑 并异步的操作
const actions = {
    async getSearchList({commit},params={}){
        //params的形参是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if(result.code === 200){
            commit("GETSEARCHLIST",result.data)
        }

    } 
}
//getters计算属性 用来简单化数据 由于该情况可能searchList数组为undefined 因为如果断网接口的数据就获取不到 那么就是空对象 空对象在调用属性也是为空
const getters ={
    goodsList(state){
        return state.searchList.goodsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    },
    attrsList(state){
        return state.searchList.attrsList
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}

