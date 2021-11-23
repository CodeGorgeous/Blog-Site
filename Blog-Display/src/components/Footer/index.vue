<template>
    <div class="footer-container">
        <div class="main-container">
            <p
            class="icon"
            >
                <a
                    href="tencent://message/?Menu=yes&uin=2460481461"
                    target="_blank"
                    class="icon-font qq"
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >&#xe882;</a>
                <a
                    href="#"
                    class="icon-font wechat"
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >&#xe883;</a>
                <a
                    href="https://github.com/CodeGorgeous"
                    target="_blank"
                    class="icon-font github"
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >&#xe885;</a>
                <a
                    href="mailto:2460481461@qq.com"
                    target="_blank"
                    class="icon-font email"
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >&#xe77e;</a>
            </p>
            <p
                class="time"
                :style="{
                    color: bgState ? 'var(--font-bright)' : 'var(--font-dark)',
                    transition: `color 0.5s linear`
                }"
            >by CodeGorgeous | © 2021 - 2021</p>
            <p
                class="record"
                :style="{
                    color: bgState ? 'var(--font-bright)' : 'var(--font-dark)',
                    transition: `color 0.5s linear`
                }"
            >豫ICP备2021018590号</p>
            <p
                :style="{
                    color: bgState ? 'var(--font-bright)' : 'var(--font-dark)',
                    transition: `color 0.5s linear`
                }"
            ><el-icon><Bottom /></el-icon>欢迎关注A-SOUL<el-icon><Bottom /></el-icon></p>
            <p>
                <a
                    href="https://space.bilibili.com/672342685"
                    class="a-soul queen"
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >乃琳Queen</a>
                <a
                    href="https://space.bilibili.com/672328094"
                    class="a-soul dianna"
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >嘉然今天吃什么</a>
                <a
                    href="https://space.bilibili.com/351609538"
                    class="a-soul carol"
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >珈乐Carol</a>
                <a
                    href="https://space.bilibili.com/672353429"
                    class="a-soul kira"
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >贝拉kira</a>
                <a
                    href="https://space.bilibili.com/672346917"
                    class="a-soul awwaw"
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                >向晚大魔王</a>
            </p>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { Bottom } from '@element-plus/icons'
    import { useStore } from 'vuex'

    export default defineComponent({
        components: {
            Bottom
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
.footer-container {
    width: 100%;
    height: 170px;
    margin-top: 50px;
    text-align: center;
}

.main-container {
    width: 40%;
    height: 100%;
    border-top: 1px solid rgba(170, 170, 170, 0.4);
    display: inline-block;
    padding: 10px 0 0 0;
}

.icon {
    margin: 10px;
}

@font-face {
  font-family: 'iconfont';  /* Project id 2948453 */
  src: url('//at.alicdn.com/t/font_2948453_27f0p3j2zpu.woff2?t=1637224506485') format('woff2'),
       url('//at.alicdn.com/t/font_2948453_27f0p3j2zpu.woff?t=1637224506485') format('woff'),
       url('//at.alicdn.com/t/font_2948453_27f0p3j2zpu.ttf?t=1637224506485') format('truetype');
}

.icon-font {
    font-family: 'iconfont';
    font-size: 23px;
    margin: 0 10px;
    cursor: pointer;
    transition: color 0.5s ease-out;
    text-decoration: none;
    color: #666;
}

.qq:hover {
    color: #14BAF8 !important;
}

.wechat:hover {
    color: #2AAE67 !important;
}

.github:hover {
    color: #9266F9 !important;
}

.email:hover {
    color: #F4B754 !important;
}

.time {
    margin: 10px;
    color:#333
}

.record {
    margin: 10px;
    color: #333;
}

@media (max-width: 576px) {
    .main-container {
        width: 300px;
    }
}

.a-soul {
    text-decoration: none;
    margin: 0 5px;
    transition: color 0.5s linear;
}
.queen:hover {
    color: #A9BBE3 !important;
}

.dianna:hover {
    color: #F9C7D5 !important;
}

.carol:hover {
    color: #6453BD !important;
}

.kira:hover {
    color: #FDBEB8 !important;
}

.awwaw:hover {
    color: #28E5FF !important;
}

</style>