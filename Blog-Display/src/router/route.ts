import asyncLoadComponent from '../utils/loadComponent';

const routes: any[] = [
    {
        path: '/index.html',
        redirect: '/home'
    }, {
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'Home',
        component: () => import('../view/Home/index.vue'),
        props: true
    }, {
        path: '/blogMessage',
        name: 'BlogMessage',
        component: asyncLoadComponent(import('../view/BlogMessage/index.vue'))
    }, {
        path: '/image',
        name: 'Image',
        component: asyncLoadComponent(import('../view/Image/index.vue'))
    }, {
        path: '/imageMessage',
        name: 'ImageMessage',
        component: asyncLoadComponent(import('../view/ImageMessage/index.vue'))
    }, {
        path: '/about',
        name: 'About',
        component: asyncLoadComponent(import('../view/About/index.vue')) 
    }, {
        path: '/type',
        name: 'Type',
        component: asyncLoadComponent(import('../view/Type/index.vue'))
    }, {
        path: '/typeMessage',
        name: 'TypeMessage',
        component: asyncLoadComponent(import('../view/TypeMessage/index.vue')),
        props: true
    }, {
        path: '/404',
        component: asyncLoadComponent(import('../view/404/index.vue'))
    }, {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
];

export default routes;
