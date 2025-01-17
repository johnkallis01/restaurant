<script setup>
useHead({
  title: "John's Restaurant"
});
const cartStore = useCartStore();
const cartRef=ref(null);
const childRef=ref(null);

const closeCart = (event) => {
  if(cartStore.isCartOpen){
    const cartEl = cartRef.value?.$el;
    const buttonEl = childRef.value?.cartButtonRef;
    if ( cartEl && ! cartEl.contains(event.target) &&
      buttonEl && !buttonEl.contains(event.target)
    ) {
        console.log('click detected')
        cartStore.closeCart()
      }
  }
}
onMounted(()=>{
    document.addEventListener('click', closeCart);
});
onBeforeUnmount(() => {
    document.removeEventListener('click', closeCart);
});
</script>
<template>
  <div class="app">
    <Header ref="childRef"/>
    <main class="main">
      <Cart ref="cartRef" v-if="cartStore.isCartOpen" />
      <NuxtPage />
    </main>
  </div>
</template>
