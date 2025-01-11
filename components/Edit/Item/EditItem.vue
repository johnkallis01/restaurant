<script setup>
import { v4 as uuidv4 } from 'uuid';
const props = defineProps({
    menu: { type: Object, required: true},
    section_id: { type: String, required: true},
    item: { type: Object, required: true},
});
const menuStore = useMenuStore();
const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section_id);
const itemIndex = props.menu.sections[sectionIndex].items.findIndex(it => it._id === props.item._id);
//checks if item is new
const isNew = ref(false);
onMounted(()=>{
    if(!props.item?.name){
        isNew.value = true; 
        focusNameInput();
    }
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
const clickInsideOK = ref(null);
const handleClickOutside = (event) => {
  // Check if the clicked element is outside the itemElement
  if (clickInsideOK.value && !clickInsideOK.value.contains(event.target)) resetFlags();
}
/****************
 * Tab Controls
 ****************/
const tabToPrice = (event)=>{
    if(event.key==="Tab"){event.preventDefault();focusPriceInput();}
}
const tabToName = (event)=>{
    if(event.key==="Tab"){event.preventDefault();focusNameInput();}
}
//reusable put menu change
const postItemEdit = (item) => {
    if(!isNew.value){
        props.menu.sections[sectionIndex].items[itemIndex]=item;
        menuStore.updateMenu(props.menu);
    }
    
}
/************************
**edit item name logic
*************************/
const { nameInputRef, editName, focusNameInput } = useNameInput();
const submitEditItemName = (item) => { 
    if(!!item.name) editName.value=false;
    if(!isNew.value) postItemEdit(item);
}
/************************
**edit item description logic
*************************/
const addonsRef = ref(null)
const { tabToDescription, descriptionInputRef,
    editDescription, focusDescriptionInput} = useTabToDescription();
const submitEditItemDescription = (item, event) => { 
    editDescription.value=false;
    if(event?.key==="Enter"){
    }
    if(!isNew.value) {postItemEdit(item);}
    else postNewItem(item)
}
/***********
 * Edit Item Price
 *************/
 const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
//from <PriceInput/> emit
const getItemPrice = (newPrice) => {
    editPrice.value = false;
    props.item.price = newPrice;
    if(!isNew.value) postItemEdit(props.item);
}
const submitNewItem = (item) => {
    if(isNew.value) postItemEdit(item)
}
//remove leading zeros + $
const formatPriceDisplay = (price) => {
    if(price[0] === "0") {
        price = price.replace(0,"");
        if(price[0] === "0") price = price.replace(0,"");
    }
    return "$" + price;
}
/************
 * Add-ons Removes Options
 ************/
const addOnsFlag = ref(false); const removesFlag = ref(false); const optionsFlag = ref(false);
const resetFlags = () => { addOnsFlag.value=false;removesFlag.value=false;optionsFlag.value=false;}
const viewAddOns = ()=>{ resetFlags(); addOnsFlag.value=true;}
const viewRemoves = ()=>{ resetFlags(); removesFlag.value=true;}
const viewOptions = ()=>{ resetFlags(); optionsFlag.value=true;}

// new add-ons/remove/options
const newAddOn = ref({ name: "", price: "000.00", _id: uuidv4(), });
const newRemove = ref({ name: "", _id: uuidv4(), });
const newOption = ref({ name: "", values: [], _id: uuidv4(), });
const getResetAddOn = () => newAddOn.value = { name: "", price: "000.00", _id: uuidv4(),}
const getResetRemove = () =>{ newRemove.value = { name: "", _id: uuidv4(), }}
const getResetOption = () =>{ newOption.value = { name: "", values: [], _id: uuidv4(), }}
/*********
 * delete item logic
 ************/
const deleteItem = ()=>{
    props.menu.sections[sectionIndex].items.splice(itemIndex, 1);
    //menuStore.updateMenu(props.menu);
    console.log('delete item disabled')
}
/*********
 * new item logic
 ************/
const emit = defineEmits(['send-new-item-flag']);
const postNewItem = (item) => {
    if(item?.name){
        const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section_id);
        props.menu.sections[sectionIndex].items.push(item);
        menuStore.updateMenu(props.menu);
        emit('send-new-item-flag', false);
    }
}
</script>
<template>
    <div class="item-container">
        <div class="item-title">
            <div class="button-name">
                <span class="btn-icons-group items">
                    <template v-if="!isNew">
                        <button class="btn" @click="deleteItem" @keydown="tabToName" ref="buttonRef">
                            <i class="mdi mdi-close"/>
                            <span class="tooltip">delete</span>
                        </button>
                    </template>
                    <template v-else>
                        <button class="btn" @click="postNewItem(item)" @keydown="tabToName" ref="buttonRef">
                            <i class="mdi mdi-plus"/>
                            <span class="tooltip">add new item</span>
                        </button>
                    </template>
                </span>
                <template v-if="editName">
                    <div class="text-field item-name">
                        <input type="text" placeholder="name"
                            ref="nameInputRef"
                            v-model="item.name"
                            @blur="submitEditItemName(item)"
                            @keydown.enter="submitEditItemName(item)"
                            @keydown="tabToPrice"
                            />
                    </div>
                </template>
                <template v-if="!editName">
                    <span class="item-name"
                        v-if="item.name"
                        @click="focusNameInput"
                        >{{ item.name }}</span>
                        <span class="placeholder-color"
                            @click="focusNameInput"
                            v-else
                        >name</span>
                </template>
            </div>
            <template v-if="editPrice">
                <PriceInput class="item-price" ref="priceInputRef"
                    :price="item.price"
                    @keydown="tabToDescription"
                    @update-price="getItemPrice"/>
            </template>
            <template v-else>
                <span class="item-price" @click="focusPriceInput">{{ formatPriceDisplay(item.price)}}</span>
            </template>
         
        </div>
        <div class="item-description">
            <template v-if="editDescription">
                <div class="text-field description">
                    <textarea type="text" placeholder="description" ref="descriptionInputRef"
                        v-model="item.description"
                        @blur="submitEditItemDescription(item)"
                        @keydown.enter="submitEditItemDescription(item, $event)"
                        />
                </div>
            </template>
            <template v-if="!editDescription">
                <span class="item-description-text"
                    v-if="item.description" 
                    @click="focusDescriptionInput">{{ item.description }}
                </span>
                <span class="placeholder-color" @click="focusDescriptionInput" v-else>description</span>
            </template>
        </div>
        <div class="item-addons-removes-options" ref="clickInsideOK" @click.stop>
            <span class="item-a-r-o-titles" v-if="!isNew">
                <button class="btn"  @click="viewAddOns" @keydown.enter="viewAddOns">
                    <span :class="{'underline': addOnsFlag}">Add-Ons</span>
                </button>
                <button class="btn" id="removes-tab" @click="viewRemoves" @keydown.enter="viewRemoves">
                    <span :class="{'underline': removesFlag}">Removes</span>
                </button>
                <button class="btn" id="options-tab" @click="viewOptions" @keydown.enter="viewOptions">
                    <span :class="{'underline': optionsFlag}">Options</span>
                </button>
            </span>
            <span class="item-a-r-o-components">
                <div v-if="addOnsFlag">
                    <EditItemAddOn 
                        :addOn="newAddOn"
                        :item_id="item._id"
                        :section_id="section_id"
                        :menu="menu"
                        @send-reset-addon="getResetAddOn"
                    />
                    <EditItemAddOn 
                        :addOn="addOn"
                        :item_id="item._id"
                        :section_id="section_id"
                        :menu="menu"
                        v-for="(addOn, i) in item.addOns" :key="i"
                        @send-reset-remove="getResetRemove"
                    />   
                </div>
                <span v-if="removesFlag">
                    <EditItemRemove 
                        :remove="newRemove"
                        :item_id="item._id"
                        :section_id="section_id"
                        :menu="menu"
                        @send-reset-remove="getResetRemove"
                    />
                    <EditItemRemove
                        :remove="remove"
                        :item_id="item._id"
                        :section_id="section_id"
                        :menu="menu"
                        v-for="(remove, i) in item.removes" :key="i"
                        @send-reset-remove="getResetRemove"
                    /> 
                </span>
                <span v-if="optionsFlag">
                    <EditItemOption
                        :option="newOption"
                        :item_id="item._id"
                        :section_id="section_id"
                        :menu="menu"
                        @send-reset-option="getResetOption"
                    />
                    <EditItemOption
                        :option="option"
                        :item_id="item._id"
                        :section_id="section_id"
                        :menu="menu"
                        v-for="(option, i) in item.options" :key="i"
                        @send-reset-option="getResetOption"
                    />                
                </span>
            </span>
        </div>  
    </div>
</template>
<style scoped>
.underline{
    border-bottom: 2px solid black;
}
</style>