<script setup>
const { data: menus } = await useFetch("/api/menus");
</script>
<template>
  <v-card
    class="mx-auto"
    max-width="448"
  >
    <v-window>
      <v-app-bar>
        <v-app-bar-title class="app-bar-title">Edit Menus</v-app-bar-title>
        <template v-slot:append>
          <v-app-bar-nav-icon icon="mdi-plus" to="/edit/menus/new"></v-app-bar-nav-icon>
        </template>
      </v-app-bar>
    </v-window>
  </v-card>
</template>
<style scoped>
.app-bar-title{
  text-align: center;
}
</style>
