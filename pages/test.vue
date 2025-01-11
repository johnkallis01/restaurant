<script setup>
import { v4 as uuidv4 } from 'uuid';
const { data: menus } = await useFetch("/api/menus");
const menuStore = useMenuStore();
const section = ref({
        name: "",
        description: "",
        items: [],
        _id: uuidv4(),
      });
  
const submitForm = () => {
    console.log(menus.value[0])
    menus.value[0].sections.push(section.value);
    //console.log(menus.value[0].sections)
    menuStore.updateMenu(menus.value[0]);

// Add logic to handle the form submission
};
</script>
<template>
    <div class="bg-white">
      <form @submit.prevent="submitForm">
        <!-- Name Input -->
        <div>
          <label for="name">Name:</label>
          <input
            id="name"
            type="text"
            v-model="section.name"
            placeholder="Enter section name"
          />
        </div>
  
        <!-- Description Input -->
        <div>
          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="section.description"
            placeholder="Enter section description"
          ></textarea>
        </div>
 
        <!-- Submit Button -->
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
  
      <!-- Debug Display -->
      <pre>{{ section }}</pre>
    </div>
  </template>