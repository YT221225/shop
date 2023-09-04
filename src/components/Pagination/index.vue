<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)"
            :class="{ active: pageNo == 1 }">1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>

        <button v-for="(page, index) in startNumAndEndNum.end " :key="index" v-if="page >= startNumAndEndNum.start"
            @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }">{{ page }}</button>

        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)"
            :class="{ active: pageNo == totalPage }">{{ totalPage }}</button>
        <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

        <button style="margin-left: 30px">共{{ total }}条</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    props: ["pageNo", "pageSize", "total", "continues"],
    //算出总共页码
    computed: {
        //向上取整
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        //计算出连续的页码的起始位置和结束位置 连续页码至少是5
        startNumAndEndNum() {
            const { pageNo, continues, totalPage } = this
            //先定义两个变量储存起始数字和结束数字
            let start = 0, end = 0
            //判断总页码不能小于连续页码 这样的情况是不正常的
            if (this.continues > this.totalPage) {
                //数据不正常的时候
                start = 1
                end = totalPage
            } else {
                //当数据正常的时候 在这里让页码变成活的 不然-2 -3只是死的数据
                start = pageNo - parseInt(continues / 2)
                end = pageNo + parseInt(continues / 2)
                //也会出现不正常的现象 就是start的值小于1 那么页面就会出现0或者负数 所以我们要判断
                if (start < 1) {
                    start = 1
                    end = continues
                }
                //结尾的时候也会出现超出的情况
                if (end > totalPage) {
                    end = totalPage
                    start = totalPage - continues + 1
                }

            }
            return { start, end }
        }
    }
}
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: red;
            color: #fff;
        }
    }
}

</style>
  
  