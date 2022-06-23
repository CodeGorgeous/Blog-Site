<template>
    <div class="carousel-container">
        <el-image
            class="carousel-image"
            :src="bgImage"
        >
        </el-image>
        <div class="title">
            <span>{{text}}</span>
            <span class="underline">_</span>
        </div>
        <!-- 波浪图形 -->
        <div class="wave">
            <div
                class="w w1"
                :style="{
                    background: bgState ? 'var(--wave-bright)' : 'var(--wave-dark)'
                }"
            ></div>
            <div
                class="w w2"
                :style="{
                    background: bgState ? 'var(--wave-bright)' : 'var(--wave-dark)'
                }"
            ></div>
            <div
                class="w w3"
                :style="{
                    background: bgState ? 'var(--wave-bright)' : 'var(--wave-dark)'
                }"
            ></div>
            <div
                class="w w4"
                :style="{
                    background: bgState ? 'var(--wave-bright)' : 'var(--wave-dark)'
                }"
            ></div>
        </div>
    </div>
</template>

<script lang='ts' setup>
    import { ref, watchEffect, onMounted, onUnmounted } from 'vue' 
    import { getTitle } from '../../api/index'
    import { useStore } from 'vuex'

    const store = useStore()

    const bgImage = ref()
    let image1: string = 'https://img2.baidu.com/it/u=3492081780,1765429063&fm=26&fmt=auto'
    let image2: string = 'http://qiniu.codegorgeous.top/login.webp'
    const text =ref('');
    getTitle().then(async(resp: any) => {
        const conent: string = resp.data.title
        for (let i = 0; i < conent.length; i++) {
            const sliceText =  conent.slice(0, i+1);
            text.value = sliceText;
            await delay(100);
        }
    })
    const delay = (timer: number) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, timer)
        })
    }
    
    const docWidth = ref(document.body.clientWidth)

    const handleSizeChange = () => {
        docWidth.value = document.body.clientWidth
            if (docWidth.value < 576) {
                bgImage.value = image1
            } else {
                bgImage.value = image2
            }
    }
    handleSizeChange()
    onMounted(() => {
        window.addEventListener('resize', handleSizeChange)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', handleSizeChange)
    })

    // 管理颜色
    const bgState = ref(store.state.global.bgState)

    watchEffect(() => {
        bgState.value = store.state.global.bgState
    })
</script>

<style scoped>
.carousel-container {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
}

.carousel-image {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    box-shadow: 0 5px 10px 0 #777, 0 10px 15px 0 #999;
}

.title {
    width: 100vw;
    font-size: 2.5rem;
    color: #fff;
    position: absolute;
    top: 40%;
    text-align: center;
    box-sizing: border-box;
    padding: 0 1rem;
}

.underline {
    animation: twinkle 0.8s infinite;
}

@keyframes twinkle {
    0%{
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

/* 波浪 */
.wave {
    width: 100%;
    height: 120px;
    position: absolute;
    bottom: -70px;
    left: 0;
}

.w {
    width: 500vw;
    height: 500vw;
    display: inline-block;
    position: absolute;
    left: -200%;
    border-radius: 48%;
    transition: background 1s;
}

.w1 {
    animation: rotate 30s linear infinite;
}

.w2 {
    opacity: 0.8;
    border-radius: 47%;
    animation: rotate 30s ease-out 2s infinite;
}

.w3 {
    opacity: 0.7;
    border-radius: 46%;
    animation: rotate 30s ease-out 4s infinite;
}

.w4 {
    opacity: 0.6;
    border-radius: 45%;
    animation: rotate 30s ease-out 6s infinite;
}

@keyframes rotate {
    0%{
        transform:rotate(0deg)
    }
    100% {
        transform:rotate(360deg)
    }
}




</style>