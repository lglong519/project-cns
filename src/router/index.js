import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login';
import { REQUST, MODE } from '@/.config';
let mode = localStorage.getItem('mode');
mode || (mode = MODE);

Vue.use(Router);

// import Layout from '@/views/layout/Layout';
const Layout = resolve => require(['@/views/layout/Layout'], resolve);

export default new Router({
	mode: 'history',
	routes: [
		{ path: '/404', component: () => import('@/views/404') },
		{
			path: '/',
			component: Layout,
			redirect: '/index',
			hidden: true,
			children: [{
				path: 'index',
				name: 'index',
				// component: () => import('@/views/index/index'),
				component: resolve => require(['@/views/index/index'], resolve),
				meta: { title: 'Index' }
			}]
		},
		{
			path: '/login',
			name: '登录',
			component: login
		},
		{
			path: '/access',
			component: Layout,
			children: [
				{
					path: '',
					name: 'Access',
					// component: () => import('@/views/access/index'),
					component: resolve => require(['@/views/access/index'], resolve),
					meta: { title: 'Access', icon: 'table' }
				}
			]
		},
		{
			path: '/packages',
			component: Layout,
			children: [
				{
					path: '',
					name: 'Packages',
					// component: () => import('@/views/packages/index'),
					component: resolve => require(['@/views/packages/index'], resolve),
					meta: { title: 'Packages', icon: 'codepen' }
				}
			]
		},
		{
			path: '/exercise',
			redirect: '/exercise/squats',
			name: 'Exercise',
			component: Layout,
			meta: {
				title: 'Exercise',
				icon: 'futbol-o',
			},
			children: [
				{
					path: '/exercise/squats',
					name: 'Squats',
					// component: () => import('@/views/exercise/index'),
					component: resolve => require(['@/views/exercise/index'], resolve),
					meta: { title: 'Squats', icon: 'child' }
				},
				{
					path: '/exercise/press-ups',
					name: 'PressUps',
					// component: () => import('@/views/exercise/index'),
					component: resolve => require(['@/views/exercise/index'], resolve),
					meta: { title: 'PressUps', icon: 'hand-paper-o' }
				}
			]
		},
		{
			path: '/expenses',
			component: Layout,
			children: [
				{
					path: '',
					name: 'Expenses',
					// component: () => import('@/views/expenses/index'),
					component: resolve => require(['@/views/expenses/index'], resolve),

					meta: { title: 'Expenses', icon: 'yen' }
				}
			]
		},
		{
			path: 'Space',
			component: Layout,
			children: [
				{
					path: REQUST[mode].YUN_DOMAIN,
					meta: { title: 'Space', icon: 'upload', type: 'el' }
				}
			]
		},
		{
			path: 'Mongo',
			component: Layout,
			children: [
				{
					path: REQUST[mode].MONGO_DOMAIN,
					meta: { title: 'Mongo', icon: 'database' }
				}
			]
		},
		{
			path: 'MoFunc.com',
			component: Layout,
			children: [
				{
					path: REQUST[mode].MAIN_DOMAIN,
					meta: { title: 'MoFunc.com', icon: 'link' }
				}
			]
		},
		{ path: '*', redirect: '/404' }
	]
});
