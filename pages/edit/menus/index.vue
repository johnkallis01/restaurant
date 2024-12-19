<script setup>
const { data: menus } = await useFetch("/api/menus");
</script>
<template>
  <v-card
    max-width="448"
  >
    <v-window>
      <v-app-bar>
        <v-app-bar-title class="app-bar-title">Edit Menus</v-app-bar-title>
        <template v-slot:append>
          <v-btn text="New +" to="/edit/menus/new"/>
        </template>
      </v-app-bar>
    </v-window>
  </v-card>
</template>
<style scoped>
.card{
  background-color: red;
}
.v-app-bar{
  margin-top: 10px;
}
.app-bar-title{
  text-align: center;
}
</style>
