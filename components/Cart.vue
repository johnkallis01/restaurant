<script setup>
const cartStore = useCartStore();
const cartItems = cartStore.getItems;
const { formatPrice } = usePriceFormatter();
const deleteItem=(index)=>{
    cartStore.removeItem(index);
}
</script>
<template>
    <div class="cart-container">
        <div class="cart-title">
            <span class="item-name">Checkout</span>
            <span class="item-price">
                <span class="total">Total:</span>
                ${{ cartStore.getTotal }}
            </span>
        </div>
        <div v-for="(item, i) in cartItems" class="cart-item-title">
            <button class="btn" @click="deleteItem(i)">
                <i class="mdi mdi-close"/>
                <span class="tooltip">delete</span>
            </button>
            <span class="cart-item-name">{{ item['name'] }}</span>
            <span class="dotted-line"></span>
            <span class="cart-item-price">{{ formatPrice(item['price']) }}</span>
        </div>
        
    </div>
</template>
<style scoped>
.total{
    font-size: 16px;
}
.item-price{
    align-items: center;
    gap: 5px;
}
.cart-container{
    position: fixed;
    left: 0;
    height: 90vh;
    width: 40vw;
    background-color: white;
    z-index: 100;
}
.cart-title{
    display: flex;
    justify-content: space-between;
    align-content: center;
    font-size: 20px;
    padding: 5px;
    border-bottom: 2px solid black;
}
.cart-item-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 10px;
}
.cart-item-name{
    flex: 0 1 auto;
}
.cart-item-price {
  flex: 0 1 auto; /* Allow the price to take its natural width */
  text-align: right; /* Aligns the text to the right */
}
.dotted-line {
  flex: 1;
  position: relative;
  bottom: -5px;
  border-bottom: 1px dashed black;
  height: 0;
}
</style>