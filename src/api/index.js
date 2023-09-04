//当前这个模块 进行api的统一管理
import requests from "./request"
import requestsMock from "./requestMock"
//调用的是三级联动的接口
export const reqCategoryList = () => requests({url:"/product/getBaseCategoryList",method:"get"})
//当前函数执行要把服务器返回结果返回
//获取Banner虚拟数据
export const reqGetBannerList = () => requestsMock.get("/banner")
//获取Floor虚拟数据
export const reqGetFloorList = () => requestsMock.get("/floor")
//获取搜索模块的数据 需要携带参数(post)
//当前的接口给服务器发送请求至少是一个空对象(默认的参数) 不然会请求失败
export const reqGetSearchInfo = (params) => requests({url:"/list",method:"post",data:params})
//获取商品详情页面的请求
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:"get"})
//将产品添加到购物车中 (获取更新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"})
//获取购物车列表的接口
export const reqCartList = () =>requests({url:"cart/cartList",method:"get"})
//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})
//修改商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
//获取验证码接口
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:"get"})
//用户注册的操作
export const  reqUserRegister = (data)=> requests({url:"/user/passport/register",data,method:"post"})
//用户登录
export const reqUserLogin = (data)=> requests({url:"/user/passport/login",data,method:"post"})
//用户携带token向服务器要数据
export const reqUserInfo = () => requests({url:"/user/passport/auth/getUserInfo",method:"get"})
//退出登录
export const reqUserLogout = () => requests({url:"/user/passport/logout",method:"get"})
//获取用户地址信息 当前接口不能用 采用虚拟接口
// export const reqAddressInfo = () => requests({url:"/user/userAddress/auth/findUserAddressList",method:"get"})
export const reqAddressInfo = () => requestsMock.get("/addressInfo")
//获取用户交易信息
export const reqOrderInfo = () => requests({url:"/order/auth/trade",method:"get"})
//提交订单
export const reqSbumitOrder = (tradeNo,data) => requests({url:`order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})
//获取支付信息
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"})
//获取支付订单状态
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})
//获取我的订单信息
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:"get"})