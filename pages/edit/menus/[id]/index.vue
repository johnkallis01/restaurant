<script setup>
useHead({
  title: "John's Restaurant - Edit Menu"
});
definePageMeta({middleware: ['admin','auth']});
// definePageMeta({middleware: ['auth']});

const { data: menus } = await useFetch("/api/menus");
const route = useRoute();
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
        <EditMenu :menu="menu" :menus="menus" v-if="menu"/>
        <div v-else>error</div>
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