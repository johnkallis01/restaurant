<template>
    <div>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>
</template>
<script setup>
const menuStore=useMenuStore();
onMounted(async () => {
  try {
    await menuStore.fetchMenus();
  } catch (error) {
    console.error("Failed to fetch menus:", error);
  }
});
</script>