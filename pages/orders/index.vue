<script setup>
import { onBeforeMount } from 'vue';

useHead({
  title: "John's Restaurant - All Orders"
});
definePageMeta({middleware: ['admin','auth']});
const cartStore=useCartStore();
const ordersRef=ref(null);

const findWidth=computed(() => {
    
})
onMounted(async () => {
    try {
        await cartStore.fetchOrders();
    } catch (error) {
        console.error("Failed to fetch orders:", error);
    }
    let max=0;
    const orderEl=document.getElementById('orders');
    cartStore.orders.forEach((order)=>{
        order.items.length > max ? max=order.items.length : null
    })
    orderEl.style.width=String((max)*120 +355)+'px';
    console.log(max)
});
</script>
<template>
   <div class="orders-page">
        <div class="orders-page-title">All Orders</div>
        <div class="orders-container" ref="ordersRef" id="orders">
            <button class="orders" 
                @click="viewOrder"
                v-for="order in cartStore.orders.reverse()" :key="order._id">
                <div class="date">{{ order.createdAt.slice(5,10)+'-'+order.createdAt.slice(0,4) }}</div>
                <div class="time">{{ order.createdAt.slice(11,19) }}</div>
                <div class="total">{{'$'+ order.total }}</div>
                <div class="name">{{ order.name }}
                    <span class="tooltip">{{ order.name }}</span>
                </div>
                <div class="phone">{{ '('+order.phone.slice(0,3)+') '+
                    order.phone.slice(3,6)+'-'+order.phone.slice(6,10) }}</div>
                <div class="order-items">
                    <div class="order-item" v-for="(item, i) in order.items" :key="i" :id="'item'+i">
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
    z-index: 9;
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
    border-right: 1px solid black;
    width: 70px;
    text-align: start;
    padding: 0 2px;
}
.time{
    border-right: 1px solid black;
    width: 55px;
    text-align: start;
    padding: 0 2px;
    position: absolute;
    left: 70px;
}
.total{
    width: 50px;
    white-space: nowrap;
    position: absolute;
    left: 125px;
    text-align: start;
    padding: 0 2px;
    border-right: 1px solid black;
}
.name{
    width: 90px;
    white-space: nowrap;
    text-align: start;
    padding: 0 2px;
    position: absolute;
    left: 175px;
    border-right: 1px solid black;
    
}
.phone{
    width: 90px;
    white-space: nowrap;
    position: absolute;
    left: 265px;
    text-align: start;
    padding: 0 2px;
    border-right: 1px solid black;
}
.order-items{
    position: absolute;
    left: 355px;
    white-space: nowrap; 
}
.order-item:hover .tooltip{
    opacity: 1;
    visibility: visible;
}
.name:hover .tooltip{
    opacity: 1;
    visibility: visible;
}
.order-item{
    display: inline-flex;
    overflow: hidden;
    height: 20px;
    width: 120px;
    text-wrap: nowrap;
    padding: 1px;
    border-right: 1px solid black;
}
</style>