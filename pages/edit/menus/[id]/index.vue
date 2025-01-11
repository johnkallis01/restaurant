<script setup>
import { useRoute } from 'vue-router'
const { data: menus } = await useFetch("/api/menus");
const route = useRoute()
const menu = computed(()=>{
  const id = route.params.id;
  return menus.value?.find((menu)=>menu._id === id) || null;
});

</script>
<template>
  <div class="page-container">
    <div class="container-title">
      <span class="title-text">Edit Menu</span>
    </div>
    <div class="container-body">
        <EditMenu :menu="menu" />
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