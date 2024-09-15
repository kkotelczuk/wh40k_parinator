import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from './lib/supabase'
import Dashboard from './pages/Dashboard.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if user is authenticated
    if (!(await isAuthenticated())) {
      // Redirect to login page if not authenticated
      next({ name: 'Login' })
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession()
  return session !== null
}

export default router
