<script setup>
useHead({title: "John's Restaurant - Order"});
definePageMeta({middleware: 'auth'});
const menuStore = useMenuStore();
let now = new Date();
const today = ref({
  day: now.getDay(),
  hour: now.getHours(),
  min: now.getMinutes(),
});
const index = ref(0);
function visibleMenu(){return nowMenus.value[index.value];}
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
</script>
<template>
    <div class="page-container">
      <div class="container-title">
        <div class="title-buttons">
          <button 
            v-for="(menu, i) in nowMenus" :key="i"
            :class="{'active': index === i }"
            @click="index=i" >{{ menu.name }}
          </button>
        </div>
          
      </div>
      <div class="container-body">
        <DisplayMenu :menu="visibleMenu()" :order="true"/>
      </div>
    </div>
</template>
<style scoped>
button{
  cursor: pointer;
}
.title-buttons{
  width: 60%;
}
</style>