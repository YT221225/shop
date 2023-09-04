<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="this.searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">x</i></li>
            <li class="with-x" v-show="this.searchParams.keyword">{{ searchParams.keyword }}<i
                @click="removeKeyword">x</i></li>
            <li class="with-x" v-show="this.searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i
                @click="removeTrademark">x</i></li>
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{ attrValue.split(":")[1]
            }}<i @click="removeAttr(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合<i v-show="isOne" :class="{ 'el-icon-bottom': isDesc, 'el-icon-top': isAsc }"></i></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<i v-show="isTwo" :class="{ 'el-icon-bottom': isDesc, 'el-icon-top': isAsc }"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>

                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5"
            @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { set, start } from 'nprogress';
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",
        "keyword": "",
        "order": "1:desc",
        "pageNo": 1,
        "pageSize": 5,
        "props": [],
        "trademark": ""

      }
    }
  },

  components: {
    SearchSelector
  },
  beforeMount() {
    //在请求发送之前 把接口需要传递的参数 进行整理(然后服务器返回相应的数据)
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getDate()
  },
  computed: {
    ...mapGetters(["goodsList"]),
    //定义页面的高亮的计算属性
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    ////定义页面的箭头上下的计算属性
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    ...mapState({
      total: state => state.search.searchList.total
    })
  },
  methods: {
    getDate() {
      this.$store.dispatch("getSearchList", this.searchParams)
    },
    removeCategoryName() {
      //他们的参数都是可有可无的 所以属性值为空的字符串那么都可以设置为undefined就不会提交服务器上去了 不然还是会作为空值提交上去
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //我们在这里把请求的参数解决了 可是我们的路径没有发生改变 所以我们要把路径改变也就是自己跳自己
      //如果路径当中有params参数那么我们就保留params 只删除其他的参数
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params })
      }

    },
    removeKeyword() {
      //把关键字给置空
      this.searchParams.keyword = undefined;
      //通知兄弟组件herder清除关键字
      this.$bus.$emit("clear")
      //重新发送请求
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query })
      }


    },
    trademarkInfo(trademark) {
      //自定义事件的回调 在子组件中触发
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      //向服务器请求数据
      this.getDate()
    },
    removeTrademark() {
      //删除品牌信息 注意undefined不能作为split的对象 所以要加上或||
      this.searchParams.trademark = undefined || "";
      //再次发送请求
      this.getDate()
    },
    attrInfo(attrs, attrValue) {
      //接收子组件传递过来的属性值 并且整理到数组里面去
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
      //判断数组里面有没有重复的数据
      if (this.searchParams.props.indexOf(props == -1)) this.searchParams.props.push(props)
      //再次发送请求
      this.getDate()
    },
    removeAttr(index) {
      this.searchParams.props.splice(index, 1)
      //在次发送请求
      this.getDate()
    },
    changeOrder(flag) {
      //排序的操作 flag形参 他只是一个标记 代表用户点击的是综合还是价格
      //获取用户最开始的数据
      let orginOrder = this.searchParams.order
      //拆分出来获取
      let originFlag = this.searchParams.order.split(":")[0]
      let originSort = this.searchParams.order.split(":")[1]

      //准备一个新的order值
      let newOrder = ""
      //点击的是相同的按钮
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`
      } else {
        //点击的不是相同的按钮
        newOrder = `${flag}:${'desc'}`
      }
      //将新的order赋予searchParams身上 然后发送请求
      this.searchParams.order = newOrder
      this.getDate()
    },
    //获取子组件的请求数据
    getPageNo(pageNo) {
      //整理参数
      this.searchParams.pageNo = pageNo
      //向服务器发送请求
      this.getDate()
    }
  },
  watch: {
    //如果在生命周期中发送请求那么请求只会发送一次 那么就达不到我们所要的效果
    $route(newValue, oldValue) {
      //再发请求之前在整理一下参数给服务器
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      //再次发送请求
      this.getDate();
      //分类的名字和关键字不用清理 分类的名字是会自动更新的 而关键字是后端服务器的问题
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    }

  }

}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>