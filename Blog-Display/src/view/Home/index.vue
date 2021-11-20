<template>
    <div class="home-container">
        <div class="home-diagram">
            <Diagram :main="main"/>
        </div>
        <div class="home-content-container">
            <div class="main">
                <el-card
                    class="card-item"
                    shadow="always"
                    v-for="item in blogList"
                    :key="item.id"
                    @click="handleClick(item)"
                >
                    
                    <div class="card-image">
                        <el-image
                            style="width: 100%; height: 100%"
                            :src="item.occupyImg"
                            fit="cover"
                        ></el-image>
                    </div>
                    <div class="card-text">
                        <div class="card-content">
                            <p class="card-title">{{item.name}}</p>
                            <p class="card-tags">
                                <el-tag
                                    v-for="(item, index) in item.tags"
                                    :key="index"
                                    class="card-tag"
                                    size="mini"
                                    
                                >
                                    {{ item }}
                                </el-tag>
                            </p>
                            <p class="card-introduce">{{item.introduce}}</p>
                        </div>
                        <div class="card-icon">
                            <span class="card-time">
                                <el-icon>
                                    <Checked />
                                </el-icon>
                                {{item.createTimer}}
                            </span>
                            <span class="card-author">
                                <el-icon><UserFilled /></el-icon>
                                {{item.author}}
                            </span>
                        </div>
                    </div>
                </el-card>
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
        <div class="footer-container">
            <Footer />
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect, PropType } from 'vue'
    import Diagram from '../../components/Diagram/index.vue'
    import Footer from '../../components/Footer/index.vue'
    import { UserFilled, Checked } from '@element-plus/icons'
    import { useRouter } from 'vue-router'
    import { pageGetBlog } from '../../api/index'
    import { ElMessage } from 'element-plus'

    export default defineComponent({
        components: {
            Diagram,
            Footer,
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
            const current = ref(1)
            // 页容量
            const limit = ref(6)
            // 总页数
            const total = ref(0)
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

            return {
                blogList,
                handleClick,
                main: props.main,
                total,
                limit,
                handleChangePage
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
}

.pagination-container {
    text-align: center;
}

.main {
    width: 60%;
    margin: 0 auto;
    padding: 50px 10px 0 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.card-item {
    display: inline-block;
    width: 360px;
    height: 400px;
    margin: 20px 0;
    cursor: pointer;
}

.card-item:hover {
    transform: translateY(15px) rotate(1deg);
}

.card-image {
    width: 100%;
    height: 240px;
    display: inline-block;
    overflow: hidden;
}

.card-text {
    width: 100%;
    height: 152px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
}

.card-content {
    width: 100%;
    height: 120px;
    display: block;
}

.card-title {
    font-size: 25px;
    font-weight: 500;
    margin: 5px 0;
}

.card-tags {
    display:-webkit-box;/**对象作为伸缩盒子模型展示**/
    -webkit-box-orient:vertical;/**设置或检索伸缩盒子对象的子元素的排列方式**/
    -webkit-line-clamp: 1;/**显示的行数**/
    overflow:hidden;
    margin: 5px 0;
}

.card-tag {
    margin: 0 5px 0 0;
    border: none;
}

.card-introduce {
    display:-webkit-box;/**对象作为伸缩盒子模型展示**/
    -webkit-box-orient:vertical;/**设置或检索伸缩盒子对象的子元素的排列方式**/
    -webkit-line-clamp:2;/**显示的行数**/
    overflow:hidden;
    margin: 5px 0;
    font-size: 14px;
}

.card-icon {
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #888;
}

.card-time {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 10px 0 0;
}

.card-author {
    height: 100%;
    display: flex;
    align-items: center;
}

/* 移动端响应式 */
@media (max-width: 576px) {
    .main {
        width: 95%;
        justify-content: center;
    }
}

</style>