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
    path: '/logistik',
    name: 'Logistik',
    component: () => import('../pages/LogistikPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/laporan',
    name: 'Laporan',
    component: () => import('../pages/LaporanPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('../pages/ForumPage.vue')
  },
  {
    path: '/developer',
    name: 'Developer',
    component: () => import('../pages/DeveloperPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../pages/RegisterPage.vue')
  },
  {
    path: '/public-dashboard',
    name: 'PublicDashboard',
    component: () => import('../pages/PublicDashboard.vue'),
    meta: { requiresAuth: true, publicOnly: true }
  },
  {
    path: '/public-donasi',
    name: 'PublicDonasi',
    component: () => import('../pages/PublicDonasiPage.vue'),
    meta: { requiresAuth: true, publicOnly: true }
  },
  {
    path: '/public-relawan',
    name: 'PublicRelawan',
    component: () => import('../pages/PublicRelawanPage.vue'),
    meta: { requiresAuth: true, publicOnly: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard
function isAuthenticated() {
  return localStorage.getItem('isAuthenticated') === 'true'
}

function getUserRole() {
  return localStorage.getItem('userRole') || 'petugas'
}

router.beforeEach((to, from, next) => {
  const authed = isAuthenticated()
  const role = getUserRole()

  // protect any route with meta.requiresAuth
  if (to.meta.requiresAuth && !authed) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
    return
  }

  // Check role restrictions
  if (to.meta.requiresAuth && authed) {
    if (to.meta.publicOnly && role === 'petugas') {
      next('/dashboard')
      return
    }
    if (!to.meta.publicOnly && role === 'masyarakat') {
      next('/public-dashboard')
      return
    }
  }

  // if already logged in, don't show login or register page
  if ((to.path === '/login' || to.path === '/register') && authed) {
    if (role === 'masyarakat') {
      next('/public-dashboard')
    } else {
      next('/dashboard')
    }
    return
  }

  next()
})

export default router

