<script setup>
const cartStore = useCartStore();
const cartItems = reactive(cartStore.getItems);
const { formatPrice } = usePriceFormatter();
const deleteItem=(i)=>{cartStore.removeItem(i);}
</script>
<template>
    <div class="cart-container">
        <!-- <div class="triangle-border">
            
        </div><div class="inner-triangle"></div> -->
        <div class="cart-title">
            <div class="item-name" @click="handelCheckout">{{ "Your Cart" }}</div>
            <span class="item-price">
                <span class="total">Total:</span>
                ${{ cartStore.getTotal }}
            </span>
        </div>
        <div class="cart-item-container">
            <div v-for="(item, i) in cartItems" class="cart-item">
                <button class="btn" @click="deleteItem(i)">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
                <span class="cart-item-name">{{ item.name }}</span>
                <span class="dotted-line"></span>
                <span class="cart-item-price">{{ formatPrice(item.price) }}</span>
            </div>   
        </div>
        <div class="cart-actions">
            <nuxt-link to="/order/checkout">
                <button class="btn submit" @click="cartStore.closeCart();">{{ "go to checkout" }}</button>
            </nuxt-link>
        </div>
    </div>
</template>
<style scoped>
.triangle-border{
    position: absolute;
    border-bottom: 22px solid black;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    height: 0;
    width: 0;
    top: -22px;
    left: 5px;
    z-index: 100;
}
.inner-triangle {
    position: absolute;
    z-index: 110;
    left: 6.5px;
    top: -20px;
    height: 0;
    width: 0;
    font-size: 0px; line-height: 0%; width: 0px;
    border-bottom: 21px solid white;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
}
.total{
    font-size: 16px;
}
.btn.submit{
    border: 2px solid black;
    box-sizing: border-box;
}
.item-price{
    align-items: center;
    gap: 5px;
}
.cart-container{
    position: fixed;
    left: 4vw;
    top: 12vh;
    height: 60%;
    width: 30vw;
    border: 2px solid black;
    border-radius: 5px;
    background-color: white;
    z-index: 100;
}
.cart-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    height: 15%;
    padding: 5px;
    border-bottom: 2px solid black;
}
.cart-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 10px;
}
.cart-item-container{
    border: 2px solid red;
    height: 75%;
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
.cart-actions{
    display: flex;
    align-items: center;
    padding: 2px;
    width: 100%;
    height: 10%;
    border: 2px solid green;
}
</style>