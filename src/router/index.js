import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes';
import authService from '../service/auth-service';

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

 const canAccessRoute = (userRoles = [], routeAllowedRoles = []) => {
   if (routeAllowedRoles.includes('*')) {
     return true
   }

   for (let userRole of userRoles) {
     if (routeAllowedRoles.includes(userRole)) {
       return true
     }
   }

   return false
 }

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      try {
        const loggedIn = await authService.loggedIn()

        if (!loggedIn) {
          return next({
            name: 'login',
            query: { redirect: to.fullPath }
          })
        }

        if (
          !to.meta.allowedRoles ||
          to.meta.allowedRoles.includes('*') ||
          to.meta.allowedRoles.length === 0
        ) {
          return next()
        }

        if (canAccessRoute(loggedIn.roles, to.meta.allowedRoles)) {
          return next()
        } else {
          return next ({
            name: from.name,
            query: { redirect: from.fullPath }
          })
        }
      } catch (e) {
        return next ({
          name: 'login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      return next()
    }
  })

  return Router;
}
