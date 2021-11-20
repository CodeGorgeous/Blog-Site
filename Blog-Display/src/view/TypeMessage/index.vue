<template>
    <div>
        分类详情
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { useRoute } from 'vue-router'
    import { searchTypeBlog } from '../../api/index'

    export default defineComponent({
        components: {},
        setup (props, context) {
            const route = useRoute()
            const id: any = ref(route.query.id)

            watchEffect(() => {
                searchTypeBlog(id.value).then((resp) => {
                    console.log(resp)
                })
            })

            return {
                
            }
        }
    })
</script>

<style scoped>

</style>