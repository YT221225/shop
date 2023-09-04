//引入一级路由组件
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Search from "@/pages/Search"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import paySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
//引入二级路由组件
import MyOrder from "@/pages/Center/myOrder"
import groupOrder from "@/pages/Center/groupOrder"
//配置路由参数
export default [
    {
        path:"/center",
        name:"center",
        component:Center,
        meta:{show:true},
        //二级路由
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:groupOrder
            },
            {
                path:"/center",
                redirect:"/center/myorder"
            }
        ]
    },
    {
        path:"/paysuccess",
        name:"paysuccess",
        component:paySuccess,
        meta:{show:true}
    },
    {
        path:"/pay",
        name:"pay",
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // ...必须从交易页面过来
            if(from.path == "/trade"){
                next()
            }else{
                //中断当前路由跳转
                next(false)
            }
        }
    },
    {
        path:"/trade",
        name:"trade",
        component:Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...必须从购物车页面过来
            if(from.path == "/shopcart"){
                next()
            }else{
                //中断当前路由跳转
                next(false)
            }
        }
    },
    {
        path:"/shopcart",
        name:"shopcart",
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:"addcartsuccess",
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:"/detail/:skuId",
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/home",
        //路由懒加载
        component:()=>import("@/pages/Home"),
        meta:{show:true}
    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        name:"search",
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true},
        //布尔值写法 只能传递params参数
        // props:true
        //对象写法 额外给路由组件传递参数
        // props:{
        //     a:1,
        //     b:2
        // }
        //函数写法 也可以传递query参数
        props:($route)=>({ keyword:$route.params.keyword,k:$route.query.k})
        
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    //重定向
    {
        path:"*",
        redirect:"/home"
    }
]