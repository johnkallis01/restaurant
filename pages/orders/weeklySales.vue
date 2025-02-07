<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';

const cartStore=useCartStore();
let now = new Date();
const day=ref(now.getDate());
const dow=ref(now.getDay());
const firstDay=ref(0);
const firstMonth=ref(0);
const firstYear=ref(0);
const firstString=ref('')
const month = ref(now.getMonth()+1);
const year = ref(now.getFullYear());
const months=ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
const {changeToLocal} = useLocalTime();
const salesTotal=ref(0);
const thisWeekSales = computed(() => {
    salesTotal.value=0;
    return cartStore.orders.filter(order => {
        const dayofWeek=now.getDay();
        let localTime = changeToLocal(order.createdAt);
        // let localTime='2025-01-01T00:08:51'
        String(month.value).length===1 ? month.value='0'+month.value : null;
        let index=0;
        while(dayofWeek >=index){
            let firstDayOfWeek = day.value-dayofWeek+index; //could be negative          
            if(firstDayOfWeek>0){
                !firstMonth.value?firstMonth.value=month.value:null;
                String(firstDayOfWeek).length===1 ? firstDayOfWeek='0'+firstDayOfWeek : null;
                !firstDay.value ? firstDay.value=firstDayOfWeek : null;
                if(localTime.substring(20,22) === month.value && localTime.substring(23,25) === String(firstDayOfWeek)){
                    salesTotal.value+=order.total;
                    return order;
                }
            }else{
                firstMonth.value = now.getMonth(); //month jan=1
                if(firstMonth.value===0){//if first week of january change year and month to dec
                    firstMonth.value=12;
                    firstYear.value=year.value-1;
                }
                !firstMonth.value?firstMonth.value=month.value:null;
                let lastDayOfMonth = new Date(firstYear.value, firstMonth.value-1, 0).getDate(); 
                lastDayOfMonth+=firstDayOfWeek; //add the negative first day of the week to the last day of month
                !firstDay.value ? firstDay.value=lastDayOfMonth : null; 
                String(firstMonth.value).length===1 ? '0'+firstMonth.value:null;
                return localTime.substring(20,22) === firstMonth.value && localTime.substring(23,25) === String(lastDayOfMonth)
            }
            !firstYear.value ? firstYear.value=year.value : null;
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
onBeforeMount(cartStore.removeOrders)
onMounted(fetchOrders);
onBeforeUnmount(cartStore.removeOrders)
</script>
<template>
    <div class="graph-page">
        <ClientOnly>
            <Graph :items="itemsMap" :title="'Sales for '+(months[firstMonth-1] ?months[firstMonth-1]:'month') +'/'+(Number(firstDay)?Number(firstDay):'day')+'/'+(firstYear?firstYear:'year')+' - '
                +months[month-1]+'/'+day+'/' +year+' Total: $'+salesTotal.toFixed(2)" :weekly="true"/>
        </ClientOnly>
    </div>
</template>