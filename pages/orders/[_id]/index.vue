<script setup>
definePageMeta({middleware: ['admin','auth']});
const {changeToLocal} = useLocalTime();
const route=useRoute();
const cartStore=useCartStore();
const { formatPrice } = usePriceFormatter();
const id = route.params._id;
const order = cartStore.orders.find((order)=>order._id===id) || null;
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
            <div  class="items">
                <DisplayItem :item="item" v-for="item in order.items" :key="item._id"/>
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
    grid-template-columns: 250px 250px 250px;
    gap: 10px;
    margin-left: 30px;
}
@media(max-width: 600px){
    .items{
        grid-template-columns: 300px;
    }
}
</style>