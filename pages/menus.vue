<script setup>
useHead({title: "John's Restaurant - View Menus"});
const menuStore = useMenuStore();
const index = ref(0);
function visibleMenu(){ return menuStore.menus[index.value];}
</script>
<template>
    <div class="page-container">
      <div class="container-title">
        <div class="title-buttons">
          <button :class="{'active': index === i }" 
            v-for="(menu, i) in menuStore.menus" :key="menu._id"
            @click="index=i">{{ menu.name }}
          </button>
        </div>
        
      </div>
      <div class="container-body">
        <DisplayMenu :menu="visibleMenu()" :order="false"/>
      </div>
    </div>
</template>