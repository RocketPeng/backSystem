import Vue from 'vue'
import Router from 'vue-router'
import homeIndex from '@/components/homeIndex/homeIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeIndex',
      component: homeIndex
    }
  ]
})
