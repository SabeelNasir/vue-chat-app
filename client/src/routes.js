import Home from '@/components/Home'

const routes = [
    [
        {
            path: '/login',
            component: () => import('@/components/Auth/Login'),
            meta: { requiresVisitor: true },
            name: 'login',
        },
        {
            path: '/',
            component: Home,
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
    ]
]

export default routes