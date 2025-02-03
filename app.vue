<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
</template>
<script setup>
const menuStore=useMenuStore();
const cartStore=useCartStore();
async function fetchOrders(){
  try{
    await cartStore.fetchOrders();
  }catch(error){
    console.log('error fetching orders')
  }
}
async function fetchMenus(){
  try{
    await menuStore.fetchMenus();
  }catch (error){
    console.log('error fetching menus')
  }
}
onMounted(fetchMenus);
onMounted(fetchOrders);
// onMounted(addOrders());
// function addOrders(){
//   console.log('1')
//   let names=[
//     {name: 'dylan, bob', phone: '5671236789', email: 'highway61@revisted.edu'},
//     {name: 'van zandt, townes', phone: '3334445555', email: 'lungs@songs.com'},
//     {name: 'kenobi,obiwan', phone: '1234567891',email: 'kenobi@temple.jedi'},
//     {name: 'jinn,quigon', phone: '1234567891',email: 'qjinn@temple.jedi'},
//     {name: 'skywalker,anikan', phone: '1234567891',email: 'jediMaster@temple.jedi'},
//     {name: 'skywalker,luke', phone: '1234567891',email: 'master@temple.jedi'},
//     {name: 'palpatine,sheev', phone: '1234567891',email: 'yodaSeeker@senete.sith'},
//     {name: 'maul,darth', phone: '1234567891',email: 'kenobiHater@sith.com'}
//   ]
//   for(let i=0; i< names.length; i++){
//     cartStore.orders.forEach(o=>{
//       cartStore.submitOrder({
//         name: names[i].name,
//         phone: names[i].phone,
//         email: names[i].email,
//         total: o.total,
//         items: o.items
//       })
//     })
//   }
// }
</script>