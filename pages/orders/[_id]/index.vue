<script setup>
const route=useRoute();
const cartStore=useCartStore();
const { formatPrice } = usePriceFormatter();
const id = route.params._id;
const order = cartStore.orders.find((order)=>order._id===id) || null;
</script>
<template>
    <div class="container">
        <div class="row">{{'id: '+ order._id }}</div>
        <div class="row">{{'name: '+ order.name }}</div>
        <div class="row">{{'phone: '+ order.phone }}</div>
        <div class="row">{{'email: '+ order.email }}</div>
        <div class="row">{{ 'total: '+formatPrice(order.total) }}</div>
        <div class="row">{{'user: '+ order.user }}</div>
        <div class="row">{{'items: ' }}</div>
        <div v-for="item in order.items" :key="item._id">
            <div class="row">{{ item.name }}-{{ formatPrice(item.price) }}</div>
            <div v-for="ao in item.addOns">addons: {{ ao }}</div>
            <div v-for="r in item.removes">removes: {{ r }}</div>
            <div v-for="op in item.options">options: {{ op.choice }}</div>
            <div class="row">comments: {{ item.comments }}</div>
        </div>
        
        {{ order }}
    </div>
</template>
<style scoped>
.container{
    width: 100%;
}
.row{
    margin: 0 10px;
}
</style>