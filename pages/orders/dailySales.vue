<script setup>
definePageMeta({middleware: ['admin','auth']});
useHead({
  title: "John's Restaurant - Daily Sales"
});
const cartStore=useCartStore();
let now = new Date();
const day=ref(now.getDate());
const month = ref(now.getMonth()+1);
const year = ref(now.getFullYear())
const months=ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
const {changeToLocal} = useLocalTime();
const salesTotal=ref(0);
const todaySales = computed(() => {
    salesTotal.value=0;
    return cartStore.orders.filter(order => {
        let localTime = changeToLocal(order.createdAt);
        String(month.value).length===1 ? month.value='0'+month.value : null;
        String(day.value).length===1 ? day.value='0'+day.value : null;
        if(localTime.substring(20,22) === month.value && localTime.substring(23,25) === day.value){
            salesTotal.value+=order.total;
            return order;
        }
    });
});
const itemsMap=computed(()=>{
    const items = new Map();
    todaySales.value.forEach(order=>{
        order.items.forEach(item=>{
            if(items.has(item.name)) items.set(item.name, items.get(item.name)+1)
            else items.set(item.name, 1)
        })
    })
    return items;
});
async function fetchOrders(){
  try{
    await cartStore.fetchOrders();
  }catch(error){
    console.log('error fetching orders')
  }
}
onBeforeMount(cartStore.removeOrders);
onMounted(fetchOrders);
onBeforeUnmount(cartStore.removeOrders);
</script>
<template>
    <div class="graph-page">
        <ClientOnly>
            <Graph :items="itemsMap" :title="'Sales for '+months[month-1]+' '+day+' ' +year+' Total: $'+salesTotal.toFixed(2)"/>
        </ClientOnly>
    </div>
</template>