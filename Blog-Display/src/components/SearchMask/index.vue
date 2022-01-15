<template>
    <transition name="mask">
        <div
            class="mask-container"
            v-show="show"
            :style="{
                background: bgState ? 'var(--bg-bright)' : 'var(--bg-dark)'
            }"
        >
            <el-icon
                class="icon"
                :size="30"
                @click="$emit('handleCloseMask')"
            >
                <Close
                    :style="{
                        color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                    }"
                />
            </el-icon>
            <div class="mask-search">
                <el-autocomplete
                    v-model="inputVal"
                    :fetch-suggestions="querySearch"
                    popper-class="my-autocomplete"
                    placeholder="请输入关键词"
                    @select="handleSelectContent"
                    clearable
                >
                    <template #default="{ item }">
                        <span class="name">{{ item.name }}</span>
                    </template>
                </el-autocomplete>
            </div>
        </div>
    </transition>
</template>

<script lang='ts'>
    import { defineComponent, ref, watchEffect, Ref } from 'vue'
    import { Close } from '@element-plus/icons'
    import { useStore } from 'vuex'
    import { getAllBlogs } from '../../api/index'
    import { useRouter } from 'vue-router'

    export default defineComponent({
        components: {
            Close
        },
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        setup (props, context) {
            // 切换背景色
            const store = useStore()
            const bgState: any = ref(store.state.global.bgState)
            watchEffect(() => {
                bgState.value = store.state.global.bgState
            })

            // search
            const inputVal: Ref<string> = ref('');
            // data
            const dataList = ref<any[]>([])
            getAllBlogs().then(resp => {
                dataList.value = resp.data.list
            })
            const router = useRouter();
            const handleSelectContent = (val: any) => {
                router.push({
                    name: 'BlogMessage',
                    query: {
                        id: val.id
                    }
                });
                context.emit('handleCloseMask');
            }

            const querySearch = (queryString: string, cb: any) => {
                // 过滤数据
                const result: any[] = dataList.value.filter(item => {
                    if (item.name.indexOf(queryString) !== -1) {
                        return true;
                    }
                    return false
                });
               cb(result);
            }

            return {
                bgState,
                querySearch,
                handleSelectContent,
                inputVal
            }
        }
    })
</script>

<style scoped>
.mask-container {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: 99999;
}

.icon {
    position: absolute;
    right: 5px;
    top: 11px;
    cursor: pointer;
}

.mask-search {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
}

/* 组件过渡动画 */
.mask-enter-active, .mask-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.mask-enter-from, .mask-leave-to {
    opacity: 0;
}

.mask-enter-to, .mask-leave-from {
    opacity: 1;
}
</style>