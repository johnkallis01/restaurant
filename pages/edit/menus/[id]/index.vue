<script setup>
useHead({
  title: "John's Restaurant - Edit Menu"
});
definePageMeta({middleware: ['admin','auth']});
const route = useRoute();
const pageContainerRef = ref(null);
const menuStore=useMenuStore();
const menu = computed(()=>{
  const id = route.params.id;
  return menuStore.menus.find((menu)=>menu._id === id) || null;
});
async function fetchMenus(){
  try{
    await menuStore.fetchMenus();
  }catch (error){
    console.log('error fetching menus')
  }
}
onMounted(fetchMenus);
</script>
<template>
  <div class="page-container" ref="pageContainerRef">
    <div class="container-title">
      <span class="edit-menu">Edit Menu</span>
    </div>
    <div class="container-body">
      <div class="reload">reload page to view edits on menus/order page</div>
        <EditMenu :menu="menu" :menus="menuStore.menus" v-if="menu"/>
      <div v-else>error</div>
    </div>
  </div>
</template>
<style scoped>
.reload{
  text-align: center;
}
@media(max-width: 450px){
  .page-container{
    width: 105vw;
  }
}
</style>