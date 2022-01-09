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
                            display: maskLock ? 'none': 'inline-block'
                        }"
                    >
                        <Cellphone />
                    </el-icon>
                </template>
            </el-popover>
        </div>
        <div>
            <el-popover
                placement="bottom"
                title="搜索功能开发中ing"
                trigger="hover"
            >
                <template #reference>
                    <el-icon
                        :class="['header-icon']"
                        :size="size"
                        :color="color"
                        :style="{
                            display: maskLock ? 'none': 'inline-block'
                        }"
                    >
                        <Search />
                    </el-icon>
                </template>
            </el-popover>
            <el-icon
                :class="['header-icon']"
                :size="size"
                :color="color"
                :style="{
                    display: maskLock ? 'none': 'inline-block'
                }"
                @click="handleOpenMask"
            >
                <Grid />
            </el-icon>
        </div>
    </div>
    <Mask :show="maskLock" @handleCloseMask="handleCloseMask"/>
</template>

<script lang='ts'>
    import { defineComponent, ref, watchEffect, Ref } from 'vue'
    import { Cellphone, Grid, Search } from '@element-plus/icons'
    import Mask from '../Mask/index.vue'

    export default defineComponent({
        components: {
            Cellphone,
            Grid,
            Search,
            Mask
        },
        setup (props, context) {

            // icon样式
            const size: Ref<number> = ref(30)
            const color: Ref<string> = ref('#aaa')

            // 遮罩层组件
            const maskLock: Ref<boolean> = ref(false);
            const handleOpenMask = () => {
                maskLock.value = true;
            }
            const handleCloseMask = () => {
                maskLock.value = false;
            }

            return {
                size,
                color,
                maskLock,
                handleOpenMask,
                handleCloseMask
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