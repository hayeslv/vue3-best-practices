import { ref, watchEffect } from "vue";



/**
 * 数据变化后自动同步本地存储
 * 使用方式：let todos = useStorage('todos', [])
 */
export function useStorage(name, value = []) {
  let data = ref(JSON.parse(localStorage.getItem(name)) || value);
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value));
  })
  return data;
}