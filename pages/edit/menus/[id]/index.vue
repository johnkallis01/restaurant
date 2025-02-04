<script setup>
useHead({
  title: "John's Restaurant - Edit Menu"
});
definePageMeta({middleware: ['admin','auth']});
const route = useRoute();
const menuStore=useMenuStore();
const menu = computed(()=>{
  const id = route.params.id;
  return menuStore.menus.find((menu)=>menu._id === id) || null;
});
</script>
<template>
  <div class="page-container">
    <div class="container-title">
      <span class="title-text">Edit Menu</span>
    </div>
   
    <div class="container-body">
      <div class="reload">reload page after edit</div>
        <EditMenu :menu="menu" :menus="menuStore.menus" v-if="menu"/>
        <div v-else>error</div>
    </div>

  </div>
</template>
<style scoped>
.reload{
  text-align: center;
}
.btn.new{
  background-color: green;
  color: white;
}
.btn.new:hover{
  background-color: darkgreen;
}
</style>