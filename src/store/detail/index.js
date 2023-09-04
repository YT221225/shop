import { reqGoodsInfo } from "@/api"
import { reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from "@/utils/uuid_token"

const state = {
    //初始值
    goodInfo:{},
    //生成游客的临时身份
    uuid_token:getUUID()
}

const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    },

}

const actions = {
    //获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    },
    //将产品添加到购物车 由于服务器并没有返回什么数据 那么vuex当中根本就不需要存储数据 只需要知道当前操作成功就可以了
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code == 200){
            return "ok"
        }else{
            return new Error("请求失败")
        }
    },
}

const getters = {
    //获取导航路径区域
    categoryView(state){
        //如果不加上{}空对象 那么就会出现假报错 因为是异步服务器没有返回来数据之前goodInfo是为空的 空的对象肯定没有categoryView属性 页面中调用也会报错 所以当服务器数据没有回来之前用空对象至少是undefined
        return state.goodInfo.categoryView || {}
    },
    //获取商品详细信息
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    //产品售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}