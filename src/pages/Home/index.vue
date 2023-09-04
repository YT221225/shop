<template>
    <div>
        <!-- 三级联动的组件 不需要在引入 因为已经是全局注册过了 -->
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank />
        <Like />
        <Floor v-for="(floor, index) in floorList" :key="floor.id" :List="floor" />
        <Brand />

    </div>
</template>

<script>

import Recommend from "@/pages/Home/Recommend"
import Rank from "@/pages/Home/Rank"
import ListContainer from "@/pages/Home/ListContainer"
import Like from "@/pages/Home/Like"
import Floor from "@/pages/Home/Floor"
import Brand from "@/pages/Home/Brand"

import { mapState } from "vuex"

export default {

    name: "Home",
    components: {
        Recommend,
        Rank,
        ListContainer,
        Like,
        Floor,
        Brand
    },
    mounted() {
        //派发action获取floor组件的数据
        this.$store.dispatch("getFloorList")
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    }
}
</script>

<style></style>