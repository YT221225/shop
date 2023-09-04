import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api';

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表的数据
    async getCartList({ commit }) {
        let resutl = await reqCartList()
        if (resutl.code == 200) {
            commit("GETCARTLIST", resutl.data)
        }
    },
    //删除购物车产品信息
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return "ok"
        } else {
            return new Error("删除失败")
        }
    },
    //修改购物车产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return "ok"
        } else {
            return new Error("修改失败")
        }
    },
    //删除选中的产品信息
    deleteAllCheckedCart({ dispatch, getters }) {
        //因为删除接口的回调是一个Promise对象 所以我们需要定义一数组存放Promise 用all(全部为真则为真 一个失败全部失败)方法遍历成功还是失败
        let Promisearr = []
        //获取购物车中全部商品(是一个数组)
        getters.cartList.cartInfoList.forEach(item => {
            //调用删除接口 删除指定次数
            let promise = item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : ""
            Promisearr.push(promise)
        });
        return Promise.all(Promisearr)
    },
    //修改产品的全部状态
    updateAllCartChecked({dispatch,state},isChecked){
        //定义一个数组
        let Promisearr = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch("updateCheckedById",{skuId:item.skuId,isChecked})
            Promisearr.push(promise)
        })
        return Promise.all(Promisearr)
    }

}
const getters = {
    //简化数据
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}