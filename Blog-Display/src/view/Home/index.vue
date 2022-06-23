<template>
    <div class="home-container">
        <div class="home-diagram">
            <Diagram :main="main"/>
        </div>
        <div class="home-content-container">
            <div class="main">
                <Card
                    v-for="item in blogList"
                    :key="item.id"
                    :render="item"
                    :main="main"
                />
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

<script lang='ts' setup>
    import { ref, watchEffect } from 'vue';
    import DiagramVue from '../../components/Diagram/index.vue';
    import { pageGetBlog } from '../../api/index';
    import { ElMessage } from 'element-plus';
    import { useStore } from 'vuex';
    import CardVue from './components/Card.vue';
    import asyncLoadComponent from '../../utils/loadComponent';

    const Card = asyncLoadComponent(CardVue);
    const Diagram = asyncLoadComponent(DiagramVue);
    defineProps({
        main: {
            type: Object,
            required: true
        }
    })
    const blogList: any = ref([])

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

.card-item-body {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 8rem;
    background: #ccc;
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 0 3rem 0.5rem rgba(0, 0, 0, 0.2);
    text-align: center;
}

/* 移动端响应式 */
@media (max-width: 576px) {
    .main {
        width: 90%;
    }

    .card-item {
        flex: 0 0 100%;
        margin: 15px 0;
    }
}
</style>

