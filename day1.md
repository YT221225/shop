项目的搭建

一、项目结构的说明
    1.vue-cli脚手架搭建项目
    webpack + nodejs + 淘宝镜像

    2.node_modules:项目依赖

    3.public:一般放置静态资源 放在public文件夹中的资源会被webpack原封不动打包到dist目录中 
    不会大包到js文件中

    4.src:源代码文件夹
        assets:一般是放置静态资源(放置多个组件的公共的静态资源)，
        放置在assets中的文件在webpack打包的时候会把他当作一个模块打包到js文件中
        components:一般放的是非路由组件(全局组件)

        App.vue:项目的唯一根组件 Vue当中的组件(.vue)
        main.js是整个程序的入口文件，也是整个程序最先执行的文件

    5.gitignore文件git忽略的文件

    6.babel.config.js 就是Babel的配置文件 将ES6上的语法对下兼容

    7.package.json 项目的所有依赖 项目的说明

    8.package-lock.json 缓存性的文件 依赖的来源 第二次下载就很快

    9.README.md  是说明性的文件 怎么安装依赖运行打包

二、项目的其他配置
    1.服务启动的时候 设置为自动打开浏览器加载
        在package.json中script上加上 "serve": "vue-cli-service serve --open",

    2.eslint(js语法检查)关闭 在vue.config.js中配置
        module.exports = defineConfig({
        lintOnSave:false,
        })

    3.src的文件夹的简写 配置别名 @就是代表src 不用在../ ./了 在jsconfig.json中配置
    {
        "compilerOptions": {
            "target": "es5",
            "module": "esnext",
            "baseUrl": "./",
            "moduleResolution": "node",
            "paths": {
                "@/*": [
                    "src/*"
                ]
            },
        } 
    }

三、项目路由的分析
    1.前端的路由就是key value键值对 vue-router
        key:就是url(地址栏中的地址)
        value: 对应的组件
    2.路由组件和非路由组件
        Home首页路由组件，Search路由组件，Login路由组件，Refister路由组件
        Hader(在首页和搜索页存在)
        Footer(在首页和搜索页存在) 在登录注册页面是没有的

四、创建非路由组件Header与Footer业务
    1.书写静态页面
    2.拆分组件
    3.获取服务器数据的动态展示
    4.完成相应的动态业务逻辑

    注意1：创建组件的时候，组件结构+组件的样式+图片资源
    注意2：项目采用的样式是less样式，要通过less 和 less-loader进行处理 否则浏览器不认识
    注意3：如果想让less被识别，还得在script身上添加lang=less

    5.使用组件的步骤
    创建    定义    引入    注册    使用

五、路由组件的搭建(Home Search Login Register)
    components文件夹一般放的都是非路由组件 全局组件
    pages|views文件夹 经常放置路由组件

    1.配置路由
    项目当中配置的路由一般放置在router文件夹中
    2.路由组件和非路由组件的区别
    路由组件一定要在router中注册(使用的即为组件的名字)，在mian.js中引用到/Vue实例身上，非路由组件在使用的时候，一般都是以标签的形式在跟组件中使用
    3.完成注册无论是路由组件还是非路由组件身上都有$route $router属性
    $route:一般获取路由信息(path，query，params等)
    $router:一般进行编程式导航进行路由跳转(push(没有历史记录)|replace(有历史记录))

    3.路由的跳转
    路由跳转有两种方式
    声明式导航router-link，可以进行路由跳转
    编程式导航oush|replace,可以进行路由的跳转 还可以做一些其他的业务处理 声明式导航能做的他都能做

六、Footer的显示与隐藏
    显示或者隐藏：v-if | v-show 推荐v-show因为需要频繁的显示或者隐藏
    Footer组件：在Home，Search页面显示 在Reister和Login的时候隐藏

    1.我们可以通过组件身上的route属性获取当前组建的额信息，进行判断来决定显示和隐藏
    2.配置路由原信息，在配置路由的额时候加上字段(mate) 设置为布尔值就可以了 配置项不可以自己起名字

七、路由传参
    params参数：属于路径当中的一部分，需要注意，在配置路由的时候需要占位 /home/:params
    query参数：不属于路径当中的一部分，类似于ajax中的queryString的参数，不需要占位 /home?k=****

    路由传参相关的面试题
    1.路由传递参数(对象写法) path是否可以结合params参数一起使用
        是不可以的 ，因为params传参指定的写法是用name来获取路由组件信息的
    2.如何指定params参数可传可不传 
        在配置路由传参pamars进行占位的时候在后面加上?就可以了(为0或1) 如果不处理 会造成当前路由消失的问题
    3.params传递的是空串该如何解决
        如果不解决就会出现跟不传参出现的问题，解决方式使用 ||运算 取"" || undefind 就可以了
    4.路由组件能不能传递props数据
        可以 而且有布尔值和对象并函数的写法 其中常用的就是函数写法

八、重写push和replace方法
    原因说明 在给路由传递参数的时候 如果一个请求重复发送就会发生一个错误(NavigationDuplicated)

    解决方式一：在进行路由跳转传参的路由语句this.$router.push({name:"search",params:{keyword:this.keyword||undefined},query:{k:this.keyword.toUpperCase()}})push对象中加上两个回调就可以了
        为：this.$router.push({name:"search",params:{keyword:this.keyword||undefined},query:{k:this.keyword.toUpperCase()}},()={},()=>{})
        因为它的底层是Promise封装的 必须传递回调来决定请求的状态 不传递就会报错 传递成功或者失败或者undefined都是可以的
        注意：此方法治标不治本 这样的话没回路由跳转和传参都需要添加两个回调
    
    解决方式二：重写push和replace方法
        首先要找到push和replace方法在哪里 由于他们是在Vuerouter的原型对象上面 上下文为this(VueComponent).$router(VueRouter的实例对象，可以直接访问原型上的方法) 所以要先保存它的上下文对象
        在路由配置文件里面重写此方法 

        ！！！！！！！！！！！！！！！！没有完成
    













