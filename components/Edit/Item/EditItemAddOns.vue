<script setup>
const props = defineProps({
    addOns: { type: Array, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
    
});
const menuStore = useMenuStore();
const viewAddOns = ref(false);
const formatPriceDisplay = (price) => {
    //remove leading zeros
    if(price[0] === "0") {
        price = price.replace(0,"");
        if(price[0] === "0") price = price.replace(0,"");
    }
    return "$" + price;
}

/***********
 * Edit Add-on Price
 *************/
const editPrice = ref(false);
const priceInputRef = ref(null);
const editAddOnPrice = ()=>{
    editPrice.value=true;
    requestAnimationFrame(()=>{priceInputRef.value?.focusInput();})
}
const getItemPrice = (newPrice) => {
    props.addOn.price = newPrice;
    editPrice.value = false;
}
</script>
<template>
    <div class="addOn-container">
        <span class="title-text" @click="viewAddOns=!viewAddOns">Add-Ons:</span>
        <div v-if="viewAddOns">
            <p class="addOn-title-bar">
                <span class="new-addOn-input name">
                    <input class="new-addOn-input-field name" type="text">
                </span>
                <span class="new-addOn-input price">
                    <span class="prefix">$</span>
                    <input class="new-addOn-input-field price" type="text" placeholder="000.00">
                </span>
                <button class="btn">
                    <span>Submit</span>
                </button>
            </p>
            <div class="addOn" v-for="(addOn, i) in addOns" :key="i">
                <p class="addOn-name">
                    {{ addOn.name }}
                </p>
                <template v-if="editPrice">
                    <PriceInput ref="priceInputRef" :price="addOn.price" @update:price="getItemPrice"/>
                </template>
                <template v-else>
                    <div @click="editAddOnPrice">{{ addOn.price }}</div>
                </template>
                
            </div>
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