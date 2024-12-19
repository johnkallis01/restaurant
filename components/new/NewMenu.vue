<script setup>
const props = defineProps({
  menus: { type: Array, required: true }
});

const newMenu = ref({ _id: '', name: '', days: [], sections: [] });
const tab = ref(0);
const titles = ['Schedule', 'Sections'];

function getDaysTimes(daysTimes) {
  console.log('Received days:', daysTimes);
}

async function submitMenu() {
  const payload = {
    name: newMenu.name || '',
    sections: newMenu.sections,
    days: newMenu.days
  };
  try {
    const res = await fetch('/api/menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('Menu submitted:', await res.json());
    router.push('/editMenu/');
  } catch (error) {
    console.error('Error:', error);
  }
}
</script>

<template>
    <v-card>
        <v-card-item>
            <v-text-field v-model="newMenu.name" label="name" />
        </v-card-item>

        <v-card class="days-section">
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

            <!-- Fixed-size container for tabs -->
            <div class="tab-container">
                <v-window v-model="tab" class="fixed-window">
                    <v-window-item>
                        <NewDay @daysTimes="getDaysTimes" />
                    </v-window-item>
                    <v-window-item>
                      <div>new sections</div>
                    </v-window-item>
                </v-window>
            </div>
        </v-card>

        <v-divider />

        <v-card-actions>
            <v-btn @click="submitMenu()">submit</v-btn>
            <v-btn @click="cancel()">cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
.days-section {
    width: 1000px; /* Fixed width for the whole card */
    margin: auto; /* Center the card */
}

.tab-container {
    width: 100%; 
    overflow: hidden; /* Prevent content overflow */
}

.fixed-window {
    width: 100%;
    height: 100%;
}

.v-window-item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
}
</style>