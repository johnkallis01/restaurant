<script setup>
const { data: menus } = await useFetch("/api/menus");
const dropdownListRef = ref([]);
const router = useRouter();
const fixLastBorderRadius=() => {
    Array.from(dropdownListRef.value)[Array.from(dropdownListRef.value).length-1].style.borderRadius='0 0 4px 4px'
};
onMounted(fixLastBorderRadius)
</script>
<template>
    <div class="dropdown-menu">
        <span class="dropdown-item" @click="router.push('/edit/menus/new')">New Menu</span>
        <span class="dropdown-item" ref="dropdownListRef"
            v-for="(menu, index) in menus" 
            :key="index" 
            @click="router.push('/edit/menus/'+menu._id)"
        >{{ menu.name }}</span>
    </div>
</template>  
<style scoped>
.dropdown-menu {
    position: absolute;
    top:  6vh;
    right: 30px;
    text-wrap: nowrap;
    width: fit-content;
    height: fit-content;
    z-index: 10;
    border-radius: 0 0 4px 4px;
    display: flex;
    flex-direction: column;
    background-color: white;
}
.dropdown-item {
    padding: 7px;
    cursor: pointer;
    color: black;
    width: 100px;
}
.dropdown-item:hover {
    background-color: #b3caec;
}
</style>
  