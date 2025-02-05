<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
</template>
<script setup>
const menuStore=useMenuStore();
const cartStore=useCartStore();
async function fetchOrders(){
  try{
    await cartStore.fetchOrders();
  }catch(error){
    console.log('error fetching orders')
  }
}
onBeforeMount(fetchOrders);
async function fetchMenus(){
  try{
    await menuStore.fetchMenus();
  }catch (error){
    console.log('error fetching menus')
  }
}
onMounted(fetchMenus);

</script>