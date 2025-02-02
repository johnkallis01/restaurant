<script setup>
useHead({
  title: "John's Restaurant - All Orders"
});
definePageMeta({middleware: ['admin','auth']});
const cartStore=useCartStore();
onMounted(async () => {
  try {
    await cartStore.fetchOrders();
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
});
</script>
<template>
   <div class="page-container">
        <div class="container-title">all orders</div>
        <div class="orders-container">
            <div class="orders" v-for="order in cartStore.orders">
                <span v-for="item in order.items">{{ item.name }}</span>
            </div>
        </div>
   </div>
</template>
<style scoped>
.orders-container{
    border: 2px solid red;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    top: 10vh;
    left: 0vw;
    height: 100%;
    width: 100%;
    padding: 10px;
}
.orders{
    display: flex;
    justify-content: flex-start;
}
</style>