<!-- 
  使用方式：<Rate :value="score" theme="red" @update-rate="update">课程评分：</Rate>
  let score = ref(3)
  function update(num) {
    score.value = num;
  } 
-->

<template>
  <div class="star-rate" :style="fontStyle">
    <slot></slot>
    <div class="rate" @mouseout="mouseOut">
      <span class="full">
        <span class="star" @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      </span>
      <span class="hollow" :style="fontWidth">
        <span @click="onRate(num)" class="star" @mouseover="mouseOver(num)" v-for="num in 5" :key="num">★</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref, defineEmits } from 'vue'

const themeObj = { 
  'black': '#000', 
  'white': '#fff', 
  'red': '#f5222d', 
  'orange': '#fa541c', 
  'yellow': '#fadb14', 
  'green': '#73d13d', 
  'blue': '#40a9ff',
}

let props = defineProps({
  value: Number,
  theme: { type: String, default: 'black' }
})
// let rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value))

// 评分宽度
let width = ref(props.value);
function mouseOver(i) {
  width.value = i;
}
function mouseOut() {
  width.value = props.value;
}
const fontWidth = computed(() => `width: ${width.value}em;`)


const fontStyle = computed(() => {
  return `color: ${themeObj[props.theme]};`;
})

let emits = defineEmits(['update-rate'])
function onRate(num) {
  emits('update-rate', num)
}
</script>

<style scoped>
.star-rate .star{
  display: inline-block;
  width: 1em;
}
.rate{ 
  position: relative; 
  display: inline-block;
}
.rate > span.hollow { 
  position: absolute; 
  top: 0; 
  left: 0; 
  width: 0; 
  overflow: hidden;
  white-space: nowrap;
}
</style>