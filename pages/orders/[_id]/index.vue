<script setup>
definePageMeta({middleware: ['admin','auth']});
const {changeToLocal} = useLocalTime();
const route=useRoute();
const cartStore=useCartStore();
const { formatPrice } = usePriceFormatter();
const id = route.params._id;
const order = cartStore.orders.find((order)=>order._id===id) || null;
const itemsRef=ref([]);
const itemHeight=ref([])
const setItemHeights=() => {
    if(!itemsRef.value.length) return;
    let screenWidth=window?.innerWidth;
    let rowLength;
    if(screenWidth<600) rowLength=1;
    else if(screenWidth<800) rowLength=2;
    else if(screenWidth<1100) rowLength=3;
    else rowLength=4;
    let items = itemsRef.value.map(el => el?.$el?.offsetHeight || 0);
    let rows=[];
    for(let i=0; i< items.length; i+=rowLength){ 
        rows.push(items.slice(i, i+rowLength))
    }
    itemHeight.value = rows.flatMap(row=>{
        let tallest =Math.max(...row);
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
onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
    window.removeEventListener("orientationchange", updateWidth);
    window.removeEventListener("change", updateWidth);
});
watch(windowWidth, () => {
    nextTick(setItemHeights);
});
</script>
<template>
    <div class="page-container">
        <div class="container-title">
            <div class="title-text">{{'Order :  '+ order._id }}</div>
        </div>
        <div class="container-body">
            <div class="row">{{'createdAt: '+ changeToLocal(order.createdAt.slice(0,order.createdAt.length-1)) }}</div>
            <div class="row">{{'name: '+ order.name }}</div>
            <div class="row">{{'phone: '+ order.phone }}</div>
            <div class="row">{{'email: '+ order.email }}</div>
            <div class="row">{{ 'total: '+formatPrice(order.total) }}</div>
            <div class="row">{{'user: '+ order.user }}</div>
            <div class="row">{{'items: ' }}</div>
            <div  class="section-items" ref="itemsRef">
                <DisplayItem ref="itemsRef" :item="item" v-for="(item,i) in order.items" :key="item._id" 
                        :height="itemHeight[i]"
               
                /> <!-- :style="{height: itemHeight[i] }" -->
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
</style>