<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
</template>
<script setup>
import { nextTick } from 'vue';

const menuStore=useMenuStore();
const cartStore=useCartStore();
async function fetchOrders(){
  try{
    await cartStore.fetchOrders();
  }catch(error){
    console.log('error fetching orders')
  }
}
async function fetchMenus(){
  try{
    await menuStore.fetchMenus();
  }catch (error){
    console.log('error fetching menus')
  }
}
onMounted(fetchMenus);
onMounted(fetchOrders);
</script>