<script setup>
useHead({
  title: "John's Restaurant - All Orders"
});
definePageMeta({middleware: ['admin','auth']});
const cartStore=useCartStore();
const reverseOrders = computed(() => [...cartStore.orders].reverse())
const { formatPrice } = usePriceFormatter();
const ordersRef=ref(null);
const initalizeDropDown = ()=>{
    for(let i=0; i<reverseOrders.length; i++){
        for(let j=0;j<reverseOrders[i].items.length;j++){
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
    let max = Math.max(...cartStore.orders.map(order => order.items.length));
    return `${(max * 120) + 365}px`;
})
const dropdownRef=ref({}); const displayDropDown=reactive({});
var openItem=''; var closeItem='';
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
    <div>
        <div class="orders-page-title">
            <span>All Orders</span>
                <button class="link" @click="viewTodaySales">daily graph</button>
                <button class="link" @click="viewWeekSales">weekly graph</button>
            <!-- {{ changeToLocal('2025-01-01T00:08:51') }} -->
        </div>
        <div class="orders-page" ref="ordersContainer">
                <div class="orders-container" ref="ordersRef" :style="{'width':getWidth}">
                    <div class="orders" v-for="(order,i) in reverseOrders" :key="order._id" v-if="reverseOrders">
                        <div class="info" @click="viewOrder(order._id)">
                            
                            <!-- <div class="time">{{ order.createdAt.slice(11,19) }}</div> -->
                            <div class="date">{{ changeToLocal(order.createdAt.slice(0,19)) }}</div>
                            <!-- <div class="date">{{ order.createdAt.slice(5,10)+'-'+order.createdAt.slice(0,4) }}</div> -->
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
                    <div v-else>
                        Loading...
                    </div>
                </div>
        </div>
    </div>
</template>
<style scoped>
.link{
    color: white;
    border-bottom: 1px solid white;
    margin: 0 8px;
}
.link:hover{
    background-color: rgb(6, 100, 6);
}
.dropdown{
    position: absolute;
    top: 100%;
    opacity: 1;
    z-index: 1000;
}
.orders-page{
    height: 82vh;
    position: relative;
    top: 4vh;
    width: 96vw;
    font-size: 12px;
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
    z-index: 1;
    height: 8vh;
}
.orders-container{
    display: flex;
    flex-direction: column;
    position: relative;
    top: 0vh;
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
    left: 0px;
    width: 120px;
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
}
.total{
    width: 65px;
    white-space: nowrap;
    position: absolute;
    left: 120px;
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
    left: 184px;
    border-right: 1px solid black;
}
.phone{
    width: 88px;
    white-space: nowrap;
    position: absolute;
    left: 275px;
    text-align: start;
    padding: 0 2px;
    border-right: 1px solid black;
}
.order-items{
    position: absolute;
    left: 365px;
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