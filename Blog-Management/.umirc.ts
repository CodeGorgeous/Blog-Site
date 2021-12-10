import { defineConfig } from 'umi';

export default defineConfig({
  history: {
    type: 'hash'
  },
  nodeModulesTransform: {
    type: 'none',
  },
  title: '后台管理中心',
  routes: [
    {
      path: '/login',
      exact: true,
      component: '@/pages/Login/index',
      title: '登录'
    },  {
      path: '/404',
      component: '@/pages/NotFound/index',
      title: '404 NotFound'
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
              component: '@/pages/Blog/list',
              title: '博客列表'
            }, {
              path: '/blog/add',
              component: '@/pages/Blog/add',
              title: '新增博客'
            }, {
              path: '/blog/put',
              component: '@/pages/Blog/put',
              title: '修改博客'
            }, {
              path: '/blog/lock',
              component: '@/pages/Blog/lock',
              title: '查看博客'
            }, {
              path: '/blog/type',
              component: '@/pages/Blog/type',
              title: '新增分类'
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
              component: '@/pages/Image/list',
              title: '图片列表'
            }, {
              path: '/image/add',
              component: '@/pages/Image/add',
              title: '新增图片'
            }, {
              path: '/image/type',
              component: '@/pages/Image/addType',
              title: '新增类型'
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
              component: '@/pages/User/list',
              title: '用户列表'
            }, {
              path: '/user/alterUser',
              component: '@/pages/User/alterUser',
              title: '修改信息'
            }, {
              redirect: '/404'
            }
          ]
        }, {
          path: '/resources',
          component: '@/pages/Resources',
          title: '资源管理',
          routes: [
            {
              path: '/',
              redirect: '/resources/list',
            },
            {
              path: '/resources/list',
              component: '@/pages/Resources/list',
              title: '资源列表'
            }, {
              path: '/resources/add',
              component: '@/pages/Resources/add',
              title: '新增功能'
            }, {
              path: '/resources/alterResources',
              component: '@/pages/Resources/alterResources',
              title: '修改资源信息'
            }, {
              redirect: '/404'
            }
          ]
        }, {
          path: '/other',
          component: '@/pages/Other',
          title: '其他管理',
          routes: [
            {
              path: '/',
              redirect: '/other/title',
            },
            {
              path: '/other/title',
              component: '@/pages/Other/title',
              title: '标语管理'
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
  dva: {},
});
