// 导入组件
import Vue from 'vue'
import Router from 'vue-router'

import * as types from '../store/types'
import store from '../store/store'
import storePlugin from '../storePlugin'

// 登录
const login         = r => require.ensure([], () => r(require('@/components/Login/Login')), 'login');
// 注册
const register      = r => require.ensure([], () => r(require('@/page/register')), 'register');
// 首页
const index         = r => require.ensure([], () => r(require('@/page/index')), 'index');
// 商家首页
const sllerIndex    = r => require.ensure([], () => r(require('@/page/sllerIndex')), 'sllerIndex');
// 商品列表
const goodsListPage = r => require.ensure([], () => r(require('@/page/goodsListPage')), 'goodsListPage');
// 添加商品
const goodsAddNew   = r => require.ensure([], () => r(require('@/page/goodsAddNew')), 'goodsAddNew');
// 全部订单
const allOrder   = r => require.ensure([], () => r(require('@/page/allOrder')), 'allOrder');
//发货页面
// const sendGoods   = r => require.ensure([], () => r(require('@/page/sendGoods')), 'sendGoods');


// 启用路由
Vue.use(Router);

// 导出路由 
const router = new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true
    },
    {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true
    },
    {
        path: '/register',
        name: '注册',
        component: register,
        hidden: true
    },
    {
        path: '/index',
        name: '首页',
        component: index,
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        redirect:'sllerIndex',
        children: [{
            path: '/sllerIndex',
            name: '商家首页',
            component: sllerIndex,
            meta: {
                requireAuth: true, 
            }
        }]
    },  
    {
        path: '/index',
        name: '商品管理',
        component: index,
        meta: {
            requireAuth: true,  
        },
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/goodsAddNew',
            name: '商品发布',
            component: goodsAddNew,
            meta: {
                requireAuth: true, 
            }
        }, 
        {
            path: '/goodsListPage',
            name: '商品列表',
            component: goodsListPage,
            meta: {
                requireAuth: true, 
            }
        }]
    }, 
    {
        path: '/index',
        name: '订单管理',
        component: index,
        meta: {
            requireAuth: true,  
        },
        iconCls: 'el-icon-menu',
        children: [{
            path: '/allOrder',
            name: '全部订单',
            component: allOrder,
            meta: {
                requireAuth: true, 
            }
        }
        // , 
        // {
        //     path: '/sendGoods',
        //     name: '发货',
        //     component: sendGoods
        // }
        ]
    }

    ]
})

if (window.localStorage.getItem('token')) {
    var token= JSON.parse(window.localStorage.getItem('token'))
    store.commit(types.LOGIN, token)
}

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        // console.log(store.state.token)
        if (window.sessionStorage.getItem('name') !== null) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

 export default router