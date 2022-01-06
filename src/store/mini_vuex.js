/* 
 * mini版vuex（目前只实现了get和set）
 */

import { inject, reactive } from "vue";

const SOTRE_KEY = '__store__';

function useStore() {
  return inject(SOTRE_KEY);
}
function createStore(options) {
  return new Store(options);
}

class Store {
  constructor(options) {
    this.$options = options;
    this._state = reactive({
      data: options.state()
    });
    this._mutations = options.mutations;
  }
  get state() {
    return this._state.data
  }
  commit = (type, payload) => {
    const entry = this._mutations[type];
    entry && entry(this.state, payload);
  }
  // main.js入口处 app.use(store)的时候，会执行install函数
  install(app) {
    app.provide(SOTRE_KEY, this);
  }
}

export { createStore, useStore }