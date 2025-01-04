<script setup>
//menus/index.vue
const { data: menus } = await useFetch("/api/menus");
const newMenu=()=>{
  console.log('new menu logic')
}
</script>
<template>
  <div class="page-container">
    <div class="container-title">
      <span class="title-text">Edit Menus</span>
      <button class="btn new" @click="newMenu">
        <span class="btn-text">New +</span>
        <span class="tooltip">new menu</span>
      </button>
    </div>
    <div class="container-body">
      <div v-for="( menu, i) in menus" :key="i">
        <EditMenu :menu="menu"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn.new{
  background-color: green;
  color: white;
  position: absolute;
  right: 0;
  margin: 10px;
  padding: 5px 10px;
}
.btn.new:hover{
  background-color: darkgreen;
}
</style>