<template>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
</template>
<script setup>
const menuStore=useMenuStore();
async function fetchMenus(){
  try{
    await menuStore.fetchMenus();
  }catch (error){
    console.log('error fetching menus')
  }
}
onMounted(fetchMenus);
</script>