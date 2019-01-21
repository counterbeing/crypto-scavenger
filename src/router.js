import Vue from 'vue'
import Router from 'vue-router'
import Builder from '@/Builder'
import Parser from '@/Parser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Builder',
      component: Builder
    },
    {
      path: '/parser',
      name: 'Parser',
      component: Parser
    }
  ]
})
