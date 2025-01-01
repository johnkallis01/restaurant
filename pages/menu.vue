<template>
  <v-card>
   <div v-for="(menu, i) in menus" :key="i">{{ menu }}</div>
  </v-card>
</template>


<script setup>

const { data: menus } = await useFetch("/api/menus");

</script>