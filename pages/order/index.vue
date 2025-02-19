<script setup>
useHead({title: "John's Restaurant - Order"});
definePageMeta({middleware: 'auth'});
const menuStore = useMenuStore();
let now = new Date();
const titleButtonsRef=ref(null);
const today = ref({
  day: now.getDay(),
  hour: now.getHours(),
  min: now.getMinutes(),
});
const index = ref(0);
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
const fixWidth=() => {
  if(titleButtonsRef.value){
    console.log(titleButtonsRef.value)
    if(nowMenus.value.length===1){
       titleButtonsRef.value.style.width="100%";
       titleButtonsRef.value.style.justifyContent="center";
      }
  }
}
onMounted(fixWidth)
</script>
<template>
    <div class="page-container">
      <div class="container-title">
        <div class="title-buttons" ref="titleButtonsRef">
          <button 
            v-for="(menu, i) in nowMenus" :key="i"
            :class="{'active': index === i }"
            @click="index=i" >{{ menu.name }}
          </button>
        </div>
      </div>
      <div class="container-body" v-if="nowMenus.length">
        <DisplayMenu :menu="nowMenus[index]" :order="true" :key="index"/>
      </div>
      <div v-else>Restaurant is Closed</div>
    </div>
</template>
<style scoped>
button{
  cursor: pointer;
}
.title-buttons{
  width: 60%;
}
@media(max-width: 415px){
  .page-container{
    width: 105vw;
  }
  .container-title{
    width: 110vw;
    margin-right: 5vw;
  }
}
</style>