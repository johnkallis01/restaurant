import {defineStore} from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        isCartOpen: false,
        items: [],
        orders: [],
    }),
    getters:{
        getItems: (state) => state.items,
        getTotal: (state) => 
            ((state.items.reduce((sum, item)=> sum+Number(item.price),0))*1.06).toFixed(2),
        isOpen: (state)=> state.isCartOpen,
    },
    actions: {
        addItemToCart(item){
            this.items.push(item);
        },
        removeItem(index){
            this.items.splice(index, 1);
        },
        clearCart(){
            this.items=[];
        },
        toggleCart(){
            if(this.items.length) this.isCartOpen = !this.isCartOpen;  
        },
        openCart(){
            if(this.items.length) this.isCartOpen=true;
        },
        closeCart(){
            this.isCartOpen=false;
        },
        async submitOrder(order){
            const token=useCookie('token');
            if(token.value){
                try{
                    const response = await $fetch('/api/orders/', {
                        method: 'POST',
                        body: JSON.stringify(order),
                        headers: {authorization: `Bearer ${token.value}`},
                    });
                    console.log('cartStore',response.res)
                }catch{
                    console.log('error')
                }
                this.clearCart();
            }
            
            // navigateTo('/');
        },
        async fetchOrders(){
            const token=useCookie('token');
            if(token.value){
                try{
                    const response = await fetch('/api/orders',{
                        method: 'GET',
                        headers: {authorization: `Bearer ${token.value}`},
                    })
                    .then(response => response.json())
                    .then(data => this.orders = data);
                }catch{
                    console.log('errorrrrrr')
                }
            }
        }
    }
})