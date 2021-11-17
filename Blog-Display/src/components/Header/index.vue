<template>
    <div className="header-container">
        <el-affix
            :offset='0'
        >
            <el-menu
                class="menu-container"
                mode="horizontal"
                :router="true"
            >
                
                <el-menu-item
                    index="/home"
                >
                    <el-icon><home-filled /></el-icon>首页
                </el-menu-item>
                <el-menu-item
                    index="/blog"
                >
                    <el-icon><notebook /></el-icon>博客
                </el-menu-item>
                <el-menu-item
                    index="/file"
                >
                    <el-icon><files /></el-icon>文档
                </el-menu-item>
                <el-menu-item
                    index="/image"
                >
                    <el-icon><money /></el-icon>相册
                </el-menu-item>
                <el-menu-item
                    index="/github"
                >
                    <el-icon><top-right /></el-icon>GitHub
                </el-menu-item>
                <el-menu-item
                    index="/about"
                >
                    <el-icon><comment /></el-icon>关于
                </el-menu-item>
            </el-menu>
        </el-affix>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import * as icons from '@element-plus/icons'
    export default defineComponent({
        components: {
            ...icons
        },
        setup (props, context) {
            
            return {
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
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    background: none;
    border: none;
}

</style>