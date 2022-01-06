<template>
  <div @click="add">{{count}}</div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../store/mini_vuex';

let store = useStore();
let count = computed(() => store.state.count);

function add() {
  store.commit('add');
}

</script>

<style>

</style>