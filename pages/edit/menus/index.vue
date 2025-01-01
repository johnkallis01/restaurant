<script setup>
//menus/index.vue
const { data: menus } = await useFetch("/api/menus");
const newMenuDialog = ref(false);
</script>
<template>
  <div class="page-container">
    <div class="container-title">
      <span class="title-text">Edit Menus</span>
      <button class="btn new" @click="newMenuDialog = true">New +</button>
    </div>
    <div class="container-body" v-for="( menu, i) in menus" :key="i">
     <EditMenu :menu="menu"/>
    </div>
    <v-dialog class="dialog" v-model="newMenuDialog">
      <NewMenuDialog @getDialogFlag="recieveNewMenuDialog"/>
    </v-dialog>
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