const routes: any[] = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        component: () => import('../view/Home/index.vue'),
        props: true
    }, {
        path: '/image',
        component: () => import('../view/Image/index.vue')
    }, {
        path: '/about',
        component: () => import('../view/About/index.vue')
    }, {
        path: '/message',
        component: () => import('../view/Message/index.vue')
    }, {
        path: '/type',
        component: () => import('../view/Type/index.vue')
    }, {
        path: '/*',
        component: () => import('../view/404/index.vue')
    }
];

export default routes;
