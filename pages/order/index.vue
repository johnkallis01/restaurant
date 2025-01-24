<script setup>
definePageMeta({middleware: 'auth',});
const menuStore = useMenuStore();
let now = new Date();
const today = ref({
  day: now.getDay(),
  hour: now.getHours(),
  min: now.getMinutes(),
});
const index = ref(0);
const visibleMenu = () => {return nowMenus.value[index.value];}
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
onMounted(async () => {
  try {
    await menuStore.fetchMenus();
  } catch (error) {
    console.error("Failed to fetch menus:", error);
  }
});
</script>
<template>
    <div class="page-container">
      <div class="container-title">
        <div class="title-text"
          v-for="(menu, i) in nowMenus" :key="i">
          <button @click="index=i" :class="{'active': index === i }">{{ menu.name }}</button>
        </div>
      </div>
      <DisplayMenu :menu="visibleMenu()" :order="true"/>
    </div>
</template>
<style scoped>
button.active{
  padding: 0 10px;
  border-bottom: 2px solid yellow;
}
button:focus{
  outline: none;
}
</style>