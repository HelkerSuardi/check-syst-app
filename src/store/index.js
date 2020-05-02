import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import check from './check'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      user,
      check
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
