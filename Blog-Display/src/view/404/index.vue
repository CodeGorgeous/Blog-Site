<template>
    <div class="not-cound-container">
        <div class="image-container">
            <el-image
                src="http://qiniu.codegorgeous.top/404.webp"
                fit="cover"
            ></el-image>
        </div>
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    
    export default defineComponent({
        components: {
        },
        setup (props, context) {
            
            return {
                
            }
        }
    })
</script>

<style scoped>
.not-cound-container {
    width: 100%;
    height: 100%;
    margin: 70px 0 0 0;
}

.image-container {
    width: 50%;
    margin: 0 auto;
}

@media (max-width: 576px) {
    .image-container {
        width: 90%;
        margin: 0 auto;
    }
}

</style>