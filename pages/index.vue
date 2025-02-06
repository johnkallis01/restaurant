<script setup>
import { nextTick } from 'vue';

useHead({
  title: "John's Restaurant - Home"
});

const title=ref("John's Restaurant");
const info=ref(['Phone: 667-940-8868','johnkallis01@gmail.com']);
let now = new Date();
const today = ref({
  day: now.getDay(),
  hour: now.getHours(),
  min: now.getMinutes(),
});
const menuStore=useMenuStore();
const cartStore=useCartStore();
const todayMenus = computed(()=>{
  return menuStore.menus.filter((menu)=>{
    return menu.days.some((day)=> day.day.position === today.value.day && day.open)
  });
});
const nowMenus = computed(() => {
  return todayMenus.value.filter((menu) => {
    return menu.days.some((day)=>{
      return (
        (day.start.hour < today.value.hour || (day.start.hour === today.value.hour && day.start.min <= today.value.min))
            &&
        (day.end.hour > today.value.hour || (day.end.hour === today.value.hour && day.end.min > today.value.min)))})})
});
var names=[
  {name: 'dylan, bob', phone: '5671236789', email: 'highway61@revisted.edu'},
  {name: 'van zandt, townes', phone: '3334445555', email: 'lungs@songs.com'},
  {name: 'kenobi,obiwan', phone: '1234567891',email: 'kenobi@temple.jedi'},
  {name: 'jinn,quigon', phone: '7851475821',email: 'qjinn@temple.jedi'},
  {name: 'skywalker,anikan', phone: '1234567891',email: 'jediMaster@temple.jedi'},
  {name: 'skywalker,luke', phone: '2514589817',email: 'master@temple.jedi'},
  {name: 'palpatine,sheev', phone: '3254587569',email: 'yodaSeeker@senete.sith'},
  {name: 'maul,darth', phone: '1254868596',email: 'kenobiHater@sith.com'},
  {name: 'morgan,dexter', phone: '1478521235',email: 'email@email.com'},
  {name: 'baur,jack', phone: '3578964785',email: 'director@twentyFour.com'},
  {name: 'saiyan,goku', phone: '258963148',email: 'kenobiHater@sith.com'},
  {name: 'brief,bulma', phone: '3578621478',email: 'capsulecorp@dragonball.com'},
]
const addOrders=()=>{
  console.log('addorders')
  let randomNumber = Math.floor(Math.random()*(20));
  randomNumber+=1;
  // let randomNumber=10;
  // console.log('r',randomNumber)
  let randomName = Math.floor(Math.random()*names.length)
  let order = new Object({
    name: names[randomName].name,
    phone: names[randomName].phone,
    email: names[randomName].email,
    total: 0,
    items: new Array()
  })
  // console.log('now menus',nowMenus.value)
  if(nowMenus.value.length){
    // console.log('menus')
    let randomMenu = Math.floor(Math.random()*(nowMenus.value.length));
    
    // console.log('menu index and length of menu',randomMenu, nowMenus.value.length)
    while(randomNumber>0){
      let itemTotal=0;
      let sections=nowMenus.value[randomMenu].sections;
      // console.log('sections',sections)
      let randomSection=Math.floor(Math.random()*(sections.length));
      let sectionChoices= new Array();
      sections[randomSection].options?.forEach(op=>{
        if(op.req){
          let randomOption=Math.floor(Math.random()*(op.content.length));
          let option = new Object({
            name: op.name,
            choice: {
              name: op.content[randomOption].name,
              price: op.content[randomOption].price,
            }
          });
          // console.log('sec op', option)
          Number(option.choice.price) > 0 ? itemTotal+=Number(option.choice.price) :  null;
          sectionChoices.push(option);
        }
      });
      // console.log('sec choice', sectionChoices)
      let items=sections[randomSection].items
      // console.log('items',items)
      let randomItem=Math.floor(Math.random()*(items.length));
      // console.log('ri',randomItem);
      let item = items[randomItem];
      let itemChoices= new Array();
      item.options.forEach(op=>{
        if(op.req){
          let randomOption=Math.floor(Math.random()*(op.content.length));
          let option= new Object({
            name: op.name,
            choice: {
              name: op.content[randomOption].name,
              price: op.content[randomOption].price,
            }
          });
          // console.log('item op', option)
          Number(option.choice.price) > 0 ? itemTotal+=Number(option.choice.price) :  null;
          itemChoices.push(option);
        }
      });
      // console.log('it choice', itemChoices);
      let rndQty=Math.floor(Math.random()*(3));
      rndQty+=1;
      // console.log('it price', item.price)
      itemTotal= (itemTotal + Number(item.price))*rndQty;
      // console.log('wty,', rndQty)
      // console.log('it total', itemTotal)
      let selectedItem=new Object({
        name: item.name,
        price: itemTotal,
        addOns: [],
        removes: [],
        options: [...itemChoices.map(op=>op).concat(sectionChoices.map(op=>op))],
        comments: '',
        qty: rndQty,
        menu: {
            name: nowMenus.value[randomMenu].name,
            _id: nowMenus.value[randomMenu]._id
        }
      });
      order.total+=Number(selectedItem.price);
      order.total.toFixed(2);
      order.items.push(selectedItem);
      randomNumber-=1;
    }
    
    console.log('order',order)

    cartStore.submitOrder(order)
  }else console.log('no menus')
};

onMounted(async()=>{
  await nextTick();
  setInterval(addOrders, 30000);
});
onBeforeUnmount(() => {
  clearInterval(addOrders)
});
</script>
<template>
  <div class="restaurant-container">
      <div class="rest-info">
          <h1>{{ title }}</h1><br/>
          <p v-for="val in info" :key="val">{{ val }}</p>
      </div>
    </div>
</template>
<style>
.restaurant-container {
  background-image: url("https://thumbs.dreamstime.com/b/night-scene-empty-table-restaurant-background-ads-featuring-wooden-foreground-blurred-under-lights-setting-provides-337072366.jpg");
  background-size: cover;
  background-position: center;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width: 100%;
  height: 100%;
}
.rest-info {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  text-align: center;
  top: 2vh;
  color: white;
  background-color: green; 
  padding: 50px;
  border-radius: 8px;  
  width: 600px;
  height: 350px;
}
</style>