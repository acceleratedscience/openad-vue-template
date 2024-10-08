<<<<<<< HEAD
<<<<<<< HEAD
import { useMainStore } from '@/stores/MainStore'
import { createRouter, createWebHistory } from 'vue-router'
=======
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
>>>>>>> 0861eb5 (Free Palestine)
=======
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
>>>>>>> 0861eb5 (Free Palestine)

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
<<<<<<< HEAD
<<<<<<< HEAD
			name: 'Home',
			meta: { hideNav: true },
			component: () => import('./views/HomeView.vue'),
		},
		{
			path: '/showcase',
			name: 'Showcase',
			component: () => import('./views/ShowcaseView.vue'),
		},
		{
			path: '/demo',
			name: 'Demo',
			redirect: '/demo/flavor-picker',
			children: [
				{
					path: 'flavor-picker',
					name: 'Flavor picker',
					component: () => import('./views/DemoView.vue'),
				},
			],
		},
		{
			path: '/:catchAll(.*)',
			name: 'Error',
			component: () => import('./views/ErrorView.vue'),
=======
=======
>>>>>>> 0861eb5 (Free Palestine)
			name: 'home',
			meta: { hideNav: true },
			component: HomeView,
		},
		{
			path: '/kitchensink',
			name: 'kitchensink',
			component: () => import('./views/KitchenSink.vue'),
<<<<<<< HEAD
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)
		},
	],
})

<<<<<<< HEAD
<<<<<<< HEAD
// // Conditional redirect (eg. when session expired)
// router.beforeEach((to, from, next) => {
// 	if (someCondition) {
// 		next({ path: '/custom' })
// 	} else {
// 		next()
// 	}
// })

=======
>>>>>>> 0861eb5 (Free Palestine)
=======
>>>>>>> 0861eb5 (Free Palestine)
export default router
