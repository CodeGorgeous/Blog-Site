<template>
    <div className="header-container">
        <div>
            <el-popover
                placement="bottom"
                title="小程序开发中ing"
                trigger="hover"
            >
                <template #reference>
                    <el-icon
                        :class="['header-icon']"
                        :style="{
                            opacity: maskLock ? 0 : 1  
                        }"
                    >
                        <Cellphone />
                    </el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="bottom"
                title="二维码在线查看网页"
                trigger="hover"
            >
                <img ref="dom" :src="qrCodeBase64" />
                <template #reference>
                    <el-icon
                        :class="['header-icon']"
                        :style="{
                            opacity: maskLock ? 0 : 1
                        }"
                    >
                        <Share />
                    </el-icon>
                </template>
            </el-popover>
            <el-icon
                :class="['header-icon']"
                @click="handleChangeGlobal"
            >
                <Moon v-if="!bgState"/>
                <MoonNight v-if="bgState"/>
            </el-icon>
        </div>
        <div>
            <el-icon
                :class="['header-icon']"
                :style="{
                    opacity: maskLock ? 0 : 1
                }"
                @click="searchLock = true"
            >
                <Search />
            </el-icon>
            <el-icon
                :class="['header-icon']"
                :style="{
                    opacity: maskLock ? 0 : 1
                }"
                @click="maskLock = true"
            >
                <Grid />
            </el-icon>
        </div>
    </div>
    <Mask :show="maskLock" @handleCloseMask="maskLock = false"/>
    <SearchMask :show="searchLock" @handleCloseMask="searchLock = false"/>
    <Side :lock="sideLock" @handleSideClose="sideLock = false"/>
</template>

<script lang='ts'>
    import { defineComponent, ref, Ref, onMounted, watchEffect } from 'vue'
    import { Cellphone, Grid, Search, Share, MoonNight, Moon, UserFilled } from '@element-plus/icons'
    import Mask from '../Mask/index.vue'
    import QRCode from 'qrcode'
    import SearchMask from '../SearchMask/index.vue'
    import { useStore } from 'vuex'
    import { useRoute } from 'vue-router';
    import Side from '../Side/index.vue';

    export default defineComponent({
        components: {
            Cellphone,
            Grid,
            Search,
            Mask,
            Share,
            SearchMask,
            MoonNight,
            Moon,
            Side,
            UserFilled
        },
        setup (props, context) {
            // 侧边栏开关
            const sideLock = ref<boolean>(false);

            // icon样式
            const size = ref<number>(50)
            const color = ref<string>('#aaa')

            // 遮罩层组件
            const maskLock = ref<boolean>(false);

            // 二维码
            const dom = ref<Element | null>(null)
            // 二维码图片base64格式
            const qrCodeBase64 = ref<string>('')
            // 路由配置信息
            const route = useRoute();
            // 完整路由信息
            const url = ref<string>(window.location.href);
            // 当页面url变化时重新生成二维码
            watchEffect(() => {
                const u: string = route.path;
                QRCode.toDataURL(url.value).then(resp => {
                    qrCodeBase64.value = resp;
                }).catch(err => {})
                url.value = window.location.href;
            })

            // search
            const searchLock: Ref<boolean> = ref(false)

            // 背景色状态
            const store = useStore();
            const bgState = ref<boolean>(store.state.global.bgState)
            watchEffect(() => {
                bgState.value = store.state.global.bgState
            })
            // 根节点
            const app = ref<any>(null)
            // 控制全局的颜色改变
            const handleChangeGlobal = () => {
                store.commit('global/changeBg')
                if (app.value) {
                    if (store.state.global.bgState) {
                        app.value.style.background = 'var(--bg-bright)'
                    } else {
                        app.value.style.background = 'var(--bg-dark)'
                    }
                }
            }
            onMounted(() => {
                app.value = document.querySelector('#app')
            })
            // TODO: 判断当前时间是白天还是晚上

            return {
                size,
                color,
                maskLock,
                dom,
                qrCodeBase64,
                searchLock,
                handleChangeGlobal,
                bgState,
                url,
                sideLock
            }
        }
    })
</script>

<style scoped>
.header-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-icon {
    font-size: 30px;
    color: #ccc;
    cursor: pointer;
    margin: 0 5px;
    transition: opacity 0.6s ease-out;
}

.menu-container {
    justify-content: flex-end;
    background: none;
    border: none;
    padding: 0 10px 0 0;
}

.media-menu-container {
    font-size: 25px;
    color: #fff;
    justify-content: flex-end;
    padding: 10px 10px 0 0;
    cursor: pointer;
}

.media-link-item {
    color: #abcdef;
    text-decoration: none;
}

.el-dropdown-link {
    color: #ccc;
}

.url {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

</style>