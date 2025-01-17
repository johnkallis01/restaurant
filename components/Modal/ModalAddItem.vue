<script setup>
const cartStore = useCartStore(); 
const { item } = defineProps({item: {type: Object, required: true}})
const emit = defineEmits(['close-modal']);
const { formatPrice } = usePriceFormatter();
const addItem = (item)=>{
    console.log(item)
    cartStore.addItemToCart(item);
    emit('close-modal');
}
const closeModal = ()=>{
    emit('close-modal');
}
const {addOnsFlag, removesFlag, optionsFlag,
    resetFlags, viewAddOns, viewRemoves, viewOptions } = useAROFlags();
//optionsFlag.value=true;
</script>
<template>
    <div class="container">
        <div class="item-title">
            <div class="item-name">
                {{ item['name'] }} 
            </div>
            <div class="item-price">
                {{ formatPrice(item['price']) }}
            </div>  
        </div>
        <div class="form-body">
            <div class="item-addons-removes-options">
                <div class="item-a-r-o-titles">
                    <button class="btn" id="options-tab" v-if="item['options'].length"
                        @click="viewOptions" @keydown.enter="viewOptions">
                        <span :class="{'underline': optionsFlag}">Options</span>
                    </button>
                    <button class="btn" v-if="item['addOns'].length"
                        @click="viewAddOns" @keydown.enter="viewAddOns">
                        <span :class="{'underline': addOnsFlag}">Add-Ons</span>
                    </button>
                    <button class="btn"  v-if="item['removes'].length"
                        @click="viewRemoves" @keydown.enter="viewRemoves">
                        <span :class="{'underline': removesFlag}">Removes</span>
                    </button>    
                </div>
            <div class="item-a-r-o-components">
                <div v-if="optionsFlag">
                    options
                </div>
                <div v-if="addOnsFlag">
                    addons
                </div>
                <div v-if="removesFlag">
                    removes
                </div>
            </div>
        </div> 
        </div>
        <div class="form-actions">
            <button class="btn close" @click="addItem(item)">submit</button>
            <button class="btn close" @click="closeModal">cancel</button>
        </div>
    </div>
</template>
<style scoped>
.btn.close{
    border: 1px solid black;
    box-sizing: border-box;
}
.form-body{
    height: 100%;
    width: 100%;
    padding: 5px;
    border: 1px solid green;
    box-sizing: border-box;
}
.item-title{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 5px;
    border-bottom: 2px solid black;
}
.form-actions{
    display: flex;
    justify-content: flex-end;
    align-items: end;
    align-content: end;
}
.container{
    height: 100%;
    width: 100%;
}
</style>