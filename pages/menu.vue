<template>
  <v-card>
   menu
  </v-card>
</template>


<script setup>

const { data: menus } = await useFetch("/api/menus");

</script>