<script setup>
const { data: menus } = await useFetch("/api/menus");
const router = useRouter();
function selectOption(id) {
  console.log('select')
  router.push("/edit/menus/"+id)
}
</script>
<template>
    <ul class="dropdown-menu">
        <li class="dropdown-item" @click="selectOption('new')">New Menu</li>
        <li 
            v-for="(menu, index) in menus" 
            :key="index" 
            @click="selectOption(menu._id)"
            class="dropdown-item"
        >{{ menu.name }}</li>
    </ul>
</template>  
<style scoped>
.dropdown-menu {
    position: absolute;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0;
    padding: 0;
    top: 10vh;
    right: 15vw;
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
  