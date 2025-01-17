import {defineStore} from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        isCartOpen: false,
        items: [],
    }),
    getters:{
        getItems: (state) => state.items,
        getTotal: (state) => 
            state.items.reduce((sum, item)=> sum+Number(item.price),0).toFixed(2),
        isOpen: (state)=> state.isCartOpen,
    },
    actions: {
        addItemToCart(item){
            this.items.push(item);
        },
        removeItem(index){
            this.items.splice(index, 1);
        },
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