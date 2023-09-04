1.开发search模块中商品分类和过渡动画
    商品模块分类需要判断不同的页面呈现的显示和隐藏

    过度动画需要用到vue的内置组件<Transition>来设置过渡动画
    过度动画必须依赖于v-show或者v-if指令才可以进行过度动画

    优化：由于home和search组件都要使用这个列表 如果两个页面来回跳转 那么向action发送请求就会不断的发送 那么就会产生大量的请求
        所以我们让它只发送一次请求 因为请求的数据都是一样的 所以只需要发送一次请求 所以我们把TypeNav组件中的mounted 放在app.vue的根组件中 
        因为根组件只执行一次 不能放在main.js中 因为mian.js不是组件实例 它当中的this是undefined
    
2.合并参数
    由于我们的TypeNav的组件里面路由传参传的都是query参数 而我们的header组件中传递的是params参数 两个参数不能合并
    导致我们携带的参数只能是其中的一种 不能满足我们的需求 所以进行参数合并 在每个传递参数的前面都加上一个判断 如果有一样类型的参数 就加上

3.开发Home首页当中的ListContainer和Floor组件
    服务器返回的数据(接口)只有商品菜单分类数据 对于ListContainer和Floor组件是没有提供的 
    这里需要用到 mock数据(模拟) 他是一个插件可以用npm  i --save mockjs 安装

    使用步骤：
    1.在项目的src文件夹中创建mock文件夹
    2.第二步准备JSON数据(mock文件夹中创建相应的JSON文件) 格式化一下 别留有空格
    3.把mock数据需要的图片放置到public文件夹中(webpack在打包的时候 会把相应的资源原封不动打包到dist文件夹)
    4.第四步开始mock 通过mockjs实现 创建mockServe.js
    5.在入口文件中引 不需要对外暴露 因为只需要让它执行一次
    6.复制以前的接口 修改baseUrl为mock

4.swiper使用
    使用swiper遇到的问题 
    1.使用的前提条件是 必须导入JS和CSS 而且页面结构必须完整 创建swiper实例对象
    2.导入swiper的样式可以在app.vue里面导入 哪里只需要加载一次 不然每个组件里面用到都需要导入
    3.创建实例对象
        问题一：在页面挂载完成也就是mounted生命周期函数中写入那么会出现 服务器的数据还没返回(因为在获取数据的时候 是用异步(Promise)获取的) 页面的结构还没有 页面就开始渲染所以没有任何的效果
        问题二：可以通过updated函数来完成 如果放在里面实例可以创建并且渲染 但是此函数会在别的响应式数据发生改变的时候 重新new一个swiper实例对象 这个会占据大量的内存
        问题三：可以通过在mounted里面创建一个定时器 该定时器会在异步返回数据之后调用 但是会对页面有一定的延迟 如果延迟很高就不利于用户的体验
        最终解决方案：watch + this.$nextTick 来完成 watch用来深度监听数据 确保服务器数据完全返回(发生改变的时候) this.$nextTick就是页面的DOM元素更新完成 结构搭建完成之后调用 
            注意 this.$nextTick里面会有很多的插件因为很多的插件都是在更新DOM之后来对页面或者逻辑业务做出相应的处理
    
5.开发Floor
    在页面里面别使用 id来获取DOM了 可以使用ref加上refs来使用操作该DOM元素
    由于该组件在页面中复用 那么就会从服务器返回两个数据 如果在floor组件中处理的话 那么无法接受两个对象 所以我们应该在home父组件身上发送请求
    在home上复用的组件上使用的时候 就不需要定义两个了 自定义属性也可以写在标签上 通过v-for来遍历
    数据在父组件home上 由于子组件需要数据 就出现了父子组件的通信
        props：用于父子组件的通信
        自定义事件：@on @emit
        全局事件总线：@bus 还有好几种
    
    由于floor里面的数据是从组件那里传递过来的 异步的请求在父组件那里都处理好了 所以不需要在watch和nextTick来处理了 因为当前页面的数据都是同步的

6.注册Carousel全局组件
    由于轮播图的结构都是一样的 在本质上没有什么区别 就是他们处理数据的方式不同 一个是在watch和nextTick里面处理 一个是在mounted里面(而在这里处理数据不能用于watch监听 因为数据根本没有发生变化 传递过来的)
    但全局组件要我们保持一致 所以我们在watch里面添加了immediate为true的选项 就是上来自动监听 不需要数据发生改变 在main.js中注册全局组件 
    然后在组件中创建一个props用于接受数据 然后在哟用的时候把数据传递给组件就可以了

7.开发search模块组件
    1.静态页面
    2.api接口数据
    3.vuex处理数据
    4.数据响应式

    在这里我们利用gtters来简单化数据 然后在页面里使用mapGetters来获取简化过的数据
    我们在这里要先在beforeMount生命周期函数中来合并所有的参数 然后在mounted里面发给服务器获取数据 但是这里只能发送一次请求所以不能满足我们的需求
    我们要把发送请求的语句 封装为一个独立的函数 那么在mounted里面调用 还能在监视中调用 在这里我们要监视的数据是$route因为它里面就是我们请求的路径 不需要深度监视
    然后合并参数发送请求 最后清空三级联动的id数据 否则不同的id都存在 数据就会出现错误 别的不需要清除

8.面包屑
    动态开发面包屑中的分类名 自己跳自己 保留params参数
    动态开发面包屑中的关键字
        清除关键字以后 需要让兄弟Header组件中的关键字清除 vux $bus(万能)
    1.分类面包屑 判断参数列表当中是否有这个属性值 用v-show来控制显示和隐藏 点击删除的时候 把三级联动里面的数据设置为undefined 判断params是否有参数值有的话就一起重新发送请求获取数据
    2.关键字面包屑 这里需要用到全局事件总线$bus.$emit来通知兄弟Header组件删除搜索框的数据 判断query是否有参数值有的话就一起重新发送请求获取数据
    3.品牌面包屑 给子组件绑定自定义事件 通过自定义事件$emit的方式把数据返回给父组件 然后在页面里传入 不过传递过来的是key:value的对象我们需要把它split一下成为数组 注意置空trademark的时候不能为undefined
    4.属性面包屑 其他的操作跟上面一样 由于是数组 在生成面包屑的时候 需要v-for遍历 判断清除重复的元素 然后发送请求 通过splice方法来传递一个索引值删除元素

9.排序操作
    order是有默认值的 为1:desc" 综合降序
    1.点击的时候 颜色加深 实际上就是一个类名的原因
        默认的是1:desc" 综合降序有类名
    2.箭头显示的问题 就是谁有类名谁有箭头
    3.箭头指向的问题 通过判断加三元运算来进行分别

10.分页器展示
    因为服务器返回的数据有很多 一页全部展示的话会造成浏览器的卡顿现象 所以我们要进行分页缓解浏览器的压力

    1.pageNo：字段表示当前的页数
    2.pageSize：代表每一页展示多少条数据
    3.total：一共有多少条数据  在这里我们可以拿总数据对pageSize进行除法运算并向上取整
    4.continues：代表分页连续页码个数 一般在这里我们都采用5|7 因为对称

    通过给父子组件绑定自定义事件 来传递数据给父组件 父组件拿到数据然后整理参数给服务器发送请求

     滚动行为就是VueRouter里面的scrollBehavior()方法设置x和y就可以了 单位为px



