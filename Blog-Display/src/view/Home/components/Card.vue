<template>
    <el-card
        class="card-item"
        shadow="hover"
        @click="handleClick(render)"
    >
        <!-- <transition
            :enter-active-class="`animate__animated animate__fadeIn`"
            :leave-active-class="`animate__animated animate__fadeOut`"
        >
            <div
                v-show="toggle"
                class="card-item-body-bg"
            >
                <el-icon class="card-item-body-icon">
                    <Promotion />
                </el-icon>
            </div>
        </transition>
        <transition
            :enter-active-class="`animate__animated animate__fadeInUp`"
            :leave-active-class="`animate__animated animate__fadeOutDown`"
        >
            <div
                v-show="toggle"
                class="card-item-body"
                :style="{
                    background: bgState ? 'var(--card-bright)' : 'var(--card-dark)',
                    color: bgState ? 'var(--font-bright)' : 'var(--font-dark)'
                }"
            >
                <div>{{ render.name }}</div>
                <div>
                    <span
                        v-for="(tag, index) in render.tags"
                        :key="index"
                    >
                        |{{ tag }}|
                    </span>
                </div>
                <div>
                    <div>{{ render.author }}</div>
                    <div>{{ render.updatedAt }}</div>
                    <div>{{ render.createTimer }}</div>
                </div>
            </div>
        </transition> -->
        <el-image
            class="card-item-img"
            :src="render.occupyImg"
            fit="cover"
        ></el-image>
        <div class="card-bottom">
            <div class="card-title">{{ render.name }}</div>
            <div class="card-author"><el-icon><UserFilled /></el-icon>{{ render.author }}</div>
            <div class="card-message">
                <div><el-icon><Calendar /></el-icon>{{ render.createTimer }}</div>
                <div><el-icon><Edit /></el-icon>{{ timeToDay(render.updatedAt) }}</div>
                <div><el-icon><StarFilled /></el-icon>999</div>
                <div><el-icon><View /></el-icon>999</div>
            </div>
        </div>
    </el-card>
</template>

<script lang='ts' setup>
    import { ref, watchEffect, PropType } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { UserFilled, View, Edit, Calendar, StarFilled } from '@element-plus/icons';
    import { timeToDay } from '../../../utils/tools';

    defineProps({
        render: {
            type: Object as PropType<any>,
            required: true
        },
        main: {
            type: Object as PropType<any>,
            required: true
        }
    })
    
    // **************功能分割线***************
    const store = useStore()
    const bgState: any = ref(store.state.global.bgState)
    watchEffect(() => {
        bgState.value = store.state.global.bgState
    })
    
    // **************功能分割线***************
    const router = useRouter();
    const handleClick = (item: any) => {
        router.push({
            name: 'BlogMessage',
            query: {
                id: item.id
            }
        })
    }
</script>

<style scoped>
.card-item {
    display: inline-block;
    width: 50rem;
    height: 31rem;
    cursor: pointer;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 1rem;
    margin: 15px 0;
}

.card-item-body-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    padding-bottom: 8rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
}

.card-item-body-icon {
    font-size: 5rem;
    color: #fff;
    transition: all 0.3s;
}

.card-item-body-icon:hover {
    transform: scale(1.2);
    color: #abcdef;
}

.card-item-body {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 8rem;
    background: #ccc;
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 0 3rem 1rem rgba(0, 0, 0, 0.2);
    text-align: center;
    animation-direction: 1s;
}

.card-item-img {
    display: block;
    width: 100%;
    height: 24rem;
    box-shadow: 0 0 1rem 0.5rem #ccc;
}

.card-bottom {
    height: calc(100% - 24rem);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-title {
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
    padding: 0.3rem 0;
}

.card-author {
    font-size: 1rem;
    text-align: center;
}

.card-message {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.5rem;
}

.card-message div {
    margin: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 移动端响应式 */
@media (max-width: 576px) {
    .card-item {
        flex: 0 0 100%;
        margin: 15px 0;
        height: 21rem;
    }
    .card-item-img {
        height: 15rem;
    }
    .card-bottom {
        height: calc(100% - 15rem);
    }
}
</style>

<style>
.home-container .el-card {
    border: none;
}

.home-container .el-card .el-card__body {
    width: 100%;
    height: 100%;
    position: relative;
}

.y-move-enter-active {
    bottom: 0;
    transition: all 1s ease-in-out;
}
.y-move-enter-active {
    bottom: -100%;
    transition: all 1s ease-in-out;
}
</style>