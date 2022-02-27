<template>
    <div>
        <el-drawer
            v-model="props.lock"
            direction="ltr"
            :size="320"
            :show-close="false"
            @close="$emit('handleSideClose')"
        >
            <template #title>
                Hello World!
            </template>
        </el-drawer>
    </div>
</template>

<script lang='ts' setup>
    import { defineComponent, reactive, toRefs, ref, watchEffect, defineProps } from 'vue'

    const props = defineProps({
        lock: {
            type: Boolean,
            default: false
        }
    });
</script>

<style scoped>

</style>