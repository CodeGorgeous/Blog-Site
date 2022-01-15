<template>
    <div class="loading-container" v-if="lock">
        <img class="loading-img" src="http://qiniu.codegorgeous.top/cLoading.gif" alt="">
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'

    export default defineComponent({
        components: {},
        props: {
            lock: {
                type: Boolean
            }
        },
        setup (props, context) {
            
            return {
                
            }
        }
    })
</script>

<style scoped>
.loading-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 1000;
    background: #fff;
    left: 0;
    top: 0;
}

.loading-img {
    width: 30vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

</style>