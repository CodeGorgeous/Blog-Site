export default {
    namespaced: true,
    state: {
        // 控制背景色, false为黑夜, true为白天
        bgState: true
    },
    mutations: {
        // 改变状态
        changeBg(state: any) {
            state.bgState = !state.bgState
        }
    }
}