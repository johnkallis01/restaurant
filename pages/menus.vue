<script setup>
useHead({
  title: "John's Restaurant - View Menus"
});
const menuStore = useMenuStore();
const index = ref(0);
function visibleMenu(){ return menuStore.menus[index.value];}
</script>
<template>
    <div class="page-container">
      <div class="container-title">
        <div
          class="title-text"
          v-for="(menu, i) in menuStore.menus"
          :key="i"
        >
          <button @click="index=i" :class="{'active': index === i }">{{ menu.name }}</button>
        </div>
      </div>
      <DisplayMenu :menu="visibleMenu()" :order="false"/>
    </div>
</template>
<style scoped>
.title-text{
  font-size: 16px;
}
button.active{
  padding: 0 10px;
  border-bottom: 2px solid yellow;
}
button:focus{
  outline: none;
}
</style>