<script setup>
const cartStore=useCartStore();
let now = new Date();
const day=ref(now.getDate());
const month = ref(now.getMonth()+1);
const year = ref(now.getFullYear());
const months=ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
const {changeToLocal} = useLocalTime();
const salesTotal=ref(0);
const thisWeekSales = computed(() => {
    salesTotal.value=0;
    return cartStore.orders.filter(order => {
        let dayofWeek=now.getDay();
        
        let localTime = changeToLocal(order.createdAt);
        // let localTime='2025-01-01T00:08:51'
        String(month.value).length===1 ? month.value='0'+month.value : null;
        let index=0;
        while(6 >= index){
            console.log('string',localTime.substring(23,25))
            console.log('dow1',dayofWeek)
            let weekday = day.value-index;
            console.log('wd',weekday)
            String(weekday).length===1 ? weekday='0'+weekday : null;
            
            if(weekday>0){
                if(localTime.substring(20,22) === month.value && localTime.substring(23,25) === String(weekday)){
                    salesTotal.value+=order.total;
                    return order;
                }
            }else{
                let theMonth = now.getMonth()+1;
                theMonth=Number(theMonth)-1;
                if(theMonth < 1){
                    year.value=Number(year.value)-1;
                    theMonth=12;
                }
                let lastDayOfMonth = new Date(year.value, theMonth, 0).getDate();
                lastDayOfMonth+=weekday;
                return localTime.substring(20,22) === theMonth && localTime.substring(23,25) === String(lastDayOfMonth)
            }
            index+=1;
        }
    });
});
const itemsMap=computed(()=>{
    const items = new Map();
    thisWeekSales.value.forEach(order=>{
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
onMounted(fetchOrders);
</script>
<template>
    <div class="graph-page">
        <Graph :items="itemsMap" :title="'Sales for '+months[month-1]+' '+(day-now.getDay())+'-'+day+' ' +year+' Total: $'+salesTotal.toFixed(2)" :weekly="true"/>
    </div>
</template>
<style scoped>
.graph-page{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    position: absolute;
    top: 0;
}
</style>