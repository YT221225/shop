//vee-validate插件 表单验证区域
import Vue from "vue"
import VeeValidate, { Field } from "vee-validate"
//引入中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN"
//相当于在mian.js中引入 不需要设置对外暴露
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field) => `${field}必须和密码相同`//修改内置规则的massage，让确认密码和密码相同
    },
    //把下面的所有字段用中文代替
    attributes:{
        phone:'手机号',
        code:'验证码',
        password:'密码',
        is_password:'确认密码',
        agree:'协议'
    }
})
//自定义校验规则
VeeValidate.Validator.extend('tongyi',{
    validate:(value) =>{
        return value
    },
    getMessage:(field) => field + "必须同意"
})