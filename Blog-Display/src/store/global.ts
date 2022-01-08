export default {
    namespaced: true,
    state: {
        // 控制背景色, false为黑夜, true为白天
        bgState: true,
        // 数据加载loading组件控制 true为开启加载动画 false为关闭加载动画
        loadingState: false
    },
    mutations: {
        // 改变状态
        changeBg(state: any) {
            state.bgState = !state.bgState
        },
        changeLoading(state: any, payload: any) {
            state.loadingState = payload
        }
    }
}