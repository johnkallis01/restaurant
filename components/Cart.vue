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
                        <span class="tooltip">remove</span>
                    </button>
                    <span class="cart-item-name">{{ item.name }}</span>
                    <span class="dotted-line"></span>
                    <div class="cart-item-price">
                        <div class="price">{{ formatPrice(item.price)}}</div>
                        <div class="qty">
                            <button @click="item.qty > 1 ? cartStore.removeQty(item) : null">
                                <i class="mdi mdi-minus"/>
                            </button>
                            <div class="qty-text"> 
                                <i :class="`mdi mdi-numeric-${item.qty}`"/>
                            </div>
                            <button @click="item.qty < 10 ? cartStore.addQty(item) : null">
                                <i class="mdi mdi-plus"/>
                            </button>
                        </div> 
                    </div>
                </div>
                <div class="item-mods">
                    <div class="item-options" 
                        v-if="item.options.length"
                        v-for="(op, j) in item.options" :key="op._id">
                        <!-- {{ op.choice }} -->
                        {{ Number(op.choice.price)>0 ? formatPrice(op.choice.price) + " - " : null }}
                        {{ op.name + ": " + op.choice.name }}
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
button{
    background-color: transparent;
}
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
    margin: 0 8px;
}
.item-price{
    align-items: center;
    gap: 5px;
}
.cart-container{
    position: fixed;
    left: 2vw;
    top: 7vh;
    height: 75%;
    width: 50vw;
    border: 2px solid black;
    border-radius: 5px;
    background-color: white;
    z-index: 100;
}
.price{
    margin-right: 5px;
}
.cart-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    height: 5vh;
    min-height: 22px;
    padding: 5px;
    border-bottom: 2px solid black;
    overflow: hidden;
}
.cart-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    margin: 5px;

}
.cart-item-container{
    overflow: auto;
    height: 75%;
}
.cart-item-name{
    flex: 0 1 auto;
}
.cart-item-price {
    display: flex;
    flex-direction: row;
    flex: 0 1 auto;
    text-align: right;
    margin-right: 5px;
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
    height: 5vh;
    border-top: 2px solid black;
    /* border: 1px solid red; */
    overflow: hidden;
    width: 100%;
    position: absolute;
    bottom: 0;
}
@media (max-width: 740px ){
    .cart-container{
        width: 80vw;
    }
    .cart-title{
        height: 4vh;
    }
}
@media (max-width: 540px ){
    .cart-container{
        width: 95vw;
    }
    .cart-title{
        height: 4vh;
    }
}
</style>