<script setup>
import { reactive } from 'vue';

const menuStore = useMenuStore();
onMounted(async () => {
  try {
    await menuStore.fetchMenus();
  } catch (error) {
    console.error("Failed to fetch menus:", error);
  }
});
const allMenus = computed(() => menuStore.menus);
let now = new Date();
const today = ref({
  day: now.getDay(),
  hour: now.getHours(),
  mins: now.getMinutes(),
});
const todayMenus = computed(()=>{
  return allMenus.value.filter((menu)=>{
    return menu.days.some((day)=> day.day.position === today.value.day && day.open)
  });
});
const nowMenus = computed(() => {
  return todayMenus.value.filter((menu)=>{
    return menu.days.some((day)=>{
      return (
        (day.start.hour < today.value.hour ||
        (day.start.hour === today.value.hour && day.start.mins <= today.value.mins))
            &&
        (day.end.hour > today.value.hour ||
        (day.end.hour === today.value.hour && day.end.mins > today.value.mins))
      )
    })
  })
});

</script>

<template>
  <div>
    <div class="page-container">
      <div class="container-title">
        <div
          v-if="allMenus.length > 0"
          class="title-text"
          v-for="(menu, i) in nowMenus"
          :key="i"
        >
          {{ menu.name }}
        </div>
      </div>
    </div>
  </div>
</template>
