<script setup>
const cartStore=useCartStore();
let now = new Date();
const day=ref(now.getDate());
const month = ref(now.getMonth()+1);
const months=ref(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
const {changeToLocal} = useLocalTime();
const todaySales = computed(() => {
    return cartStore.orders.filter(order => {
        let localTime = changeToLocal(order.createdAt);
        String(month.value).length===1 ? month.value='0'+month.value : null;
        String(day.value).length===1 ? day.value='0'+day.value : null;
        return localTime.substring(20,22) === month.value && localTime.substring(23,25) === day.value;
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
})
</script>
<template>
    <div class="page-container">
        <Graph :items="itemsMap"/>
    </div>
</template>
<style scoped>
.page-container{
    width: 100%;
    height: 100%;
    align-content: end;
}
</style>