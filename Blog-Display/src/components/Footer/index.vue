<template>
    <div class="footer-container">
        <div class="main-container">
            <p class="icon">
                <span class="icon-font qq">&#xe882;</span>
                <span class="icon-font wechat">&#xe883;</span>
                <span class="icon-font github">&#xe885;</span>
                <span class="icon-font email">&#xe77e;</span>
            </p>
            <p class="time">by CodeGorgeous | © 2021 - 2021</p>
            <p class="record">豫ICP备2021018590号</p>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'

    export default defineComponent({
        components: {},
        setup (props, context) {
            
            return {
                
            }
        }
    })
</script>

<style scoped>
.footer-container {
    width: 100%;
    height: 150px;
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
}

.qq:hover {
    color: #14BAF8;
}

.wechat:hover {
    color: #2AAE67;
}

.github:hover {
    color: #9266F9;
}

.email:hover {
    color: #F4B754;
}

.time {
    margin: 10px;
    color:#333
}

.record {
    margin: 10px;
    color: #333;
}

@media (max-width: 375px) {
    .main-container {
        width: 300px;
    }
}

</style>