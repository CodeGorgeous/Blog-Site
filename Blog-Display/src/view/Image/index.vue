<template>
    <div class="image-container">
        <div class="image-items">
            <el-card
                v-for="item in typeList"
                :key="item.id"
                class="image-item"
                shadow="always"
                @click="handleClick(item.id)"
            >
                <el-image
                    class="image"
                    :src="item.coverImage"
                    fit="cover"
                ></el-image>
                <div class="image-text">
                    {{ item.type }}
                </div>
            </el-card>
        </div>
        <Footer />
    </div>
</template>

<script lang='ts'>
    import { defineComponent, reactive, toRefs, ref, watchEffect } from 'vue'
    import { getImageType } from '../../api/index'
    import { ElMessage } from 'element-plus'
    import Footer from '../../components/Footer/index.vue'
    import { useRouter } from 'vue-router'

    export default defineComponent({
        components: {
            Footer
        },
        setup (props, context) {
            const router = useRouter()
            const typeList: any = ref([])

            getImageType().then((resp: any) => {
                if (resp.state !== 'success') { 
                    return ElMessage({
                            type: 'error',
                            message: '数据获取失败, 请刷新重新尝试!'
                        })
                }
                typeList.value = resp.data
            })

            const handleClick = (id: number) => {
                router.push({
                    name: 'ImageMessage',
                    query: {
                        id
                    }
                })
            }

            return {
                typeList,
                handleClick
            }
        }
    })
</script>

<style scoped>
.image-container {
    width: 100%;
    height: 100%;
    margin: 80px 0 0 0;
}

.image-items {
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.image-item {
    width: 250px;
    height: 250px;
    position: relative;
    cursor: pointer;
    margin: 10px 10px;
}

.image-item:hover {
    transform: translateY(10px) rotate(2deg);
}

.image {
    width: 250px;
    height: 250px;
}

.image-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
    color: #FA776F;
    font-weight: bold;
}

@media (max-width: 576px) {
    .image-items {
        width: 100%;
        justify-content: center;
    }    
}

</style>