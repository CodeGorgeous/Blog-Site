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
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >
                    {{ item.name }}
                </p>
            </el-timeline-item>
        </el-timeline>
        <NotContent v-if="lock"/>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { searchTypeBlog } from '../../api/index'
    import { ElMessage } from 'element-plus'
    import NotContent from '../../components/NotContent/index.vue'
    import { useStore } from 'vuex'

    export default defineComponent({
        components: {
            NotContent
        },
        setup (props, context) {
            const route = useRoute()
            const router = useRouter()
            const id: any = ref(route.query.id)
            const lock = ref(false)
            // 博客数据
            const blogList: any = ref([])

            watchEffect(() => {
                searchTypeBlog(id.value).then((resp: any) => {
                    if (resp.state === 'success') {
                        blogList.value = resp.data
                        if (resp.data.length <= 0) {
                            lock.value = true
                        }
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
        
            const store = useStore()
            const bgState: any = ref(store.state.global.bgState)
            watchEffect(() => {
                bgState.value = store.state.global.bgState
            })

            return {
                blogList,
                handleClick,
                lock,
                bgState
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