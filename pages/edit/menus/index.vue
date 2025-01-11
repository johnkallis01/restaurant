<script setup>
//menus/index.vue
const { data: menus } = await useFetch("/api/menus");
const newMenu=()=>{
  console.log('new menu logic');

}
</script>
<template>
  <div class="page-container">
    <div class="container-title">
      <span class="title-text">Edit Menus</span>
      <nuxt-link to="/edit/menus/new">
      <button class="btn new">
        <span class="btn-text">New +</span>
        <span class="tooltip">new menu</span>
      </button>
      </nuxt-link>
    </div>
    <div class="container-body">
      <div v-for="( menu, i) in menus" :key="i">
        <EditMenu :menu="menu" :menus="menus"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn.new{
  background-color: green;
  color: white;
}
.btn.new:hover{
  background-color: darkgreen;
}
</style>