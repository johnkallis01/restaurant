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
    )cartStore.closeCart();
  }
}
useEventListener('click',closeCart);
</script>
<template>
  <div class="app">
    <Header ref="childRef"/>
    <main class="main">
      <div class="modalWrapper" v-if="cartStore.isCartOpen">
        <Cart ref="cartRef" />
      </div>
      <NuxtPage />
    </main>
  </div>
</template>
