<script setup>
const { data: menus } = await useFetch("/api/menus");
const tab = ref(0);
const titles = ref(['New Menu', 'Edit Menus', 'View All']);
</script>

<template>
  <!-- Tabs and Content -->
  <v-card class="pa-0 ma-0" flat>
    <!-- Tabs -->
    <v-tabs
      v-model="tab"
      bg-color="secondary"
      dark
      class="d-flex justify-center"
      fixed-tabs
      density="compact"
    >
      <v-tab v-for="(title, i) in titles" :key="i">{{ title }}</v-tab>
    </v-tabs>

    <!-- Content Window -->
    <v-window v-model="tab" class="content-window">
      <!-- Tab 1 Content -->
      <v-window-item>
        <v-card flat class="content-card">
            <NewMenu :sections="sections" :menus="menus" />
        </v-card>
      </v-window-item>

      <!-- Tab 2 Content -->
      <v-window-item>
        <v-card flat class="content-card">
          <div>Edit Menus</div>
        </v-card>
      </v-window-item>

      <!-- Tab 3 Content -->
      <v-window-item>
        <v-card flat class="content-card">
          <div>View All</div>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style scoped>
/* Fullscreen layout with padding for toolbar and tabs */
.content-window {
  height: calc(100vh - 112px); /* 64px for toolbar + 48px for tabs */
  width: 1000px;
  overflow-y: auto; /* Enable scrolling if content overflows */
}

.content-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Fill remaining height */
  text-align: center;
  width: 100%;
}
</style>
