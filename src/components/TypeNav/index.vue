<template>
    <div class="type-nav">
        <div class="container">
            <!-- 事件的委派 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- vue的过渡动画 -->
                <Transition name="sort">
                    <div class="sort" v-show="show">
                    <!-- 事件的委派 -->
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex === index}">
                            <!-- 绑定触摸事件 -->
                            <h3 @mouseenter="changeIndex(index)" >
                                <a :data-categoryName="c1.categoryName" :data-category1id="c1.categoryId">{{ c1.categoryName }}</a>
                            </h3>
                            <div class="item-list clearfix"><!--:style="{display:currentIndex === index?'block':'none'}"JS控制显示隐藏-->>
                                <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2id="c2.categoryId">{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3id="c3.categoryId">{{ c3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                </Transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import throttle from "lodash/throttle"

export default {
    name: "TypeNav",
    //当组件挂在完毕 可以项服务器发送请求
    mounted() {
        //判断是什么组件访问 home即为true search为false 
        if(this.$route.path != "/home"){
            this.show = false
        }
    },
    computed: {
        //mapState就是获取state属性的值 用对象写法 右侧需要的是一个函数 当使用这个计算属性的时候 函数会立即执行
        ...mapState({
            //参数state是一个大仓库中的数据 我们需要把响应的数据取出来
            //在页面里遍历数据
            categoryList: state => state.home.categoryList
        })
    },
    data() {
        return {
            //用来存储用户移动到上面的下标
            currentIndex: -1,
            //用来控制商品分类的显示于隐藏
            show :true
        }
    },
    methods: {
        //用户触摸时发生的事件 用来修改响应式的数据
        changeIndex:throttle(function(index){
            //获取页面列表的索引
            this.currentIndex = index
            // console.log(this.currentIndex);
        },50),
        //用户鼠标离开时发生的事件的回调
        leaveIndex() {
            this.currentIndex = -1
            // console.log(this.currentIndex);
            if(this.$route.path != "/home"){
                this.show = false
        }
            
        },
        goSearch(event){
            //在一级标签上面加上@cilck事件 他的所有子组件都有这个样式 但是我们的需求是只有a标签有此样式 加上data-cetagoryName属性来区分
            //获取使事件身上的所有节点信息
            let element = event.target 
            //target节点有一个dataset属性，可以获取节点的所有属性 在这里event就把自定义属性全部变成为小写
            let {categoryname,category1id,category2id,category3id} = element.dataset
            //如果标签身上有cetagoryname一定是a标签 下面就判断是几级标签 需要在a标签上在添加data-cetagoryId 但是注意要添加不同的级别的cetagoryId
            //  console.log(event.target.dataset);s
            if(categoryname){
                
                //整理需要跳转的参数
                let location = {name:"search"}
                let query = {categoryName: categoryname}
                //一级的参数
                if(category1id){
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else{
                    query.category3Id = category3id
                }
                if(this.$route.params){
                    //如果有params参数加上即可
                    location.params = this.$route.params
                    //整理完成参数 把query动态添加到location里面 成为一个对象
                    location.query = query 
                    //路由跳转 
                    this.$router.push(location,()=>{},()=>{})
                }

                
            }
        },
        enterShow(){
            //鼠标移入的时候让商品列表进行展示
            if(this.$route.path != "/home"){
                this.show = true
        }
        }
    }
}
</script>

<style lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    a:hover{
          cursor:pointer 
    }

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;


            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    &:hover {
                        .item-list {
                            display: block;
                    }
                }
            }
            .cur{
                background: rgb(220, 20, 60);
            }
        }
    }
        //过度动画的样式
        //开始
        .sort-enter{
            height: 0px;
        }
        //结束
        .sort-enter-to{
            height: 461px;
        }
        //定义动画的时间
        .sort-enter-active{
            transition: all .5s linear;
        }
    }
}
</style>