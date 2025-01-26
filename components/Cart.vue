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
                <span>{{"$"+ cartStore.getTotal }}</span>
            </span>
        </div>
        <div class="cart-item-container">
            <div v-for="(item, i) in cartItems" >
                <div class="cart-item">
                    <button class="btn" @click="deleteItem(i)">
                        <i class="mdi mdi-close"/>
                        <span class="tooltip">delete</span>
                    </button>
                    <span class="cart-item-name">{{ item.name }}</span>
                    <span class="dotted-line"></span>
                    <span class="cart-item-price">{{ formatPrice(item.price) }}</span>
                </div>
                <div class="item-mods">
                    <div class="item-options" 
                        v-if="item.options.length"
                        v-for="(op, j) in item.options" :key="op._id">
                        {{ Number(op.choice[0].price)>0 ? formatPrice(op.choice[0].price) + " - " : null }}
                        {{ op.name + ": " + op.choice[0].name }}
                    </div>
                    <div class="item-addons" v-if="item.addOns.length">
                        <span>{{ 'Add: '}}</span>
                        <span class="addons">
                            <div v-for="ao in item.addOns" :key="ao.name">
                                {{  Number(ao.price)>0 ? formatPrice(ao.price) + " - ": null }}
                                {{ ao.name + " "}}
                            </div>
                        </span>
                    </div>
                    <div class="item-options" v-if="item.removes.length">
                        <span>{{ 'No: '}}</span>
                        <span v-for="r in item.removes" r.name>{{ r.name + " "}}</span>
                    </div>
                    <div class="item-options" 
                        v-if="item.comments">
                        <div>Comments:</div>
                        <div>{{ item.comments }}</div>
                    </div>
                </div>
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
.item-mods{
    font-size: 14px;
    margin-left: 45px;
}
.item-addons{
    display: flex;
    flex-direction: row;
}
.addons{
    margin-left: 5px;
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
@media (max-width: 740px ){
    .cart-container{
        width: 70vw;
    }
}
.cart-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    height: 15%;
    padding: 5px;
    border-bottom: 2px solid black;
    overflow: hidden;
}
.cart-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    padding: 10px;
}
.cart-item-container{
    overflow: auto;
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
    justify-content: flex-end;
    align-items: center;
    padding: 4px;
    width: 100%;
    height: 10%;
    border-top: 2px solid black;
    overflow: hidden;
}
</style>