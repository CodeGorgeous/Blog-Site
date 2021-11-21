<template>
    <div class="carousel-container">
        <el-image
            class="carousel-image"
            :src="bgImage"
        >
        </el-image>
        <div class="icon-container">
            <el-icon
                class="icon"
                :size="40"
                @click="handleClick"
            ><Mouse /></el-icon>
        </div>
        <div class="title">
            {{text}}
            <span class="underline">_</span>
        </div>
        <!-- 波浪图形 -->
        <div class="wave">
            <div class="w w1"></div>
            <div class="w w2"></div>
            <div class="w w3"></div>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, PropType, ref, watchEffect, onMounted, onUnmounted } from 'vue'
    import { Mouse } from '@element-plus/icons'  
    export default defineComponent({
        components: {
            Mouse
        },
        
        props: {
            main: {
                required: true
            }
        },
        setup (props, context) {

            const bgImage = ref()
            let image1: string = 'https://img2.baidu.com/it/u=3492081780,1765429063&fm=26&fmt=auto'
            let image2: string = 'http://qiniu.codegorgeous.top/login.webp'
            const text =ref('')

            setTimeout(async () => {
                const conent: string = 'Hello World!'
                for (let i = 0; i < conent.length; i++) {
                    const sliceText =  conent.slice(0, i+1)
                    text.value = sliceText
                    await delay(100)
                }
            }, 2000)

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

            const handleClick = (() => {
                const oDiv: any = props.main
                const time = 200
                const index = 10
                const distance = document.body.scrollHeight/index
                const timer = setInterval(() => {
                    oDiv.scrollTop += distance
                }, time/index)
                setTimeout(() => {
                    clearInterval(timer)
                }, time)
            })

            return {
                bgImage,
                text,
                handleClick
            }
        }
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

.icon-container {
    position: absolute;
    bottom: 20px;
    left: 50%;
    z-index: 100;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
    user-select:none;
}

@media (max-width: 576px) {
    .icon-container {
        bottom: 10px;
    }

    .icon {
        font-size: 30px;
    }

}

.icon {
    cursor: pointer;
    opacity: 0.7;
    transform: translate(-50%, 0);
    transition: all 0.5s ease-in-out;
}

.icon:hover {
    transform: translate(-50%, 20%);
    opacity: 1;
    color: #abcdef;
}

.title {
    position: absolute;
    font-size: 45px;
    color: #fff;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    border-radius: 47%;
    background: #fff;
}

.w1 {
    width: 600vw;
    height: 600vw;
    left: -250%;
    animation: rotate 30s linear infinite;
}

.w2 {
    left: -250%;
    opacity: 0.8;
    animation: rotate 30s ease-in 2s infinite;
}

.w3 {
    left: -200%;
    opacity: 0.7;
    animation: rotate 30s ease-out 4s infinite;
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