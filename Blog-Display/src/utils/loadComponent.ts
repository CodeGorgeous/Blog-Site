import { defineAsyncComponent } from 'vue';
import Loading from '../components/Loading/index.vue';
import Error from '../components/Error/index.vue';

// 加载组件
export default function asyncLoadComponent(Component: any) {
    return defineAsyncComponent({
        loader: () => {
            return new Promise((resolve, reject) => {
                    resolve(Component);
            })
        },
        loadingComponent: Loading,
        errorComponent: Error
    })
}