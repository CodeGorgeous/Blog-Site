<template>
    <div
        class="not-content-container"
    >
        暂时没有内容哦, 请过段时间再来看看吧...
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
.not-content-container {
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #999;
}
</style>