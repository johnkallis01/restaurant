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
    <div class="container">
        <div class="row">{{'id: '+ order._id }}</div>
        <div class="row">{{'createdAt: '+ changeToLocal(order.createdAt.slice(0,order.createdAt.length-1)) }}</div>
        <div class="row">{{'name: '+ order.name }}</div>
        <div class="row">{{'phone: '+ order.phone }}</div>
        <div class="row">{{'email: '+ order.email }}</div>
        <div class="row">{{ 'total: '+formatPrice(order.total) }}</div>
        <div class="row">{{'user: '+ order.user }}</div>
        <div class="row">{{'items: ' }}</div>
        <div v-for="item in order.items" :key="item._id" class="items">
            <div class="item">
                <DisplayItem :item="item"/>
            </div>
            
        </div>
    </div>
</template>
<style scoped>
.container{
    width: 100%;
}
.row{
    margin: 0 10px;
}
.items{
    display: flex;
    justify-content: center;
}
.item{
    
    width: 50%;
}
</style>