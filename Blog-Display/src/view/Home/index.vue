<template>
    <div class="home-container">
        <div class="home-diagram">
            <Diagram />
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
        </div>
        <div class="footer-container">
            <Footer />
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import Diagram from '../../components/Diagram/index.vue'
    import Footer from '../../components/Footer/index.vue'
    import { UserFilled, Checked } from '@element-plus/icons'

    export default defineComponent({
        components: {
            Diagram,
            Footer,
            UserFilled,
            Checked
        },
        setup (props, context) {
            
            const blogList: any = ref([
                {
                    id: 1,
                    occupyImg: 'https://img2.baidu.com/it/u=889478167,649977661&fm=26&fmt=auto',
                    name: '标题1',
                    author: 'cg',
                    createTimer: '2020-11-01',
                    tags: ['javascript', '学习', '探索'],
                    introduce: '这是一段描述!这是一段描述!这是一段描述!'
                }, {
                    id: 2,
                    occupyImg: 'https://img2.baidu.com/it/u=889478167,649977661&fm=26&fmt=auto',
                    name: '标题2',
                    author: 'cg',
                    createTimer: '2020-11-01',
                    tags: ['javascript', '学习'],
                    introduce: '这是一段描述!这是一段描述!这是一段描述!'
                }, {
                    id: 3,
                    occupyImg: 'https://img2.baidu.com/it/u=889478167,649977661&fm=26&fmt=auto',
                    name: '标题3',
                    author: 'cg',
                    createTimer: '2020-11-01',
                    tags: ['javascript',  '探索'],
                    introduce: '这是一段描述!这是一段描述!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!'
                }, {
                    id: 4,
                    occupyImg: 'https://img2.baidu.com/it/u=889478167,649977661&fm=26&fmt=auto',
                    name: '标题4',
                    author: 'cg',
                    createTimer: '2020-11-01',
                    tags: ['javascript', '学习', '探索'],
                    introduce: '这是一段描述!这是一段描述!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!!这是一段描述!'
                }, 
            ])

            const handleClick = (item: any) => {
                console.log(item)
            }

            return {
                blogList,
                handleClick
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
    transform: translateY(10px);
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
    height: 120px;
    display: inline-block;
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