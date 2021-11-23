import { createStore } from 'vuex';
import global from './global'

const store = createStore({
    // 严格模式, state状态只能由mutations改变
    strict:true,
    modules: {
        global
    }
});

export default store;

