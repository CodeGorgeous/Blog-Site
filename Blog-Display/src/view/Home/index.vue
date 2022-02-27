<template>
    <div class="home-container">
        <div class="home-diagram">
            <Diagram :main="main"/>
        </div>
        <div class="home-content-container">
            <div class="main">
                <el-card
                    class="card-item"
                    shadow="hover"
                    v-for="item in blogList"
                    :key="item.id"
                    @click="handleClick(item)"
                    :style="{
                        background: bgState ? 'var(--card-bright)' : 'var(--card-dark)',
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >
                    
                </el-card>
            </div>
        </div>
        <el-pagination
            class="pagination-container"
            :page-size="limit"
            background
            layout="prev, pager, next"
            :total="total"
            @currentChange="handleChangePage"
        />
    </div>
</template>

<script lang='ts'>
    import { defineComponent, ref, watchEffect, PropType } from 'vue'
    import Diagram from '../../components/Diagram/index.vue'
    import { UserFilled, Checked } from '@element-plus/icons'
    import { useRouter } from 'vue-router'
    import { pageGetBlog } from '../../api/index'
    import { ElMessage } from 'element-plus'
    import { useStore } from 'vuex'

    export default defineComponent({
        components: {
            Diagram,
            UserFilled,
            Checked
        },
        props: {
            main: {
                type: Object as PropType<any>,
                required: true
            }
        },
        setup (props: any, context) {
            const router = useRouter()
            const blogList: any = ref([])
            const handleClick = (item: any) => {
                router.push({
                    name: 'BlogMessage',
                    query: {
                        id: item.id
                    }
                })
                
                props.main.scrollTop = 0
            }

            // 当前页
            const current = ref(1);
            // 页容量
            const limit = ref(6);
            // 总页数
            const total = ref(0);
            // 当前页变化
            const handleChangePage = (key: number) => {
                current.value = key
            }

            watchEffect(() => {
                pageGetBlog({
                    page: current.value,
                    limit: limit.value
                }).then((resp: any) => {
                    if (resp.state === 'success') {
                        console.log(resp);
                        blogList.value = resp.data.rows.map((item: any) => {
                            return {
                                ...item,
                                tags: item.tags.split('|')
                            }
                        })
                        total.value = resp.data.count
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '数据获取失败, 请刷新重新尝试!'
                        })
                    }
                })
            })

            const store = useStore()
            const bgState: any = ref(store.state.global.bgState)
            watchEffect(() => {
                bgState.value = store.state.global.bgState
            })


            return {
                blogList,
                handleClick,
                main: props.main,
                total,
                limit,
                handleChangePage,
                bgState
            }
        }
    })
</script>

<style scoped>
.home-container {
    width: 100%;
    height: 100%;
    display: inline-block;
}

.home-diagram {
    width: 100vw;
    height: 100vh;
}

.home-content-container {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination-container {
    margin: 20px 0 0 0;
    text-align: center;
}

.main {
    width: 80%;
    padding: 50px 0 0 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card-item {
    display: inline-block;
    width: 80%;
    height: 400px;
    margin: 7px 0;
    cursor: pointer;
}

.title {
    text-align: center;
    margin: 15px 0;
}

.title:hover {
    color: #fff;
}

/* 移动端响应式 */
@media (max-width: 576px) {
    .main {
        width: 95%;
    }

    .card-item {
        flex: 0 0 100%;
        margin: 15px 0;
    }
}

</style>