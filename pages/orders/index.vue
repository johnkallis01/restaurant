<script setup>
useHead({
  title: "John's Restaurant - All Orders"
});
definePageMeta({middleware: ['admin','auth']});
const cartStore=useCartStore();
const ordersRef=ref(null);
onMounted(async () => {
  try {
    await cartStore.fetchOrders();
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
});
onMounted(() => {
    let max=0;
    cartStore.orders.forEach(order=> order.items.length > max ? max=order.items.length : null)
    console.log(max)
    console.log(ordersRef.value)
    ordersRef.value.style.width=String(max*120 +380)+'px';
})
</script>
<template>
   <div class="orders-page">
        <div class="orders-page-title">all orders</div>
        <div class="orders-container" ref="ordersRef">
            <button class="orders" 
                @click="viewOrder"
                v-for="order in cartStore.orders" :key="order._id">
                <div class="date">{{ order.createdAt.slice(5,10)+'-'+order.createdAt.slice(0,4) }}</div>
                <div class="time">{{ order.createdAt.slice(11,19) }}</div>
                <div class="total">{{'$'+ order.total }}</div>
                <div class="name">{{ order.name }}</div>
                <div class="phone">{{ '('+order.phone.slice(0,3)+') '+
                    order.phone.slice(3,6)+'-'+order.phone.slice(6,10) }}</div>
                <div class="order-items">
                    <div class="order-item" v-for="(item, i) in order.items" :key="i">
                        {{ item.name }}
                        <span class="tooltip">{{ item.name }}</span>
                    </div>
                </div>
            </button>
        </div>
   </div>
</template>
<style scoped>
.orders-page{
    width: 96vw;
    font-size: 12px;
    height: 90vh;
    overflow: auto;
    background-color: azure;
}
.orders-page-title{
    position: fixed;
    top: 10vh;
    left: 2vw;
    width: 96vw;
    padding: 4px;
    font-size: 20px;
    background: green;
    color: white;
    z-index: 10;
    height: 8vh;
}
.orders-container{
    display: flex;
    flex-direction: column;
    position: relative;
    top: 8vh;
    left: 0;
    padding: 10px;
}
.orders{
    display: flex;
    flex-direction: row;    
    height: 20px;
    border: 1px solid black;
    position: relative;
    width: inherit;
}
.date{
    border-left: 1px solid black;
    width: 80px;
}
.time{
    border-left: 1px solid black;
    width: 60px;
}
.total{
    margin-right: 5px;
    width: 50px;
    white-space: nowrap;
    position: absolute;
    left: 140px;
    border-left: 1px solid black;
}
.name{
    margin: 0 5px 0 3px;
    width: 90px;
    white-space: nowrap;
    position: absolute;
    left: 190px;
    border-left: 1px solid black;
}

.phone{
    width: 90px;
    white-space: nowrap;
    position: absolute;
    left: 280px;
    border-left: 1px solid black;
}
.order-items{
    position: absolute;
    left: 370px;
    white-space: nowrap;
    
}
.order-item:hover .tooltip{
    opacity: 1;
    visibility: visible;
}
.order-item{
    cursor: default;
    display: inline-flex;
    margin-right: 2px;
    overflow: hidden;
    height: 20px;
    width: 120px;
    text-wrap: nowrap;
    padding: 1px;
    border-left: 1px solid black;
}
</style>