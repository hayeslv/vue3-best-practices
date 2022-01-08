## 依赖使用

1、vuex和vue-router

```bash
npm install vue-router@next vuex@next -S
```

2、使用jsx

```bash
npm install @vitejs/plugin-vue-jsx -D
```

打开 vite.config.js 修改配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()]
})
```

