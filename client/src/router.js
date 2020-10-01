import Vue from 'vue'
import VueRouter from 'vue-router'
// import routes from './routes'
import store from './store'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        component: () => import('@/components/Auth/Login'),
        meta: { requiresVisitor: true },
        name: 'login',
    },
    {
        path: '/',
        component: () => import('@/components/Home'),
        redirect: 'home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/components/Chat/ChatIndex'),
                meta: { requiresAuth: true }
            }
        ]
    }
];
const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: routes
})

// Router Navigation Gaurd
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters['auth/isLoggedIn']) {
            next({
                name: 'login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters['auth/isLoggedIn']) {
            next({
                name: 'home',
            })
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router
