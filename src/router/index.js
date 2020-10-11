import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase/app"

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Auth',
		component: () => import('../views/Auth.vue'),
	},
	{
		path: '/contacts',
		name: 'Contacts',
		meta: {auth: true},
		component: () => import('../views/Contacts')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	let currentUser = firebase.auth().currentUser;
	const requireAuth = to.matched.some(record => record.meta.auth);

	if (currentUser && to.path == '/') {
		next('/contacts')
	}
	if (!currentUser && requireAuth) {
		next('/')
	}else next()
})

export default router