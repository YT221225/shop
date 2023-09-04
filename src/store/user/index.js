import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqUserLogout} from "@/api"

const state = {
    //验证码
    code:"",
    //在这里获取本地存储当中的token 第一次跟空串没有什么区别 第二次就是读取本地存储中的token
    token:localStorage.getItem("TOKEN"),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        state.token = ""
        state.userInfo = {}
        localStorage.removeItem("TOKEN")
    }
}
const actions = {
    //获取验证码 在这里后台的数据是假的 发请求之前要输入验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit("GETCODE",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("获取失败"))
        }
    },
    //用户注册验证
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error("注册失败"))
        }
    },
    //用户登录验证
    async userLogin({commit},user){
        let result = await reqUserLogin(user)
        //将来经常通过token向服务器找数据进行展示
        if(result.code == 200){
            commit("USERLOGIN",result.data.token)
            //将数据添加到本地存储
            localStorage.setItem("TOKEN",result.data.token)
            return "ok"
        }else{
            return Promise.reject(new Error("登录失败"))
        }
    },
    //token获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code == 200){ 
            //提交用户信息
            commit("GETUSERINFO",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("用户信息获取失败"))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqUserLogout();
        if(result.code == 200){
            //action里面不能直接修改state里面的数据 通知commit修改数据
            commit("CLEAR")
            return "ok"
        }else{
            return Promise.reject(new Error("退出失败"))
        }
    }
}
const getters = {
}
export default{
    state,
    mutations,
    actions,
    getters
}