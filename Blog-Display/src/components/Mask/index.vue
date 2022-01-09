<template>
    <div
        class="mask-container"
        v-show="show"
        :style="{
                    background: bgState ? 'var(--bg-bright)' : 'var(--bg-dark)'
                }"
    >
        <el-icon
            class="icon"
            :size="30"
            @click="$emit('handleCloseMask')"
        >
            <Close
                :style="{
                    color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                }"
            />
        </el-icon>
        <div class="mask-router">
            <router-link
                v-for="(item, index) in routes" :key="index"
                :style="{
                    color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                }"
                @click="$emit('handleCloseMask')"
                :to="{
                    name: item.urlName
                }"
            >
                {{item.title}}
            </router-link>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, ref, watchEffect } from 'vue'
    import { Close } from '@element-plus/icons'
import { useStore } from 'vuex'

    export default defineComponent({
        components: {
            Close
        },
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        setup (props, context) {
            // 切换背景色
            const store = useStore()
            const bgState: any = ref(store.state.global.bgState)
            watchEffect(() => {
                bgState.value = store.state.global.bgState
            })

            // 路由
            const routes = [{
                title: '首页',
                urlName: 'Home'
            }, {
                title: '分类',
                urlName: 'Type'
            }, {
                title: '相册',
                urlName: 'Image'
            }, {
                title: '关于',
                urlName: 'About'
            }]
            return {
                bgState,
                routes
            }
        }
    })
</script>

<style scoped>
.mask-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.9;
    z-index: 99999;
}

.icon {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
}

.mask-router {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-size: 25px;
}

.mask-router a {
    margin: 0 10px;
    display: inline-block;
}

.mask-router a:hover {
    color: var(--menu-bright) !important;
    transition: color 0.5s linear;
}

</style>