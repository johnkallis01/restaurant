<script setup>
const { data: menus } = await useFetch("/api/menus");
let now = new Date();
const today = ref({
  day: now.getDay(),
  hour: now.getHours(),
  mins: now.getMinutes(),
})

const findCurrentMenus = computed(() => {
  let currentMenus = menus.map((menu) => {
    let menuDay = menu.days.map((day)=> day.day===today.day );
    /*start time is before current hour && endtime is after current hour*/
    if(menuDay.start.hour < today.hour && menuDay.end.hour > today.hour) return;
    /* hours are the same so check minutes */
    else if(menuDay.start.hour===today.hour){
      if(!menuDay.start.mins) return;
      else if(menuDay.start.mins < today.mins) return;}
      /* end times are the same so check minutes if >0 */
    else if (menuDay.end.hour === today.hour && menuDay.end.mins){
      if(menuDay.end.mins > today.mins) return;
    }
  })
  return currentMenus;
});
</script>
<template>
  <div class="page-container">
    <div class="container-title">
      <span class="title-text">{{ findCurrentMenus() }}</span>
    </div>
    <div>

    </div>
  </div>
</template>


