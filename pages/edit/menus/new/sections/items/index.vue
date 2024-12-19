<script setup>
import { onMounted } from 'vue';

const tab = ref(null);
const menu = JSON.parse(localStorage.getItem('menu'));

</script>
<template>
    <v-card class="card">
        <v-card-title>{{ menu.name }}</v-card-title>
        <v-card-subtitle>{{ "Add items to "+menu.name+" Sections" }}</v-card-subtitle>
        <v-tabs v-model="tab" bg-color="success">
            <v-tab v-for="(section, i) in menu.sections">
                {{ section.name }}
            </v-tab>
        </v-tabs>
        <v-card-text>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item v-for="(section, i) in menu.sections">
                    {{ section.description }}
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>
<style scoped>
.card{
    height: 80%;
    width: 80%;
}
</style>