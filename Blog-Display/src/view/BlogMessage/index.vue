<template>
    <div class="message-container">
        <el-card
            class="card-container"
            shadow="always"
            :style="{
                background: bgState ? 'var(--card-message-bright)' : 'var(--card-message-dark)'
            }"
        >
            <div
                class="card-image"
            >
                <el-image
                    style="width: 100%; height: 100%;"
                    :src="blog.occupyImg"
                    fit="cover"
                />
                <div class="card-content">
                    <p class="title">{{blog.name}}</p>
                    <p>
                        <span class="card-time">
                            <el-icon>
                                <Checked />
                            </el-icon>
                            {{ blog.createTimer }}
                        </span>
                        <span class="card-author">
                            <el-icon><UserFilled /></el-icon>
                            {{ blog.author }}
                        </span>
                    </p>
                </div>
            </div>
            <div
                class="card-text"
                v-html="blog.htmlText"
            >
            </div>
        </el-card>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { useRoute } from 'vue-router'
    import { Checked, UserFilled } from '@element-plus/icons'
    import { searchIdBlog } from '../../api/index'
    import { ElMessage } from 'element-plus'
    import { useStore } from 'vuex'

    export default defineComponent({
        components: {
            Checked,
            UserFilled
        },
        setup (props, context) {
            const store = useStore()
            const route: any = useRoute()
            const id: any = ref(+route.query.id)
            const blog: any = ref({})
            
            watchEffect(() => {
                id.value = +route.query.id
            })

            watchEffect(() => {
                searchIdBlog(id.value).then((resp: any) => {
                    if (resp.state === 'success') {
                        blog.value = resp.data
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '获取数据失败, 请刷新页面重新尝试!'
                        })
                    }
                })
            })

            const bgState: any = ref(store.state.global.bgState)
            watchEffect(() => {
                bgState.value = store.state.global.bgState
            })

            return {
                blog,
                bgState
            }
        }
    })
</script>

<style scoped>

.message-container {
    width: 100%;
    height: 100%;
    margin: 80px 0 0 0;
}

.card-container {
    width: 50%;
    margin: 0 auto;
    min-width: 500px;
    border: none !important;
}

.card-image {
    width: 100%;
    height: 400px;
    display: inline-block;
    position: relative;
}

.card-content {
    position: absolute;
    bottom: 10px;
    color: #000;
    margin: 0 20px;
    text-shadow: 2px 2px 3px #666;
}

.title {
    font-size: 30px;
}

.card-text {
    padding: 0 10px;
}

@media (max-width: 576px) {
    .card-container {
        width: 100%;
        min-width: 100%;
    }
}


</style>