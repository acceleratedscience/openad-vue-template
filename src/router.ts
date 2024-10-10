import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			meta: { hideNav: true },
			component: HomeView,
		},
		{
			path: '/showcase',
			name: 'showcase',
			component: () => import('./views/ShowcaseView.vue'),
		},
		{
			path: '/:catchAll(.*)',
			name: 'error-404',
			component: () => import('./views/ErrorView.vue'),
		},
	],
})

export default router
