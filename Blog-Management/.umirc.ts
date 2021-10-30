import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      exact: true,
      component: '@/pages/Login/index',
    },  {
      path: '/404',
      component: '@/pages/NotFound/index'
    }, {
      path: '/',
      component: '@/pages/Home/index',
      routes: [
        {
          path: '/',
          redirect: '/blog'
        }, {
          path: '/blog',
          component: '@/pages/Blog/index',
          routes: [
            {
              path: '/blog',
              redirect: '/blog/list'
            }, {
              path: '/blog/list',
              component: '@/pages/Blog/list'
            }, {
              path: '/blog/add',
              component: '@/pages/Blog/add'
            }, {
              path: '/blog/put',
              component: '@/pages/Blog/put'
            }, {
              redirect: '/404'
            }
          ]
        }, {
          redirect: '/404'
        }
      ]
    },{
      redirect: '/404'
    },
  ],
  fastRefresh: {},
  antd: {},
});
