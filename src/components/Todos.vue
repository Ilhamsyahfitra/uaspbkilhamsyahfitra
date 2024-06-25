<template>
  <div class="todo-app">
    <h1>Daftar Tugas</h1>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Tambah tugas baru" />
    <ul>
      <li v-for="task in todos" :key="task.id" :class="{ completed: task.completed }">
        <input type="checkbox" v-model="task.completed" @change="toggleTask(task)" />
        <span>{{ task.title }}</span>
        <div class="task-actions">
          <button class="edit-btn" @click="editTask(task)">Edit</button>
          <button class="delete-btn" @click="removeTask(task)">Hapus</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const todos = ref([])
const newTask = ref('')

function addTask() {
  if (newTask.value.trim() === '') return
  todos.value.push({ id: Date.now(), title: newTask.value, completed: false })
  newTask.value = ''
  saveData()
}

function toggleTask(task) {
  task.completed = !task.completed
  saveData()
}

function removeTask(task) {
  todos.value = todos.value.filter(t => t.id !== task.id)
  saveData()
}

function editTask(task) {
  const newTitle = prompt('Edit task title', task.title)
  if (newTitle !== null && newTitle.trim() !== '') {
    task.title = newTitle
    saveData()
  }
}

function saveData() {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

function loadData() {
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.todo-app {
  width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.todo-app h1 {
  color: #333;
}

.todo-app input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.todo-app ul {
  list-style: none;
  padding: 0;
}

.todo-app li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.todo-app li.completed span {
  text-decoration: line-through;
  color: #888;
}

.todo-app .task-actions {
  display: flex;
  align-items: center;
}

.todo-app .task-actions button {
  margin-left: 10px;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  color: #fff;
  transition: background 0.3s;
}

.todo-app .edit-btn {
  background: #ffc107;
}

.todo-app .edit-btn:hover {
  background: #ffb300;
}

.todo-app .delete-btn {
  background: #f44336;
}

.todo-app .delete-btn:hover {
  background: #e53935;
}
</style>
