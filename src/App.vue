<template>
  <div>
    <Header></Header>
    <br>
    <router-view></router-view>
    <br>
    <!-- 控制Footer组件的显示或隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
      // 通知vuex发送请求 获取数据存储于仓库当中
      this.$store.dispatch("categoryList")
  }
}

</script>

