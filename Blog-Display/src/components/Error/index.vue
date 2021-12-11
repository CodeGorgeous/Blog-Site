<template>
    <NotFound />
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import NotFound from '../../view/404/index.vue';

    export default defineComponent({
        components: {
            NotFound
        },
        setup (props, context) {
            
            return {
                
            }
        }
    })
</script>

<style scoped>

</style>