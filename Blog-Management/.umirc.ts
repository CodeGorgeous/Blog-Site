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
      wrappers: ['@//wrappers/ifLogin.tsx'],
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
              path: '/blog/lock',
              component: '@/pages/Blog/lock'
            }, {
              redirect: '/404'
            }
          ]
        }, {
          path: '/image',
          component: '@/pages/Image/index',
          routes: [
            {
              path: '/',
              redirect: '/image/list'
            }, {
              path: '/image/list',
              component: '@/pages/Image/list'
            }, {
              path: '/image/add',
              component: '@/pages/Image/add'
            }, {
              redirect: '/404'
            }
          ]
        }, {
          path: '/user',
          component: '@/pages/User',
          routes: [
            {
              path: '/user',
              redirect: '/user/list'
            }, {
              path: '/user/list',
              component: '@/pages/User/list'
            }, {
              path: '/user/alterUser',
              component: '@/pages/User/alterUser'
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
  dva: {}
});
