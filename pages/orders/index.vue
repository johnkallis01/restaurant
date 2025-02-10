<script setup>
useHead({
  title: "John's Restaurant - All Orders"
});
definePageMeta({middleware: ['admin','auth']});
const cartStore=useCartStore();
// const reverseOrders = computed(() => cartStore.orders.length ? [...cartStore.orders].reverse(): [])
const { formatPrice } = usePriceFormatter();
const ordersRef=ref(null);
const initalizeDropDown = ()=>{
    for(let i=0; i<cartStore.orders.length; i++){
        for(let j=0;j<cartStore.orders[i].items.length;j++){
            displayDropDown[`displayDropDown${i}${j}`]=false;
            dropdownRef.value[`displayDropDown${i}${j}`]=null;
        }
    }
}
onMounted(initalizeDropDown);
function viewOrder(id){navigateTo('/orders/'+id)}
function viewTodaySales(){navigateTo('/orders/dailysales')}
function viewWeekSales(){navigateTo('/orders/weeklySales')}
const getWidth = computed(() => {
    if(!cartStore.orders.length) return;
    let max = Math.max(...cartStore.orders.map(order => order?.items?.length));
    return `${(max * 125) + 354}px`;
})
const dropdownRef=ref({});
const displayDropDown=reactive({});
var openItem='';
var closeItem='';
function displayDetails(i,j){
    openItem.length ? closeItem=openItem : null;
    // console.log(closeItem)
    // console.log(openItem)
    openItem='displayDropDown'+i+j;
    displayDropDown['displayDropDown'+i+j]=true;
    // console.log('o',openItem)
    // console.log('c',closeItem)
}
const closeDropdown = (event) => {
    if (dropdownRef.value[closeItem] && !dropdownRef.value[closeItem].$el?.contains(event.target)){ 
        displayDropDown[closeItem]=false;
        closeItem===openItem ? openItem=closeItem='' : closeItem=openItem;
    } else closeItem=openItem;
}
useEventListener('click',closeDropdown);
async function fetchOrders(){
  try{
    await cartStore.fetchOrders();
  }catch(error){
    console.log('error fetching orders')
  }
}
onMounted(fetchOrders);
const {changeToLocal} = useLocalTime();
</script>
<template>
    <div class="page-container">
        <div class="container-title">
            <div class="title">All Orders</div>
            <div class="title-buttons">
                <button @click="viewTodaySales">daily graph</button>
                <button @click="viewWeekSales">weekly graph</button>
            </div>
            
            <!-- {{ changeToLocal('2025-01-01T00:08:51') }} -->
        </div>
        <div class="container-body" ref="ordersContainer">
            <div class="orders-container" ref="ordersRef" :style="{'width':getWidth}">
                <div class="orders" v-for="(order,i) in cartStore.orders" :key="order._id" v-if="cartStore.orders.length">
                    <div class="info" @click="viewOrder(order._id)">
                        <div class="date">{{ changeToLocal(order.createdAt.slice(0,19)) }}</div>
                        <div class="total">{{formatPrice(order.total) }}</div>
                        <div class="user-name">{{ order.name }}</div>
                       <div class="phone">{{ '('+order.phone.slice(0,3)+') '+
                            order.phone.slice(3,6)+'-'+order.phone.slice(6,10) }}</div>
                    </div>
                    <span class="order-items">
                        <div class="order-item"
                            :ref="(el) => dropdownRef['displayDropDown'+i+j] = el"
                            @click="displayDetails(i, j)" 
                            v-for="(item, j) in order.items" :key="j">
                                <DisplayItem class="dropdown" 
                                v-if="displayDropDown['displayDropDown'+i+j]"
                                :item="item"
                                />
                                {{ item.name }}
                        </div>
                    </span>
                </div>
                <div v-else>
                    Loading...
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.page-container{
    font-size: 12px;
}
.title{
    position: absolute;
    left: 0;
    font-size: 16px;
    margin: 0 20px;
}
.title-buttons{
    width: 60%;
}
.container-title button:hover{
    background-color: rgb(4, 81, 4);
    border-radius: 3px;
    cursor: pointer;
}
.container-body{
    cursor: default;
}
.dropdown{
    position: absolute;
    top: 100%;
    opacity: 1;
    z-index: 1000;
}
.orders-container{
    display: flex;
    flex-direction: column;
    position: relative;
    top: 0;
    left: 0;
}
.orders{
    display: flex;
    flex-direction: row;    
    height: 16px;
    position: relative;
    top: 10px;
    left: 10px;
    border: 1px solid black;
}
.date{
    position: absolute;
    left: 0px;
    width: 110px;
    padding: 0 2px;
    border-right: 1px solid black;
}
.total{
    width: 58px;
    white-space: nowrap;
    position: absolute;
    left: 117px;
    border-right: 1px solid black;
}
.user-name{
    position: absolute;
    left: 178px;
    width: 90px;
    overflow: hidden;
    white-space: nowrap;
    border-right: 1px solid black;
}
.phone{
    width: 85px;
    white-space: nowrap;
    position: absolute;
    left: 271px;
    height: 16px;
    text-align: start;
    border-right: 1px solid black;
}
.order-items{
    position: absolute;
    left: 357px;
    white-space: nowrap; 
}
.order-item{
    display: inline-flex;
    overflow: hidden;
    height: 16px;
    width: 120px;
    padding: 0 2px;
    text-wrap: nowrap;
    border-right: 1px solid black;
}
@media(max-width: 600px){
    .title-buttons{
        margin-left: 60px;
        width: 200px;
    }
}
</style>