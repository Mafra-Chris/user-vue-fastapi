import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from '~pages'
import store from '../store'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(generatedRoutes)
})
router.beforeEach(async (to, _, next) => {
  try {
    await store.dispatch('viewMe');
  } catch (error) {
    console.log(error)
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});
export default router