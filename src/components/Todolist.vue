<template>
  <input type="text" v-model="title" @keydown.enter="addTodo">
  <button v-if="active < all" @click="clear">清理已完成项</button>
  <ul v-if="todos.length">
    <transition-group name="flip-list" tag="ul">
      <li v-for="(todo, index) in todos" :key="todo">
        <input type="checkbox" v-model="todo.done">
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
        <span class="remove-btn" @click="removeTodo($event, index)">❌</span>
      </li>
    </transition-group>
  </ul>
  <div v-else>暂无数据</div>
  <div>
    全选
    <input type="checkbox" v-model="allDone">
    <span>{{ active }} / {{ all }}</span>
  </div>

  <transition name="modal">
    <div class="info-wrapper" v-if="showModal">
      <div class="info">哥，你啥也没输入！</div>
    </div>
  </transition>

  
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useStorage } from '../utils/storage';

let { title, todos, showModal, addTodo, clear, active, all, allDone } = useTodos();

function removeTodo(e, i) {
  todos.value.splice(i, 1);
}






function useTodos() {
  let title = ref("");
  // let todos = ref(JSON.parse(localStorage.getItem('todos')||'[]'));
  let todos = useStorage('todos', []);
  let showModal = ref(false);

  watchEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  })

  function addTodo() {
    if(!title.value) {
      showModal.value = true;
      setTimeout(() => {
        showModal.value = false;
      }, 1500)
      return;
    }
    todos.value.push({
      title: title.value,
      done: false,
    })
    title.value = "";
  }
  function clear() {
    todos.value = todos.value.filter(v => !v.done);
  }

  let active = computed(() => {
    return todos.value.filter(v => !v.done).length;
  })
  let all = computed(() => todos.value.length)
  let allDone = computed({
    get: function() {
      return active.value === 0;
    },
    set: function(value) {
      todos.value.forEach(todo => {
        todo.done = value;
      })
    }
  })
  return { title, todos, showModal, addTodo, clear, active, all, allDone };
}
</script>

<style>
.info-wrapper {  
  position: fixed;  
  top: 20px;  
  width:200px;
}
.info {  
  padding: 20px;  
  color: white;  
  background: #d88986;
}

.modal-enter-from { 
  opacity: 0; 
  transform: translateY(-60px); 
} 
.modal-enter-active { 
  transition: all 0.3s ease; 
} 
.modal-leave-to { 
  opacity: 0; 
  transform: translateY(-60px); 
} 
.modal-leave-active { 
  transition: all 0.3s ease; 
}

.flip-list-move { 
  transition: transform 0.8s ease;
}
.flip-list-enter-active,.flip-list-leave-active { 
  transition: all 1s ease;
}
.flip-list-enter-from,.flip-list-leave-to { 
  opacity: 0; 
  transform: translateX(30px);
}
</style>