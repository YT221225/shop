import { v4 as uuidv4 } from "uuid"
//随机生成一个随机字符串 而且每次执行不能发生变化 让游客的身份持久存储
export const getUUID = () =>{
    //先从本地存储获取uuid 看一下本地存储里面有没有
    let uuid_token = localStorage.getItem("UUIDTOKEN")
    //如果没有
    if(!uuid_token){
        //生成一个临时的游客身份
        uuid_token = uuidv4()
        //本地存储一次
        localStorage.setItem("UUIDTOKEN",uuid_token)
        //那么用户下一次再进来就不执行了
    }
    return uuid_token
}