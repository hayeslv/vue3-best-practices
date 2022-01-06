import { ref, watch, watchEffect } from "vue";

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

/**
 * 修改favicon.ico
 * 使用方式：let { favicon, reset } = useFavicon();
 * favicon.value = '/loading.gif';
 */
export function useFavicon(newIcon) {
  const favicon = ref(newIcon);
  const updateIcon = icon => {
    document.head
      .querySelectorAll(`link[rel*="icon"]`)
      .forEach(el => el.href = `${icon}`)
  }
  const reset = () => favicon.value = '/favicon.ico';

  watch(favicon, icon => {
    updateIcon(icon);
  })

  return { favicon, reset };
}