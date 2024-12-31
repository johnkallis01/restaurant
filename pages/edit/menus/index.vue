<script setup>
//menus/index.vue
const { data: menus } = await useFetch("/api/menus");
</script>
<template>
  <div class="page-container">
    <div class="container-title">
      <span class="title-text">Edit Menus</span>
      <button flat text="New +" to="/edit/menus/new" class="new-btn"/>
    </div>
    <div class="container-body" v-for="( menu, i) in menus" :key="i">
     <EditMenu :menu="menu"/>
    </div>
  </div>
</template>
<style scoped>
.title-text{
  position: absolute;
  left: 50%;
}
.new-btn{
  background-color: green;
  color: white;
  position: absolute;
  right: 0;
}
</style>
