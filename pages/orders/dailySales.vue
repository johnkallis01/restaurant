<script setup>
const cartStore=useCartStore();
const orders=reactive(cartStore.orders);
const date = new Date().toUTCString();
const month = date.slice(8,11); //utc month
const day = date.slice(5,7)//utc day
const months = {Jan: '01', Feb: '02', Mar:'03', Apr:'04',May:'05', Jun: '06', Jul: '07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12' };
// const month = today.getMonth().toUTCString()
const todaySales = computed(() => {
    return cartStore.orders.filter(order => {
        return order.createdAt.slice(5, 7) === months[month] && order.createdAt.slice(8, 10) === day;
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
    <div class="container">
        <div class="names">
            <div v-for="([item, count], i) in itemsMap" class="graphs">
                <div>
                    <div class="bars" :style="{'height': count*2 +'px'}">{{ count }}</div>
                    <div class="item-name">{{ item }}</div> 
                </div>
                
            </div>
        </div>
    </div>
</template>
<style scoped>
.container{
    width: 100%;
    border-radius: 0;
    height: 100%;
    justify-content: end;
}
.names{
    display: flex;
    align-content: center;
    flex-direction: row;
    gap: 5px;
    margin: 10px;
    position: relative;
    height: 90%;
}
.graphs{
    display: flex;;
    gap: 10px;
    width: 50px;
}
.bars{
    background-color: blue;
    height: 10px;
    gap: 5px;
    margin: 5px;
    width: 30px;
    position: absolute;
    bottom: 25%;
    text-align: center;
    align-items: center;
}
.item-name{
    display: flex;
    justify-content: flex-start;
    writing-mode: vertical-rl;
    width: 30px;
    text-align: center;
    margin: 5px;
    height: 20%;
    overflow: hidden;
    position: absolute;
    bottom: 0;
}
</style>