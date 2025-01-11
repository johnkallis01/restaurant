<script setup>
const { data: menus } = await useFetch("/api/menus");

const selectedMenu = ref('Select an option');
function selectOption(menu) {
  selectedMenu.value = menu
}
</script>
<template>
    <ul class="dropdown-menu">
        <li class="dropdown-item">
            <nuxt-link to="/edit/menus/new">
                <button>New Menu</button>
            </nuxt-link>
        </li>
        <li 
            v-for="(menu, index) in menus" 
            :key="index" 
            @click="selectOption(menu)"
            class="dropdown-item"
        >
        <nuxt-link :to="'/edit/menus/'+menu._id">
           <button>{{ menu.name }}</button>
        </nuxt-link>
        </li>
    </ul>
</template>  
<style scoped>
.dropdown-menu {
    position: absolute;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0;
    padding: 0;
    top: 8vh;
    list-style-type: none;
    z-index: 10;
    border-radius: 4px;
}
.dropdown-item {
    padding: 10px;
    cursor: pointer;
    color: black;
    transition: background-color 0.2s ease;
}
.dropdown-item:hover {
    background-color: #b3caec;
    border-radius: 4px;
}
</style>
  