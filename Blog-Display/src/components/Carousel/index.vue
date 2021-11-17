<template>
    <div className="carousel-container">
        <el-image
            class="carousel-image"
            src="http://qiniu.codegorgeous.top/login.webp"
        >
        </el-image>
        <div className="icon-container">
            <el-icon class="icon" :size="30"><Food /></el-icon>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { Food } from '@element-plus/icons'  
    export default defineComponent({
        components: {
            Food
        },
        setup (props, context) {
            
            return {
                
            }
        }
    })
</script>

<style scoped>
.carousel-container {
    width: 100%;
    height: 100%;
    position: relative;
}

.carousel-image {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.icon-container {
    position: absolute;
    bottom: 20px;
    left: 50%;
    -moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
      user-select:none;
}

.icon {
    cursor: pointer;
}

</style>