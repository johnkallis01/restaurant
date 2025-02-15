<script setup>
import { onBeforeUnmount } from 'vue';

definePageMeta({middleware: ['admin','auth']});
const {changeToLocal} = useLocalTime();
const route=useRoute();
const router=useRouter();
// const cartStore=useCartStore();
const { formatPrice } = usePriceFormatter();
const order = ref(null);
const loading = ref(true);
const id =route.params._id;
const fetchOrder = async() => {
    if (!id) {
        error.value = "No order ID found.";
        
        return;
    }
    loading.value = false;
    console.log(id)
    const response = await fetch('/api/order/'+id,{method: 'GET'});
    if(!response.ok) throw new Error('error from api/orders');
    order.value = await response.json();
    
    
}
// const order = computed(()=>cartStore.orders.find((order)=>order?._id===id));//ref(); 
const itemsRef=ref([]);
const sectionItemsRef=ref();
const itemHeight=ref([])
const setItemHeights=() => {
    if(!itemsRef.value.length) return;
    let rowLength;
    if(sectionItemsRef.value){
        let sectionElStyle=window.getComputedStyle(sectionItemsRef.value);
        let gridTemplate = sectionElStyle.getPropertyValue('grid-template-columns')
        gridTemplate=gridTemplate.split(' ');
        rowLength=gridTemplate.length;
    }
    if (!gridTemplate || gridTemplate.length === 0) return;
    let items = itemsRef.value.map(el => el?.$el?.offsetHeight || 0);
    let rows=[];
    for(let i=0; i< items.length; i+=rowLength){ 
        rows.push(items?.slice(i, i+rowLength))
    }
    itemHeight.value = rows.flatMap(row=>{
        let tallest=Math.max(...row);
        return row.map(()=>tallest);
    })  
}
const windowWidth = ref(window?.innerWidth);
const updateWidth = () => { windowWidth.value = window?.innerWidth;};
onMounted(() => {
    nextTick(setItemHeights);
    window.addEventListener("resize", updateWidth);
    window.addEventListener("orientationchange", updateWidth);
    window.addEventListener("change", updateWidth);
});
onMounted(async () => {
  if (!id) {
    router.push('/orders'); // Redirect if no ID is found
    return;
  }
  await fetchOrder();
});
onBeforeUnmount(() => {
    localStorage.setItem('order_id', route.params._id)
});
onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
    window.removeEventListener("orientationchange", updateWidth);
    window.removeEventListener("change", updateWidth);
});
watch(windowWidth, () => {
    itemHeight.value=[]
    nextTick(setItemHeights);
});
</script>
<template>
    <div>
        <div class="page-container" v-if="loading">Loading order...</div>
            <div class="page-container" v-else>
            <div class="container-title">
                <div class="title-text">{{'Order :  '+ order?._id }}</div>
            </div>
            <div class="container-body">
                <div class="row">{{'createdAt: '+(order && order.createdAt ? changeToLocal(order.createdAt.slice(0,order.createdAt.length-1)) : '') }}</div>
                <div class="row">{{'name: '+ order?.name }}</div>
                <div class="row">{{'phone: '+ order?.phone }}</div>
                <div class="row">{{'email: '+ order?.email }}</div>
                <div class="row">{{ 'total: '+formatPrice(order?.total) }}</div>
                <div class="row">{{'user: '+ order?.user }}</div>
                <div class="row">{{'items: ' }}</div>
                <div  class="section-items" ref="sectionItemsRef">
                    <DisplayItem ref="itemsRef" :item="item" v-for="(item,i) in order?.items" :key="item._id" 
                            :height="itemHeight[i]"
                
                    /> <!-- :style="{height: itemHeight[i] }" -->
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.container-body{
    padding-bottom: 20px;
}
.container-title{
    justify-content: flex-start;
    background-color: grey;
}
.title-text{
    padding: 0 10px;
}
.row{
    padding: 0 20px;
}
.items{
    display: grid;
    grid-template-columns: 250px 250px 250px 250px;
    gap: 10px;
    margin-left: 30px;
}
@media(max-width: 1200px){
    .items{
        grid-template-columns: 300px 300px 300px 300px;
    }
}
@media(max-width: 600px){
    .items{
        grid-template-columns: 300px;
    }
}
@media(max-width: 1100px){
  .section-items{
    padding-left: 40px;
  }
}
@media(max-width: 1400px){
  .section-items{
    padding-left: 40px;
  }
}
</style>