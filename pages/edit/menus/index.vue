<script setup>
//menus/index.vue
const { data: menus } = await useFetch("/api/menus");
</script>
<template>
  <v-card class="card">
    <v-card-title>
      <span class="title-text">Edit Menus</span>
      <v-btn flat text="New +" to="/edit/menus/new" class="new-btn"/>
    </v-card-title>
    <v-card-item v-for="( menu, i) in menus" :key="i">
      <EditMenu :menu="menu"/>
    </v-card-item>
  </v-card>
</template>
<style scoped>
.card {
  margin: 20px auto;
  width: 80vw;
  height: 80vh;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
}
.v-card-title {
  display: flex;
  justify-content: center; /* Space between title and button */
  align-items: center;
  position: relative;
  padding: 20px;
  color: white;
}
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
.menu-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
