<template>
    <div class="image-list-container">
        <div class="image-items">
            <el-image
                class="image-item image"
                v-for="(item) in dataList"
                :key="item.id"
                :src="item.imgUrl"
                :all="item.name"
                :preview-src-list="[item.imgUrl]"
                lazy
            ></el-image>
        </div>
        <NotContent v-if="lock"/>
        <Footer />
    </div>
</template>

<script lang='ts'>
    import { ElMessage } from 'element-plus'
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { useRoute } from 'vue-router'
    import { searchTypeImage } from '../../api/index'
    import Footer from '../../components/Footer/index.vue'
    import NotContent from '../../components/NotContent/index.vue'

    export default defineComponent({
        components: {
            Footer,
            NotContent
        },
        setup (props, context) {
            const route: any = useRoute()
            const lock = ref(false)

            const dataList: any = ref([])

            searchTypeImage(route.query.id).then((resp: any) => {
                if (resp.state !== 'success') { 
                    return ElMessage({
                            type: 'error',
                            message: '数据获取失败, 请刷新重新尝试!'
                        })
                }
                dataList.value = resp.data
                if (resp.data.length <= 0) {
                    lock.value = true
                }
            })

            return {
                dataList,
                lock
            }
        }
    })
</script>

<style scoped>
.image-list-container {
    width: 100%;
    height: 100%;
    margin: 80px 0 0 0;
    text-align: center;
}

.image-items {
    width: 50%;
    margin: 0 auto;
    column-count: 5;
}

.image-item {
    max-width: 200px;
    margin: 10px;
    display: inline-block;
}

.image {
    display: block;
	width: 100%;
	height: auto;
}

@media (max-width: 960px) {
    .image-items {
        width: 80%;
        column-count: 4;
    }
}

@media (max-width: 576px) {
    .image-items {
        width: 80%;
        column-count: 2;
    }
}


</style>