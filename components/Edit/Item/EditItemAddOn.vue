<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['send-reset-addon']);
const {addOn,item_id, section_id, menu} = defineProps(
{
    addOn: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},});
const menuStore = useMenuStore();
const localMenu=reactive(menu);
const localAddOn=reactive(addOn);
const sectionIndex = localMenu.sections.findIndex(sec => sec._id === section_id);
const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item_id);
const addOnIndex = localMenu.sections[sectionIndex].items[itemIndex].addOns.findIndex((ao)=> ao._id === addOn._id);
const { formatPrice } = usePriceFormatter();
const tabToName = (event)=>{ if(event.key==="Tab"){ event.preventDefault(); focusNameInput();}}
const tabToPrice = (event)=>{ if(event.key==="Tab"){ event.preventDefault(); focusPriceInput();}}
/***********
 * Edit Add-on Name
 *************/
const { nameInputRef, editName, focusNameInput } = useNameInput();
const submitEditAddOnName = (ao) => {
    if(!!ao.name) editName.value=false;
    if(!isNew.value) postEditAddOn(ao);
}
/******************
 * Edit Add-on Price
 ******************/
const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
const getAddOnPrice = (np) => {
    editPrice.value = false;
    console.log('edit price')
    if(!isNew.value) {
        localAddOn.price = np;
        postEditAddOn(localAddOn);
    }
    else if (localAddOn.name) postNewAddOn({
        _id: localAddOn._id,
        name: localAddOn.name,
        price: newPrice
    });
}
/****************
 * new add on logic
 ********************/
const isNew = ref(false);
onMounted(()=>{
    if(!localAddOn.name){
        isNew.value = true;
        focusNameInput();
    }
});

const postNewAddOn = (ao) => {
    if(localAddO.name){    
        localMenu.sections[sectionIndex].items[itemIndex].addOns.push(ao);
        menuStore.updateMenu(localMenu);
        emit('send-reset-addon');
    }
}
//post changes
const postEditAddOn = (ao) => {
    localMenu.sections[sectionIndex].items[itemIndex].addOns[addOnIndex] = ao;  
    menuStore.updateMenu(localMenu);
}   
const deleteAddOn = () => {
    localMenu.sections[sectionIndex].items[itemIndex].addOns.splice(addOnIndex, 1);
    menuStore.updateMenu(localMenu)
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
                        <button class="btn" @click="postNewAddOn(localAddOn)" @keydown="tabToName">
                            <i class="mdi mdi-plus"/>
                            <span class="tooltip">add new add-on</span>
                        </button>
                    </template>
                </span>
                <template v-if="editName">
                    <div class="text-field item-name">
                        <input 
                            type="text" placeholder="name" ref="nameInputRef"
                            v-model="localAddOn.name"
                            @blur="submitEditAddOnName(localAddOn)"
                            @keydown="tabToPrice"
                        />
                    </div>
                </template>
                <template v-if="!editName">
                    <span  class="item-name"
                        @click="focusNameInput"
                        v-if="localAddOn.name"
                        >{{ localAddOn.name }}</span>
                    <span class="placeholder-color"
                        @click="focusNameInput"
                        v-else>name</span>
                </template>
            </div>
            <template v-if="editPrice">
                <PriceInput class="item-price" ref="priceInputRef" 
                    :price="localAddOn.price"
                    @update-price="getAddOnPrice"
                    />
            </template>
            <template v-else>
                <span class="item-price" @click="focusPriceInput">{{ formatPrice(localAddOn.price) }}</span>
            </template>
        </div>
    </div>
</template>