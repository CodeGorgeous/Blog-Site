const routes: any[] = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        component: () => import('../view/Home/index.vue'),
        props: true
    }, {
        path: '/blogMessage',
        name: 'BlogMessage',
        component: () => import('../view/BlogMessage/index.vue')
    }, {
        path: '/image',
        component: () => import('../view/Image/index.vue')
    }, {
        path: '/imageMessage',
        name: 'ImageMessage',
        component: () => import('../view/ImageMessage/index.vue')
    }, {
        path: '/about',
        component: () => import('../view/About/index.vue')
    }, {
        path: '/type',
        component: () => import('../view/Type/index.vue')
    }, {
        path: '/typeMessage',
        name: 'TypeMessage',
        component: () => import('../view/TypeMessage/index.vue'),
        props: true
    }, {
        path: '/404',
        component: () => import('../view/404/index.vue')
    }, {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
];

export default routes;
