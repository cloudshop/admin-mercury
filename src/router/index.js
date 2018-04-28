// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
const login         = r => require.ensure([], () => r(require('@/page/login')), 'login');
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
const sendGoods   = r => require.ensure([], () => r(require('@/page/sendGoods')), 'sendGoods');
// import login from '@/page/login';
// 注册
// import register from '@/page/register';
// 首页
// import index from '@/page/index';

// 商家首页
// import sllerIndex from '@/page/sllerIndex';
// 商品列表
// import goodsListPage from '@/page/goodsListPage';
// 添加商品
// import goodsAddNew from '@/page/goodsAddNew';
// 增加编辑
// import addedit from '@/page/addedit';
// 错误
import error from '@/page/error';
// 401
import errorf from '@/page/401';
/*
 * 下面为演示组件，后期去掉
 */
// 管理
// import management from '@/components/management';
// 分页 
import paging from '@/components/paging';
// 轮播图
import shuffling from '@/components/shuffling';

// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
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
        // component: sllerIndex,
        component: index,
        redirect:'sllerIndex',
        children: [{
            path: '/sllerIndex',
            name: '商家首页',
            component: sllerIndex
        }]
    },  
    {
        path: '/index',
        name: '商品管理',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/goodsAddNew',
            name: '商品发布',
            component: goodsAddNew
        }, 
        {
            path: '/goodsListPage',
            name: '商品列表',
            component: goodsListPage
        }]
    }, 
    {
        path: '/index',
        name: '订单管理',
        component: index,
        iconCls: 'el-icon-menu',
        children: [{
            path: '/allOrder',
            name: '全部订单',
            component: allOrder
        }
        // , 
        // {
        //     path: '/sendGoods',
        //     name: '发货',
        //     component: sendGoods
        // }
        ]
    }
    // , 
    // {
    //     path: '/index',
    //     name: '分页&轮播图',
    //     component: index,
    //     iconCls: 'el-icon-picture-outline',
    //     children: [{
    //         path: '/paging',
    //         name: '分页',
    //         component: paging
    //     }, 
    //     {
    //         path: '/shuffling',
    //         name: '轮播图',
    //         component: shuffling
    //     }]
    // }, 
    // {
    //     path: '/index',
    //     name: '页面',
    //     component: index,
    //     iconCls: 'el-icon-news',
    //     children: [{
    //         path: '/error',
    //         name: '404',
    //         component: error
    //     }, 
    //     {
    //         path: '/errorf',
    //         name: '401',
    //         component: errorf
    //     }]
    // }
    ]
})