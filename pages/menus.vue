<script setup>
const { data: menus,error } = await useFetch("/api/menus");
let now = new Date();
const today = ref({
  day: now.getDay(),
  hour: now.getHours(),
  mins: now.getMinutes(),
})

</script>
<template>
  <div class="page-container">
    <div class="container-title">
      <span class="title-text">{{ menus[0].name }}</span>
    </div>
    <div>

    </div>
  </div>
</template>


