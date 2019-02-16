import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'hot',
      component: () => import('./views/HotWeibo.vue')
    },
    // {
    //   path: '/archives',
    //   name: 'archives',
    //   component: () => import('./views/Archives.vue')
    // },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: () => import('./views/Settings.vue')
    // },
    {
      path: '/help',
      name: 'help',
      component: () => import('./views/Help.vue')
    }, {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
  ]
})