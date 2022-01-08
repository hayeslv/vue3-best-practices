// 使用方式：<Heading level="1">hahah</Heading>

import { defineComponent, h } from "vue";

export default defineComponent({
  props: {
    level: {
      type: Number,
      required: true,
    }
  },
  setup(props, { slots }) {
    // !使用 h 函数的方式
    // return () => h(
    //   'h' + props.level, // 标签名
    //   {}, // prop 或 attribute
    //   slots.default() // 子节点
    // )
    
    // !使用jsx
    const tag = 'h' + props.level;
    return () => <tag>{slots.default()}</tag>
  }
})