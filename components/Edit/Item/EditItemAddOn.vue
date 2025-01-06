<script setup>
import { v4 as uuidv4 } from 'uuid';
const props = defineProps({
    addOn: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
    
});
const menuStore = useMenuStore();
const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section_id);
const itemIndex = props.menu.sections[sectionIndex].items.findIndex(it => it._id === props.item_id);
const addOnIndex = props.menu.sections[sectionIndex].items[itemIndex].addOns.findIndex((addOn)=> addOn._id === props.addOn._id);
const formatPriceDisplay = (price) => {
    //remove leading zeros
    if(price[0] === "0") {
        price = price.replace(0,"");
        if(price[0] === "0") price = price.replace(0,"");
    }
    return "$" + price;
}
/***********
 * Edit Add-on Name
 *************/
const editName=ref(false); const nameInputRef=ref(null);
const editAddOnName = ()=>{
    editName.value=true;
    nextTick(()=> nameInputRef.value.focus());
}
const submitEditAddOnName = (addOn) => {
    if(!!addOn.name) editName.value=false;
    if(!isNew.value) postEditAddOn(addOn);
    
}
/***********
 * Edit Add-on Price
 *************/
const editPrice = ref(false); const priceInputRef = ref(null);
const editAddOnPrice = ()=>{
    editPrice.value=true;
    requestAnimationFrame(()=>{priceInputRef.value?.focusInput();})
}
const getAddOnPrice = (newPrice) => {
    editPrice.value = false;
    props.addOn.price = newPrice;
    postEditAddOn(props.addOn);
}
//post changes
const postEditAddOn = (addOn) => {
    props.menu.sections[sectionIndex].items[itemIndex].addOns[addOnIndex] = addOn;   
    menuStore.updateMenu(props.menu);
}
/****************
 * new add on logic
 ********************/
const isNew = ref(false);
onMounted(()=>{
    if(!props.addOn?.name){
        isNew.value = true; editName.value=true;
    }
});
const emit = defineEmits(['send-reset-addon']);

const postNewAddOn = (addOn) => {
    if(addOn.name){    
        props.menu.sections[sectionIndex].items[itemIndex].addOns.push(addOn);
        menuStore.updateMenu(props.menu);
        emit('send-reset-addon');
    }
}
const deleteAddOn = () => {
    console.log('del')
    props.menu.sections[sectionIndex].items[itemIndex].addOns.splice(addOnIndex, 1);
    menuStore.updateMenu(props.menu)
}
</script>
<template>
    <div class="tab-container">
        <span class="btn-icons-group items">
            <template v-if="!isNew">
                <button class="btn" @click="deleteAddOn">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
            </template>
            <template v-else>
                <button class="btn" @click="postNewAddOn(addOn)">
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add new add-on</span>
                </button>
            </template>
        </span>
        <div class="tab-row">
            <span class="tab-name">
                <template v-if="editName">
                    <div class="text-field">
                        <input
                            type="text"
                            placeholder="name"
                            ref="nameInputRef"
                            v-model="addOn.name"
                            @blur="submitEditAddOnName(addOn)"
                        />
                    </div>
                </template>
                <template v-else>
                    <span @click="editAddOnName(addOn)" v-if="addOn.name">{{ addOn.name }}</span>
                    <span class="placeholder-color" @click="editAddOnName(addOn)" v-else>name</span>
                </template>
            </span>
            <span class="tab-price">
                <template v-if="editPrice">
                    <PriceInput ref="priceInputRef" :price="addOn.price" @update-price="getAddOnPrice"/>
                </template>
                <template v-else>
                    <div @click="editAddOnPrice">{{ formatPriceDisplay(addOn.price) }}</div>
                </template>
            </span>
        </div>
    </div>
</template>