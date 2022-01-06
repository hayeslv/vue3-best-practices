<template>
  <component :is="component"></component>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "./index";

let router = useRouter();
const component = computed(() => {
  const route = router.route.find(route => route.path === router.current.value);
  return route ? route.component : null;
})

</script>

<style>

</style>