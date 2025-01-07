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
const itemContainer = ref(null);
const clickInsideOK = ref(null);
const handleClickOutside = (event) => {
  if (clickInsideOK.value && !clickInsideOK.value.contains(event.target)) {
    console.log('close')
    resetFlags();
  }else{console.log('click ok')}
};
/****************
 * Tab Controls
 ****************/
const tabToPrice = (event)=>{
    if(event.key==="Tab"){event.preventDefault();focusPriceInput();}
}
const tabToDescription = (event)=>{
    if(event.key==="Tab"){event.preventDefault();focusDescriptionInput();}
}
const tabToName = (event)=>{
    if(event.key==="Tab"){event.preventDefault();focusNameInput();}
}
//reusable put menu change
const postItemEdit = (item) => {
    props.menu.sections[sectionIndex].items[itemIndex]=item;
    menuStore.updateMenu(props.menu);
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
const { descriptionInputRef, editDescription, focusDescriptionInput } = useDescriptionInput();
const submitEditItemDescription = (item) => { 
    if(!!item.description) {editDescription.value=false;}
    if(!isNew.value) {postItemEdit(item);
}}
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
    menuStore.updateMenu(props.menu);
}
/*********
 * new item logic
 ************/
const emit = defineEmits(['send-new-item-flag']);
const postNewItem = (item) => {
    if(item.name){
        const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section_id);
        props.menu.sections[sectionIndex].items.push(item);
        menuStore.updateMenu(props.menu);
        emit('send-new-item-flag', false);
    }
}
</script>
<template>
    <div class="item-container" ref="itemContainer">
        <p class="item">
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
            <span class="name-price">
                <template v-if="editName">
                    <div class="text-field">
                        <input type="text" class="name-input" placeholder="name"
                            ref="nameInputRef"
                            v-model="item.name"
                            @blur="submitEditItemName(item)"
                            @keydown="tabToPrice"
                        />
                    </div>
                </template>
                <template v-if="!editName">
                    <span class="item-name" @click="focusNameInput">{{ item.name }}</span>
                </template>
                <template v-if="editPrice">
                    <PriceInput class="item-price-input" ref="priceInputRef" :price="item.price" @keydown="tabToDescription" @update-price="getItemPrice"/>
                </template>
                <template v-else>
                    <span class="item-price" @click="focusPriceInput">{{ formatPriceDisplay(item.price)}}</span>
                </template>
            </span>
        </p>
        <p class="item-description">
            <template v-if="editDescription">
                <div class="text-field description">
                    <input type="text" placeholder="description" ref="descriptionInputRef"
                        v-model="item.description"
                        @blur="submitEditItemDescription(item)" />
                </div>
            </template>
            <template v-if="!editDescription">
                <span class="item-description-text" @click="focusDescriptionInput" v-if="item.description">{{ item.description }}</span>
                <span class="placeholder-color" @click="focusDescriptionInput" v-else>description</span>
            </template>
        </p>
        <div class="item-addons-removes-options" ref="clickInsideOK" @click.stop>
            <span class="item-a-r-o-titles">
                <button class="btn" @click="viewAddOns" @keydown.enter="viewAddOns">
                    <span :class="{'underline': addOnsFlag}">Add-Ons</span>
                </button>
                <button class="btn" @click="viewRemoves" @keydown.enter="viewRemoves">
                    <span :class="{'underline': removesFlag}">Removes</span>
                </button>
                <button class="btn" @click="viewOptions" @keydown.enter="viewOptions">
                    <span :class="{'underline': optionsFlag}">Options</span>
                </button>
            </span>
            <div class="item-a-r-o-components">
                <div v-if="addOnsFlag">
                    <EditItemAddOn 
                        :addOn="newAddOn"
                        :item_id="item._id"
                        :section_id="section_id"
                        :menu="menu"
                        @send-reset-addon="getResetAddOn"
                    />
                    <div v-for="(addOn, i) in item.addOns" :key="i">
                        <EditItemAddOn 
                            :addOn="addOn"
                            :item_id="item._id"
                            :section_id="section_id"
                            :menu="menu"
                            @send-reset-remove="getResetRemove"
                        /> 
                    </div>
                </div>
                <div v-if="removesFlag">
                    <template v-if="removesFlag">
                        <EditItemRemove 
                            :remove="newRemove"
                            :item_id="item._id"
                            :section_id="section_id"
                            :menu="menu"
                            @send-reset-remove="getResetRemove"
                        />
                    </template>
                    
                    <div v-for="(remove, i) in item.removes" :key="i">
                        <EditItemRemove
                            :remove="remove"
                            :item_id="item._id"
                            :section_id="section_id"
                            :menu="menu"
                            @send-reset-remove="getResetRemove"
                        /> 
                    </div>
                </div>
                <div v-if="optionsFlag">
                    <template v-if="optionsFlag">
                        <EditItemOption
                            :option="newOption"
                            :item_id="item._id"
                            :section_id="section_id"
                            :menu="menu"
                            @send-reset-option="getResetOption"
                        />
                    </template>
                    
                    <div v-for="(option, i) in item.options" :key="i">
                        <EditItemOption
                            :option="option"
                            :item_id="item._id"
                            :section_id="section_id"
                            :menu="menu"
                            @send-reset-option="getResetOption"
                        /> 
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>
<style scoped>
.btn.add-item{
    position: absolute;
    right: 0;
}
.btn.delete{
    margin-right: 20px;
}
.name-price{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
}
.item-name{
    flex: 1;
    text-align: left;
}
.item-price{
    display: inline-block;
}
.item-price-input{
    display: inline-flex;
    align-items: center;
}
.prefix{
    margin-right: 4px;
}
.item-description{
    font-size: 12px;
    margin-left: 45px;
}
.text-field.description input{
    width: auto;
    min-width: 90%;
}
.item-addons-removes-options{
    padding: 10px;
    width: 100%;
}
.edit-item-addOns{
    height: 100%;
}
.edit-item-removes{
    height: 100%;
}
.edit-item-options{
    height: 100%;
}
.item-a-r-o-titles{
    display: flex;
    justify-content: space-between;
    align-items: center;       
    margin: 5px 20px 20px 20px
}
.item-a-r-o-titles:focus{
    outline: none;
    background-color: red;
    box-shadow: 5px 0 5px rgba(0, 123, 255, 0.5); 
}
.item-a-r-o-components{
    display: flex;
    align-items: center;
}
.underline{
    border-bottom: 2px solid black;
}
</style>