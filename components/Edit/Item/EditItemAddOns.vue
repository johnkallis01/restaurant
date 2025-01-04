<script setup>
const props = defineProps({
    addOn: { type: Object, required: false },
    item: { type: Object, required: true },
    section: { type:Object, required: true},
    menu: { type:Object, required: true},
    
});
const formatPriceDisplay = (price) => {
    //remove leading zeros
    if(price[0] === "0") {
        price = price.replace(0,"");
        if(price[0] === "0") price = price.replace(0,"");
    }
    return "$" + price;
}
const getItemPrice = (newPrice) => {
    console.log(newPrice)
    props.addOn.price = newPrice;
    flag.value = false;
}
const priceInputRef = ref(null);
const swapFlag = ()=>{
    flag.value=true;
    requestAnimationFrame(()=>{
        priceInputRef.value?.focusInput();
    })
}

const flag=ref(false);
</script>
<template>
    <div class="addOn-container">
        <p class="addOn-title-bar">
            <span class="title-text">Add-Ons:</span>
            <span class="new-addOn-input name">
                <input class="new-addOn-input-field name" type="text">
            </span>
            <span class="new-addOn-input price">
                <span class="prefix">$</span>
                <input class="new-addOn-input-field price" type="text" placeholder="000.00">
            </span>
        </p>
        <div class="addOn">
            <p class="addOn-name">{{ addOn.name }}</p>
            <template v-if="flag">
                <PriceInput ref="priceInputRef" :price="addOn.price" @update:price="getItemPrice"/>
            </template>
            <template v-else>
                <div @click="swapFlag" class="bg-blue">{{ addOn.price }}</div>
            </template>
            
        </div>
        
    </div>
</template>
<style scoped>
.new-addOn-input{
    background-color: white;
    margin-left: 20px;
}
.new-addOn-input-field.price{
    text-align: right;
    max-width: 80px;
}
.addOn-name{
    row-gap: 100px;
    margin-left: 30px;
}
</style>