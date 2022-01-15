<template>
    <div class="type-container">
        <p class="type-title">分类</p>
        <p class="type-total">共: 1个</p>
        <p class="type-items">
            <div class="type-box">
                <el-button
                    class="type-item"
                    v-for="item in typeList"
                    @click="handleClick(item.id)"
                >
                    {{ item.typeName }}
                </el-button>
            </div>
        </p>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { getAllBlogType } from '../../api/index'
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router'

    export default defineComponent({
        components: {
        },
        setup (props, context) {
            const router = useRouter()
            const typeList: any = ref([])

            getAllBlogType().then((resp: any) => {
                if (resp.state === 'success') {
                    typeList.value = resp.data
                } else {
                    ElMessage({
                        type: 'error',
                        message: '数据获取失败, 请刷新重新尝试!'
                    })
                }
            })

            const handleClick = (id: number) => {
                router.push({
                    name: 'TypeMessage',
                    query: {
                        id
                    }
                })
            }

            return {
                typeList,
                handleClick
            }
        }
    })
</script>

<style scoped>
.type-container {
    width: 100%;
    height: calc(100vh - 315px);
    margin: 80px 0 0 0;
    box-sizing: border-box;
}

.type-title {
    margin: 10px 0;
    text-align: center;
    font-size: 30px;
}

.type-total{
    margin: 10px 0;
    text-align: center;
    font-size: 14px;
    color: #666;
}

.type-items {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
}

.type-box {

}

.type-item {
    margin: 5px;
    display: inline-block;
}

@media (max-width: 576px) {
    .type-items {
        width: 90%;
    }
}

</style>