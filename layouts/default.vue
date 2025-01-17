<script setup>
useHead({
  title: "John's Restaurant"
});
const cartStore = useCartStore();
</script>
<template>
  <div class="app">
    <Header/>
    <main class="main">
      <Cart v-if="cartStore.isCartOpen"/>
      <NuxtPage />
    </main>
  </div>
</template>
