// import { createStore } from 'vuex'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      // let count = computed(() => store.state.count)
      count: 0
    }
  },
  getters: {
    // let double = computed(() => store.getters.double)
    double(state) {
      return state.count * 2;
    }
  },
  mutations: {
    add(state) {
      state.count++
    }
  },
  actions: {
    // store.dispatch('asyncAdd')
    asyncAdd({ commit }) {
      setTimeout(() => {
        commit('add');
      }, 1000);
    }
  }
})

export default store;

