import {defineStore} from 'pinia';
export const useCartStore = defineStore('cart', {
    state: ()=>({
        isCartOpen: false,
    }),
    actions: {
        toggleCart(){
            this.isCartOpen = !this.isCartOpen;
        },
        openCart(){
            this.isCartOpen=true;
        },
        closeCart(){
            this.isCartOpen=false;
        }
    }
})