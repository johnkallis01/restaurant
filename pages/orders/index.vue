<script setup>
import { reactive } from 'vue';

useHead({
  title: "John's Restaurant - All Orders"
});
definePageMeta({middleware: ['admin','auth']});
const cartStore=useCartStore();
const reverseOrders = [...cartStore.orders].reverse();
const { formatPrice } = usePriceFormatter();
const ordersRef=ref(null);


function viewOrder(id){
    navigateTo('/orders/'+id)
}
const updateWidth=async()=>{
    await nextTick();
    if(!ordersRef.value) return;
    if(!cartStore.orders.length) return;
    let max = Math.max(...cartStore.orders.map(order => order.items.length));
    // ordersContainer.value.style.width = `${(max * 120) + 365}px`;
    ordersRef.value.style.width = `${(max * 120) + 355}px`;
}
const dropdownRef=ref({});
const displayDropDown=reactive({});
onMounted(updateWidth);
onMounted(() => {
    for(let i=0; i<reverseOrders.length; i++){
        for(let j=0;j<reverseOrders[i].items.length;j++){
            displayDropDown[`displayDropDown${i}${j}`]=false;
            dropdownRef.value[`displayDropDown${i}${j}`]=null;
            // console.log(dropdownRef.value)
        }
        
    }
})
var openItem='';
var closeItem='';
function displayDetails(i,j){
    if(openItem.length){ closeItem=openItem;console.log('triged')}
    console.log(closeItem)
    console.log(openItem)
    openItem='displayDropDown'+i+j;
    displayDropDown['displayDropDown'+i+j]=true;
    // console.log('o',openItem)
    // console.log('c',closeItem)
}
const closeDropdown = (event) => {
    console.log('o',openItem)
    console.log('c',closeItem)
    console.log(event.target)
    if (dropdownRef.value[closeItem] && !dropdownRef.value[closeItem].$el?.contains(event.target)){ 
        console.log('x')
        displayDropDown[closeItem]=false;
        closeItem===openItem ? openItem=closeItem='' : closeItem=openItem;
        console.log(closeItem)
    } else closeItem=openItem;
}
useEventListener('click',closeDropdown);
</script>
<template>
   <div class="orders-page" ref="ordersContainer">
        <div class="orders-page-title">All Orders</div>
        <div class="orders-container" ref="ordersRef" id="orders">
            <div class="orders" v-for="(order,i) in reverseOrders" :key="order._id">
                <div class="info" @click="viewOrder(order._id)">
                    <div class="date">{{ order.createdAt.slice(5,10)+'-'+order.createdAt.slice(0,4) }}</div>
                    <div class="time">{{ order.createdAt.slice(11,19) }}</div>
                    <div class="total">{{formatPrice(order.total) }}</div>
                    <div class="user-name123">{{ order.name }}
                        <span class="tooltip">{{ order.name }}</span>
                    </div>
                    <div class="phone">{{ '('+order.phone.slice(0,3)+') '+
                        order.phone.slice(3,6)+'-'+order.phone.slice(6,10) }}</div>
                </div>
                <div class="order-items">
                    <div class="order-item" :ref="(el) => dropdownRef['displayDropDown'+i+j] = el"
                        @click="displayDetails(i, j)" 
                        v-for="(item, j) in order.items" :key="j">
                        <div>
                            <DisplayItem class="dropdown" 
                            v-if="displayDropDown['displayDropDown'+i+j]"
                            :item="item"
                            />
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>
<style scoped>
.info{
    
}
.dropdown{
    position: absolute;
    top: 100%;
    opacity: 1;
    z-index: 1000;
}
.orders-page{
    width: 96vw;
    font-size: 12px;
    height: 90vh;
    cursor: default;
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
    position: absolute;
    width: 70px;
    text-align: start;
    padding: 0 2px;
    border-left: 1px solid black;
    border-right: 1px solid black;
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
.user-name123{
    width: 90px;
    white-space: nowrap;
    text-align: start;
    overflow: hidden;
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
    right: 100px;
}
.user-name123:hover .tooltip{
    opacity: 1;
    visibility: visible;
    overflow: visible;
    z-index: 1000;
    top: 0;
    left: 0px;
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