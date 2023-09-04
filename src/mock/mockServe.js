//引入mock对象
import  Mock  from "mockjs";
//把JSON数据引入 WebPack默认暴露了JSON和图片数据格式 所以不需要用export暴露 但是没有提示
import banner from "./banner.json"
import floor from "./floor.json"
import addressInfo from "./addressInfo.json"

//mock数据 第一个参数是你请求的地址 第二参数是请求的数据
Mock.mock("/mock/banner",{code:200,data:banner})//模拟首页轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor})//floor的数据
Mock.mock("/mock/addressInfo",{code:200,data:addressInfo})
