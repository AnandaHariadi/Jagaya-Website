import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: () => import('../pages/SplashScreen.vue')
  },
  {
    path: '/landing',
    name: 'Landing',
    component: () => import('../pages/LandingPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/LoginPage.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../pages/DashboardPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/relawan',
    name: 'Relawan',
    component: () => import('../pages/RelawanPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/pengungsian',
    name: 'Pengungsian',
    component: () => import('../pages/PengungsianPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/donasi',
    name: 'Donasi',
    component: () => import('../pages/DonasiPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/developer',
    name: 'Developer',
    component: () => import('../pages/DeveloperPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
function isAuthenticated() {
  // Mock auth for now (rely on localStorage). Ke depan bisa diganti JWT/token.
  return localStorage.getItem('isAuthenticated') === 'true'
}

router.beforeEach((to, from, next) => {
  const authed = isAuthenticated()

  // protect any route with meta.requiresAuth
  if (to.meta.requiresAuth && !authed) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // if already logged in, don't show login page
  if (to.path === '/login' && authed) {
    next('/dashboard')
    return
  }

  next()
})

export default router

