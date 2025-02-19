<script setup>
definePageMeta({middleware: ['admin','auth']});
useHead({
  title: "John's Restaurant - Weekly Sales"
});
const cartStore=useCartStore();
const salesTotal=ref(0);
let now = new Date();
const day=ref(now.getDate());
const month = ref(now.getMonth()+1);
const year = ref(now.getFullYear());
const localOrders=ref();
const dow=now.getDay();
const firstDay=ref(day.value-dow);
const firstMonth=ref(0);
const firstYear=ref(0);
const firstString=ref('');
const months=ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
const itemsMap=computed(()=>{
    const items = new Map();
    salesTotal.value=0;
    localOrders.value?.forEach(order=>{
      salesTotal.value+=order.total;
        order.items.forEach(item=>{
            if(items.has(item.name)) items.set(item.name, items.get(item.name)+1)
            else items.set(item.name, 1)
        })
    })
    return items;
});
async function fetchOrders(){
  const utcEnd = now.toISOString();
  if(firstDay.value>0){
    firstMonth.value=month.value;
    firstYear.value=year.value;
  }else{//month changes
    firstMonth.value = now.getMonth(); //month jan=1
    console.log(firstMonth.value)
    if(firstMonth.value===1){//if first week of january change month to dec and year to prev
        firstMonth.value=12;
        firstYear.value=year.value-1;
    }else firstMonth.value-=1;
    let lastDayOfMonth = new Date(firstYear.value, firstMonth.value, 0).getDate(); 
    firstDay.value+=lastDayOfMonth; //add the negative first day of the week to the last day of month
  }
  const utcStart = new Date(firstYear.value, firstMonth.value-1, firstDay.value, 0, 0, 0, 0).toISOString();
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
            <Graph :items="itemsMap" :title="'Sales for '+months[firstMonth-1] +'/'+firstDay+'/'+firstYear+' - '
                +months[month-1]+'/'+day+'/' +year+' Total: $'+salesTotal.toFixed(2)" :weekly="true"/>
          </template>
        </ClientOnly>
    </div>
</template>
<style scoped>
@media(max-width: 450px){
  .page-container{
    width: 105vw;
  }
}
</style>