
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', meta: { requiresAuth: true }, component: () => import('pages/Index.vue') },
      { path: '/checks', meta: { requiresAuth: true }, component: () => import('pages/Checks.vue') },
      { path: '/check', meta: { requiresAuth: true }, component: () => import('pages/Check.vue') },
      { path: '/check-add', meta: { requiresAuth: true }, component: () => import('pages/Create-Check.vue') },
      { path: '/user', meta: { requiresAuth: true }, component: () => import('pages/User.vue') },
      { path: '/user', meta: { requiresAuth: true }, component: () => import('pages/User.vue') },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { requiresAuth: false },
    component: () => import('layouts/Login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
