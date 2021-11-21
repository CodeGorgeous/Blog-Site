<template>
    <div class="type-message-container">
        <el-timeline
            class="timeline-container"
        >
            <el-timeline-item
                v-for="(item) in blogList"
                :key="item.id"
                :timestamp="item.createdAt"
                :hollow="true"
                type="primary"
            >
                <p
                    class="timeline-title"
                    @click="handleClick(item.id)"
                >
                    {{ item.name }}
                </p>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { searchTypeBlog } from '../../api/index'
    import { ElMessage } from 'element-plus'

    export default defineComponent({
        components: {},
        setup (props, context) {
            const route = useRoute()
            const router = useRouter()
            const id: any = ref(route.query.id)

            // 博客数据
            const blogList: any = ref([])

            watchEffect(() => {
                searchTypeBlog(id.value).then((resp: any) => {
                    if (resp.state === 'success') {
                        blogList.value = resp.data
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '获取数据失败, 请刷新页面重新尝试!'
                        })
                    }
                })
            })

            const handleClick = (id: number) => {
                router.push({
                    name: 'BlogMessage',
                    query: {
                        id
                    }
                })
            }

            return {
                blogList,
                handleClick
            }
        }
    })
</script>

<style scoped>
.type-message-container {
    width: 100%;
    height: 100%;
    margin: 80px 0 0 0;
}

.timeline-container {
    width: 30%;
    margin: 0 auto;
    font-size: 20px;
    padding-top: 50px;
}

.timeline-title {
    cursor: pointer;
    display: inline-block;
}

@media (max-width: 576px) {
    .timeline-container {
        width: 80%;
        margin: 0 auto;
        font-size: 20px;
        padding-top: 50px;
    }

}

</style>