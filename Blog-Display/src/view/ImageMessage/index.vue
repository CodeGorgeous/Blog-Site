<template>
    <div class="image-list-container">
        图片列表
    </div>
</template>

<script lang='ts'>
    import { ElMessage } from 'element-plus'
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { useRoute } from 'vue-router'
    import { searchTypeImage } from '../../api/index'

    export default defineComponent({
        components: {},
        setup (props, context) {
            const route: any = useRoute()

            const dataList: any = ref([])

            searchTypeImage(route.query.id).then((resp: any) => {
                if (resp.state !== 'success') { 
                    return ElMessage({
                            type: 'error',
                            message: '数据获取失败, 请刷新重新尝试!'
                        })
                }
                dataList.value = resp.data
            })
            return {
                dataList
            }
        }
    })
</script>

<style scoped>
.image-list-container {
    width: 100%;
    height: 100%;
    margin: 80px 0 0 0;
}
</style>