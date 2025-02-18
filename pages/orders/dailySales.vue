<script setup>
definePageMeta({middleware: ['admin','auth']});
useHead({
  title: "John's Restaurant - Daily Sales"
});
const cartStore=useCartStore();
var now = new Date();
const day=ref(now.getDate());
const month = ref(now.getMonth()+1);
const year = ref(now.getFullYear())
const months=ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
const salesTotal=ref(0);
const localOrders = ref();
// const todaySales = computed(() => {
//     salesTotal.value=0;
//     return cartStore.orders.filter(order => {
//         let localTime = changeToLocal(order.createdAt);
//         String(month.value).length===1 ? month.value='0'+month.value : null;
//         String(day.value).length===1 ? day.value='0'+day.value : null;
//         if(localTime.substring(20,22) === month.value && localTime.substring(23,25) === day.value){
//             salesTotal.value+=order.total;
//             return order;
//         }
//     });
// // });
const itemsMap=computed(()=>{
    const items = new Map();
    salesTotal.value=0;
    localOrders.value?.forEach(order=>{
        salesTotal.value+=order.total;
        order.items.forEach(item=>{
            if(items.has(item.name)) items.set(item.name, items.get(item.name)+1);
            else items.set(item.name, 1);
        })
    });
    return items;
});
//query orders for today's date
async function fetchOrders(){
    const utcEnd = now.toISOString();
    const utcStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).toISOString();
    try{
        localOrders.value = await cartStore.fetchOrdersByDate(utcStart,utcEnd);
    }catch(error){
        console.log('error fetching orders')
    }
}

onBeforeMount(fetchOrders);
</script>
<template>
    <div class="page-container">
        <ClientOnly>
            <template v-if="localOrders?.length">
                <Graph :items="itemsMap" :title="'Sales for '+months[month-1]+' '+day+' ' +year+' Total: $'+salesTotal.toFixed(2)"/>
            </template>
        </ClientOnly> 
    </div>
</template>