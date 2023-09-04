<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carsouel, index) in List" :key="carsouel.id">
                <img :src="carsouel.imgUrl">
            </div>
        </div>

        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>
<script>
import Swiper from "swiper"
export default{
    name:"Carsouel",
    props:["List"],
    watch: {
        //监听bannerList数据的变化
        List: {
            immediate:true,
            //有变化之后直接执行此回调函数
            handler(newValue, oldValue) {
                //等到服务器的数据返回之后 并在页面的DOM更新并且循环结束之后立马执行延迟回调
                this.$nextTick(() => {
                    var mySwiper = new Swiper(this.$refs.cur, {
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },

                        // 如果需要滚动条
                        scrollbar: {
                            el: '.swiper-scrollbar',
                        },
                    })
                })
            }
        }
    }
}
</script>