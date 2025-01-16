<script setup>
const { data: menus } = await useFetch("/api/menus");
let now = new Date();
const today = ref({
  day: now.getDay(),
  hour: now.getHours(),
  mins: now.getMinutes(),
});
function getMenus(ms){
    const menuDays = ms.filter(m => {
        console.log(m)
        let menu = m['days'].find(day=>day.open && day.day.position===today.value.day)
    return menu;})
return menuDays;
}
</script>
<template>
    <div class="page-container">{{ getMenus(menus)[0].name }}</div>
</template>