<script setup>
useHead({title: "John's Restaurant - View Menus"});
const menuStore = useMenuStore();
const index = ref(0);
function sortMenus(menus) {
    return menus.sort((a,b)=>a.position - b.position)
}
</script>
<template>
    <div class="page-container">
      <div class="container-title">
        <div class="title-buttons">
          <button :class="{'active': index === i }" 
            v-for="(menu, i) in sortMenus(menuStore.menus)" :key="menu._id"
            @click="index=i">{{ menu.name }}
          </button>
        </div>
        
      </div>
      <div class="container-body">
        <DisplayMenu :menu="menuStore.menus[index]" :order="false" :key="index"/>
      </div>
    </div>
</template>