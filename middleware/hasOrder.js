export default defineNuxtRouteMiddleware(async () => {
    const cartStore=useCartStore();
    if (!cartStore.getItems.length){
      console.log('empty cart');
      return navigateTo('/order');
    }    
  });