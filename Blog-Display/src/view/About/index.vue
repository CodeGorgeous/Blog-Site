<template>
    <div class="about-container">
        <div class="about-card-container">
            <el-card
                class="card"
                :style="{
                    background: bgState ? 'var(--card-message-bright)' : 'var(--card-message-dark)'
                }"
            >
                <div class="card-image">
                    <el-image
                        src="http://qiniu.codegorgeous.top/login.webp"
                        fit="cover"
                    ></el-image>
                </div>
                <div class="card-text">
                    <div class="text-me">
                        <h2>Me</h2>
                        <p class="text-name">CodeGorgeous</p>
                        <p>一枚前端新人, 软件专业, 目前主要从事前端开发工作. 业余爱好: 看小说、研究一些有趣的第三方库</p>
                    </div>
                    <div class="text-word">
                        <h2>Work</h2>
                        <p class="text-company">耀友网络科技有限公司(上海)</p>
                        <p>Web前端开发实习生[2021.07 - 2021.09]</p>
                    </div>
                    <div class="text-project">
                        <h2>Project</h2>
                        <a class="project-link" href="https://github.com/CodeGorgeous/Markdown-Html-Transform">Markdown-Html-Transform</a>
                        <p>一款简单快捷的markdown文件转换为html文件工具</p>
                    </div>
                    <div class="text-contact">
                        <h2>Contact</h2>
                        <p class='icon-container'>
                            <span class="icon-font">&#xe882;:</span>
                            <a
                                class="icon-link"
                                href="tencent://message/?Menu=yes&uin=2460481461"
                                target="_blank"
                            >2460481461</a>
                        </p>
                        <p class='icon-container'>
                            <span class="icon-font">&#xe883;:</span>
                            <a
                                class="icon-link"
                                href="#"
                            >CodeGorgeous</a>
                        </p>
                        <p class='icon-container'>
                            <span class="icon-font">&#xe885;:</span>
                            <a
                                class="icon-link"
                                href="https://github.com/CodeGorgeous"
                                target="_blank"
                            >CodeGorgeous</a>
                        </p>
                        <p class='icon-container'>
                            <span class="icon-font">&#xe77e;:</span>
                            <a
                                class="icon-link"
                                href="mailto:2460481461@qq.com"
                                target="_blank"
                            >2460481461@qq.com</a>
                        </p>
                    </div>
                </div>
            </el-card>
        </div>
        <Footer />
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
    import Footer from '../../components/Footer/index.vue'

    export default defineComponent({
        components: {
            Footer
        },
        setup (props, context) {

            const store = useStore()
            const bgState: any = ref(store.state.global.bgState)
            watchEffect(() => {
                bgState.value = store.state.global.bgState
            })
            return {
                bgState
            }
        }
    })
</script>

<style scoped>
.about-container {
    width: 100%;
    height: 100%;
    margin: 80px 0 0 0;
}

.about-card-container {
    width: 40%;
    margin: 0 auto;
}

.card {
    width: 100%;
    border: none !important;
}

.card-text {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
}

h2 {
    margin: 15px 0;
}

p {
    font-size: 14px;
    color: #999;
}

.text-name {
    font-size: 16px;
    font-weight: bold;
    margin: 5px 0;
    color: #000;
}

.text-company {
    font-size: 16px;
    color: #666;
    margin: 5px 0;
}

.project-link {
    color: #666;
    font-weight: 700;
    margin: 5px 0;
    display: inline-block;
}


.icon-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2948453 */
  src: url('//at.alicdn.com/t/font_2948453_27f0p3j2zpu.woff2?t=1637224506485') format('woff2'),
       url('//at.alicdn.com/t/font_2948453_27f0p3j2zpu.woff?t=1637224506485') format('woff'),
       url('//at.alicdn.com/t/font_2948453_27f0p3j2zpu.ttf?t=1637224506485') format('truetype');
}

.icon-font {
    font-family: 'iconfont';
    font-size: 20px;
    margin: 0 10px 0 0;
    cursor: default;
}

.icon-link {
    color: #333;
}

@media (max-width: 576px) {
    .about-card-container {
        width: 100%;
    }
}

</style>