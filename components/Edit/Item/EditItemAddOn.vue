<script setup>
const {addOn, item_id, section_id, menu} = defineProps({
    addOn: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
    
});
const menuStore = useMenuStore();
const sectionIndex = menu['sections'].findIndex(sec => sec['_id'] === section_id);
const itemIndex = menu['sections'][sectionIndex].items.findIndex(it => it['_id'] === item_id);
const addOnIndex = menu['sections'][sectionIndex].items[itemIndex].addOns.findIndex((ao)=> ao['_id'] === addOn['_id']);
const formatPriceDisplay = (price) => {
    //remove leading zeros
    if(price[0] === "0") {
        price = price.replace(0,"");
        if(price[0] === "0") price = price.replace(0,"");
    }
    return "$" + price;
}
const tabToName = (event)=>{ if(event.key==="Tab"){ event.preventDefault(); focusNameInput();}}
const tabToPrice = (event)=>{ if(event.key==="Tab"){ event.preventDefault(); focusPriceInput();}}
/***********
 * Edit Add-on Name
 *************/
const { nameInputRef, editName, focusNameInput } = useNameInput();
const submitEditAddOnName = (ao) => {
    if(!!ao['name']) editName.value=false;
    if(!isNew.value) postEditAddOn(ao);
}
/******************
 * Edit Add-on Price
 ******************/
const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
const getAddOnPrice = (newPrice) => {
    editPrice.value = false;
    console.log('edit price')
    if(!isNew.value) {
        addOn['price'] = newPrice;
        postEditAddOn(addOn);
    }
    else if (addOn['name']) postNewAddOn({
        _id: addOn['_id'],
        name: addOn['name'],
        price: newPrice
    });
}
/****************
 * new add on logic
 ********************/
const isNew = ref(false);
const inputFlag = ref(false);
onMounted(()=>{
    if(!addOn['name']){
        isNew.value = true;
        focusNameInput();
    }
});
const emit = defineEmits(['send-reset-addon']);
const postNewAddOn = (ao) => {
    if(addOn['name']){    
        menu['sections'][sectionIndex].items[itemIndex]['addOns'].push(ao);
        menuStore.updateMenu(menu);
        emit('send-reset-addon');
    }
}
//post changes
const postEditAddOn = (ao) => {
    menu['sections'][sectionIndex].items[itemIndex]['addOns'][addOnIndex] = ao;  
    menuStore.updateMenu(menu);
}   
const deleteAddOn = () => {
    menu['sections'][sectionIndex].items[itemIndex]['addOns'].splice(addOnIndex, 1);
    menuStore.updateMenu(menu)
}
</script>
<template>
    <div class="tab-container">
        <div class="item-title">
            <div class="button-name">
                <span class="btn-icons-group items">
                    <template v-if="!isNew">
                        <button class="btn" @click="deleteAddOn" @keydown="tabToName">
                            <i class="mdi mdi-close"/>
                            <span class="tooltip">delete</span>
                        </button>
                    </template>
                    <template v-else>
                        <button class="btn" @click="postNewAddOn(addOn)" @keydown="tabToName">
                            <i class="mdi mdi-plus"/>
                            <span class="tooltip">add new add-on</span>
                        </button>
                    </template>
                </span>
                <template v-if="editName">
                    <div class="text-field item-name">
                        <input 
                            type="text" placeholder="name" ref="nameInputRef"
                            v-model="addOn['name']"
                            @blur="submitEditAddOnName(addOn)"
                            @keydown="tabToPrice"
                        />
                    </div>
                </template>
                <template v-if="!editName">
                    <span  class="item-name"
                        @click="focusNameInput"
                        v-if="addOn['name']"
                        >{{ addOn['name'] }}</span>
                    <span class="placeholder-color"
                        @click="focusNameInput"
                        v-else>name</span>
                </template>
            </div>
            <template v-if="editPrice">
                <PriceInput class="item-price" ref="priceInputRef" 
                    :price="addOn['price']"
                    @update-price="getAddOnPrice"
                    />
            </template>
            <template v-else>
                <span class="item-price" @click="focusPriceInput">{{ formatPriceDisplay(addOn['price']) }}</span>
            </template>
           
        </div>
    </div>
</template>