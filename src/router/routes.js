
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/checks', component: () => import('pages/Checks.vue') },
      { path: '/check', component: () => import('pages/Check.vue') },
      { path: '/check-add', component: () => import('pages/Create-Check.vue') },
      { path: '/user', component: () => import('pages/User.vue') },
      { path: '/user', component: () => import('pages/User.vue') },
    ]
  },
  {
    path: '/login',
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
