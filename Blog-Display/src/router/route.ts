const routes: any[] = [
    {
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        component: () => import('../view/Home/index.vue')
    }, {
        path: '/blog',
        component: () => import('../view/Blog/index.vue')
    }, {
        path: '/image',
        component: () => import('../view/Image/index.vue')
    }, {
        path: '/about',
        component: () => import('../view/About/index.vue')
    }, {
        path: '/*',
        component: () => import('../view/404/index.vue')
    }
];

export default routes;
