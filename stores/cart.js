import {defineStore} from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        isCartOpen: false,
        items: [], //cart items
        orders: [], //orders
        order: null,
    }),
    getters:{
        getItems: (state) => state.items,
        getTotal: (state) => 
            ((state.items.reduce((sum, item)=> sum+Number(item.price),0))*1.06).toFixed(2),
        isOpen: (state)=> state.isCartOpen,
    },
    actions: {
        addOrders(ords){
            this.orders.length ? this.orders=this.orders.concat(ords) : this.orders=ords;
        },
        addDateOrders(ords){
            this.dayOrders=ords;
        },
        addItemToCart(item){
            this.items.push(item);
        },
        removeItem(index){
            this.items.splice(index, 1);
        },
        addQty(item){
            let price = item.price/item.qty;
            item.price+=price;
            item.qty+=1;
        },
        removeQty(item){
            let price = item.price/item.qty;
            item.price-=price;
            item.qty-=1;
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
        removeOrders(){
            this.orders=new Array();
        },
        async submitOrder(order){
            const token=useCookie('token');
            if(token.value){
                try{
                    const response = await $fetch('/api/orders/', {
                        method: 'POST',
                        body: JSON.stringify(order),
                        headers: {authorization: `Bearer ${token.value}`}
                    });
                    console.log('cartStore',response.res)
                }catch{
                    console.log('error')
                }
                this.clearCart();
            }
            
            // navigateTo('/');
        },
        async fetchOrderById(id){
            try{
                const response=await fetch('/api/order/'+id,{method: 'GET'});
                if(!response.ok) throw new Error('error from api/orders');
                const data= await response.json();
                this.order=data;
            }catch{
                console.log('error')
            }
        },
        async fetchOrdersByDate(start, end){            
            const token=useCookie('token');
            console.log(0)
            if(token.value){
                console.log(1)
                try{
                    console.log(2)
                    const response = await fetch('/api/orders?'+start+'?'+end,{
                        method: 'GET',
                        headers: {authorization: `Bearer ${token.value}`},        
                    });
                    console.log(3, response)
                    if(!response.ok) throw new Error('error from api/orders');
                    // console.log('response')
                    return await response.json();
                    // console.log('date')
                    // return data;
                    
                }catch{
                    console.log('errorrrrrr')
                }
            }else console.log('no token!')                
            // }
        },
        async fetchOrders(){  
            const token=useCookie('token');
            if(!this.orders.length){
             if(token.value){
              try{
                  let skipDocs=0;
                  let hasMore=true;
                  do{
                    const response = await fetch(`/api/orders/${skipDocs}`,{
                    method: 'GET',
                    headers: {authorization: `Bearer ${token.value}`},
                    });
                    if(!response.ok) throw new Error('error from api/orders');
                    const data= await response.json();
                    let length = data.length;
                    this.addOrders(data);
                    length===100 ? null : hasMore=false;
                    skipDocs+=1;
                  }while(hasMore);
                  console.log('x')
              }catch{
                  console.log('errorrrrrr')
              }
             }else console.log('no token!')                
            }
        }
    }
})