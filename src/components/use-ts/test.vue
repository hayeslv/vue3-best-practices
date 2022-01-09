<template>
  
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";

interface Course {
  name: string,
  price: number
}

const msg = ref(''); // 根据输入参数推导字符串类型
const msg1 = ref<string>(''); // 可以通过范型显示约束

const obj = reactive({});
const course = reactive<Course>({ name: 'vue3全家桶', price: 88 });

const msg2 = computed(() => ''); // 默认参数推导
const course2 = computed<Course>(() => {
  return { name: '玩转', price: 198 }
})

const props = defineProps<{
  title: string,
  value?: number
}>()
const emit = defineEmits<{
  (e: 'update', value: number): void
}>()
</script>

<style>

</style>