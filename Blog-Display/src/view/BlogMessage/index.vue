<template>
    <div class="message-container">
        <el-card
            class="card-container"
            shadow="always"
        >
            <div
                class="card-image"
            >
                <el-image
                    style="width: 100%; height: 100%;"
                    src="https://img2.baidu.com/it/u=889478167,649977661&fm=26&fmt=auto"
                    fit="cover"
                />
                <div class="card-content">
                    <p class="title">标题</p>
                    <p>
                        <span class="card-time">
                            <el-icon>
                                <Checked />
                            </el-icon>
                            2021-10-11
                        </span>
                        <span class="card-author">
                            <el-icon><UserFilled /></el-icon>
                            CodeGorgeous
                        </span>
                    </p>
                </div>
            </div>
            <div
                class="card-text"
            >
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
                <p>内容区域</p>
            </div>
        </el-card>
        <Footer />
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { useRoute } from 'vue-router'
    import { Checked, UserFilled } from '@element-plus/icons'
    import Footer from '../../components/Footer/index.vue'

    export default defineComponent({
        components: {
            Checked,
            UserFilled,
            Footer
        },
        setup (props, context) {
            const route: any = useRoute()
            const id: any = ref(+route.query.id)

            watchEffect(() => {
                console.log('开始请求数据!', typeof id.value)
            })

            return {
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
    width: 40%;
    margin: 0 auto;
    min-width: 500px;
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
    color: #fff;
    margin: 0 20px;
}

.title {
    font-size: 30px;
}

.card-text {

}

@media (max-width: 576px) {
    .card-container {
        width: 100%;
        min-width: 100%;
    }
}


</style>