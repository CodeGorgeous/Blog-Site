<template>
    <div className="header-container">
        <el-menu
            default-active="/home"
            class="menu-container"
            mode="horizontal"
            :router="true"
            :style="{
                display: docWidth > 576 ? 'flex' : 'none'
            }"
        >
            
            <el-menu-item
                index="/home"
            >
                <el-icon><HomeFilled /></el-icon>首页
            </el-menu-item>
            <el-menu-item
                index="/type"
            >
                <el-icon><Notebook /></el-icon>分类
            </el-menu-item>
            <el-menu-item
                index="/image"
            >
                <el-icon><Money /></el-icon>相册
            </el-menu-item>
            <el-menu-item
                index="/about"
            >
                <el-icon><Comment /></el-icon>关于
            </el-menu-item>
        </el-menu>
        <el-dropdown
            class="media-menu-container"
            :style="{
                display: docWidth > 576 ? 'none' : 'flex'
            }"
        >
            <span class="el-dropdown-link">
                <el-icon size="30"><Menu /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>
                        <router-link
                            class="media-link-item"
                            to="/home"
                        >
                            首页
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link
                            class="media-link-item"
                            to="/type"
                        >
                            分类
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link
                            class="media-link-item"
                            to="/image"
                        >
                            相册
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <router-link
                            class="media-link-item"
                            to="/about"
                        >
                            关于
                        </router-link>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect, onMounted, onUnmounted, PropType } from 'vue'
    import * as icons from '@element-plus/icons'
    export default defineComponent({
        components: {
            ...icons
        },
        setup (props, context) {

            const docWidth = ref(document.body.clientWidth)
            const handleSizeChange = (): void => {
                docWidth.value = document.body.clientWidth
            }

            onMounted((): void => {
                window.addEventListener('resize', handleSizeChange)
            })

            onUnmounted((): void => {
                window.removeEventListener('resize', handleSizeChange)
            })

            return {
                docWidth
            }
        }
    })
</script>

<style scoped>
.header-container {
    width: 100%;
    height: 100%;
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