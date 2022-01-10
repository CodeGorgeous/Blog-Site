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
                        :size="size"
                        :color="color"
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
                        :size="size"
                        :color="color"
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
            :size="size"
            :color="color"
            @click="handleChangeGlobal"
          >
            <Moon v-if="!bgState"/>
            <MoonNight v-if="bgState"/>
          </el-icon>
        </div>
        <div>
            <el-icon
                :class="['header-icon']"
                :size="size"
                :color="color"
                :style="{
                    opacity: maskLock ? 0 : 1
                }"
                @click="searchLock = true"
            >
                <Search />
            </el-icon>
            <el-icon
                :class="['header-icon']"
                :size="size"
                :color="color"
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
</template>

<script lang='ts'>
    import { defineComponent, ref, Ref, onMounted, watchEffect } from 'vue'
    import { Cellphone, Grid, Search, Share, MoonNight, Moon } from '@element-plus/icons'
    import Mask from '../Mask/index.vue'
    import QRCode from 'qrcode'
    import SearchMask from '../SearchMask/index.vue'
    import { useStore } from 'vuex'

    export default defineComponent({
        components: {
            Cellphone,
            Grid,
            Search,
            Mask,
            Share,
            SearchMask,
            MoonNight,
            Moon
        },
        setup (props, context) {

            // icon样式
            const size: Ref<number> = ref(30)
            const color: Ref<string> = ref('#aaa')

            // 遮罩层组件
            const maskLock: Ref<boolean> = ref(false);

            // 二维码
            const dom: Ref<Element | null> = ref(null)
            // 二维码图片base64格式
            const qrCodeBase64: Ref<string> = ref('')
            // 当页面url变化时重新生成二维码
            watchEffect(() => {
                QRCode.toDataURL(window.location.href).then(resp => {
                    qrCodeBase64.value = resp;
                }).catch(err => {
                    console.log(err);
                })
            })

            // search
            const searchLock: Ref<boolean> = ref(false)

            // 背景色状态
            const store = useStore();
            const bgState: any = ref(store.state.global.bgState)
            watchEffect(() => {
                bgState.value = store.state.global.bgState
            })
            // 根节点
            const app: any = ref(null)
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

            return {
                size,
                color,
                maskLock,
                dom,
                qrCodeBase64,
                searchLock,
                handleChangeGlobal,
                bgState
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

</style>