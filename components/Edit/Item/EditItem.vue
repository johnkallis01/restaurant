<script setup>
import { v4 as uuidv4 } from 'uuid';
const props = defineProps({
    menu: { type:Object, required: true},
    section_id: { type:String, required: true},
    item: { type:Object, required: true},
});
const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section_id);
const itemIndex = props.menu.sections[sectionIndex].items.findIndex(it => it._id === props.item._id);
const menuStore = useMenuStore();
//checks if item is new
onMounted(()=>{
    if(props.item?.new){ 
        isNew.value = true; editName.value=true; editDescription.value=true;
        delete props.item.new;
    }
});
//reusable put menu change
const postItemEdit = (item) => {
    props.menu.sections[sectionIndex].items[itemIndex]=item;
    menuStore.updateMenu(props.menu);
}
/************************
**edit item name logic
*************************/
const itemNameRef = ref(null); const editName = ref(false);
const editItemName = () => { editName.value = true; nextTick(()=> itemNameRef.value.focus()); }
const submitEditItemName = (item) => { 
    if(!!item.name){
        editName.value=false;
    }
    else if(!isNew.value) postItemEdit(item);
    
}
/************************
**edit item description logic
*************************/
const itemDescriptionRef = ref(null); const editDescription = ref(false);
const editItemDescription = () => {
  editDescription.value = true;
  nextTick(()=> itemDescriptionRef.value.focus())
}
const submitEditItemDescription = (item) => { 
    if(!!item.description){
        editDescription.value=false;
    }
    else if(!isNew.value) postItemEdit(item);
    
}
/***********
 * Edit Item Price
 *************/
const priceInputRef = ref(null); const editPrice = ref(false);
const editItemPrice = () =>{
    editPrice.value = true;
    requestAnimationFrame(()=>{
        priceInputRef.value?.focusInput();
    })
}
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
 const addOnNameFlag = ref(false); const addOnPriceFlag = ref(false); const removeNameFlag = ref(false);
 const optionsNameFlag = ref(false); const optionsValueFlag = ref(false);
 const addOnPriceInputRef = ref(null);
 const viewAddOns = ()=>{ removesFlag.value=optionsFlag.value=false; addOnsFlag.value=!addOnsFlag.value;}
 const viewRemoves = ()=>{ optionsFlag.value=addOnsFlag.value=false; removesFlag.value=!removesFlag.value;}
 const viewOptions = ()=>{ addOnsFlag.value=removesFlag.value=false; optionsFlag.value=!optionsFlag.value;}
 // new add-ons
 const newAddOn = ref({
    name: "",
    price: "000.00",
    _id: uuidv4(), 
});
const getAddOnPrice = (price) => {newAddOn.value.price = price;}
const pushAddOn = () => {
    props.menu.sections[sectionIndex].items[itemIndex].addOns.push(newAddOn.value);
    newAddOn.value = {
        name: "",
        price: "000.00",
        _id: uuidv4(), 
    }
    menuStore.updateMenu(props.menu);
}
const newAddOnFlag = ref(false);
const getAddOnFlag = (flag) => {
    newAddOn = {
        new: true,
        name: "",
        price: "000.00",
        _id: uuidv4(), 
    }
    newAddOnFlag.value = flag;
}
/*********
 * delete item logic
 ************/
const deleteItem = (item)=>{
    props.menu.sections[sectionIndex].items.splice(itemIndex, 1);
    menuStore.updateMenu(props.menu);
}
/*********
 * new item logic
 ************/
const isNew = ref(false);
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
    <div>
        <p class="item">
            <span class="btn-icons-group items">
                <template v-if="!isNew">
                    <button class="btn" @click="deleteItem(item)">
                        <i class="mdi mdi-close"/>
                        <span class="tooltip">delete</span>
                    </button>
                </template>
                <template v-else>
                    <button class="btn" @click="postNewItem(item)">
                        <i class="mdi mdi-plus"/>
                        <span class="tooltip">add new item</span>
                    </button>
                </template>
            </span>
            <span class="name-price">
                <input
                    v-if="editName"
                    type="text"
                    class="name-input"
                    placeholder="name"
                    ref="itemNameRef"
                    v-model="item.name"
                    @blur="submitEditItemName(item)"
                />
                <template v-if="!editName">
                    <span class="item-name" @click="editItemName">{{ item.name }}</span>
                </template>
                <template v-if="editPrice">
                    <PriceInput class="item-price-input" ref="priceInputRef" :price="item.price" @update-price="getItemPrice"/>
                </template>
                <template v-else>
                    <span class="item-price" @click="editItemPrice">{{ formatPriceDisplay(item.price)}}</span>
                </template>
            </span>
        </p>
        <p class="item-description">
            <template v-if="editDescription">
                <input
                    type="text"
                    class="item-description-input"
                    placeholder="description"
                    ref="itemDescriptionRef"
                    v-model="item.description"
                    @blur="submitEditItemDescription(item)"
                />
            </template>
            <template v-if="!editDescription">
                <span class="item-description-text" @click="editItemDescription">{{ item.description }}</span>
            </template>
        </p>
        <div class="item-addons-removes-options">
            <div class="item-a-r-o-titles">
                <span :class="{'underline': addOnsFlag}" @click="viewAddOns">Add-Ons</span>
                <span :class="{'underline': removesFlag}" @click="viewRemoves">Removes</span>
                <span :class="{'underline': optionsFlag}" @click="viewOptions">Options</span>
            </div>
            <div class="item-a-r-o-components">
                <div v-if="addOnsFlag">
                    <div class="new-addOn" v-if="newAddOnFlag">
                        <EditItemAddOn 
                            :addOn="newAddOn"
                            :item_id="item._id"
                            :section_id="section_id"
                            :menu="menu"/> 
                    </div>
                    <div v-for="(addOn, i) in item.addOns" :key="i">
                        <EditItemAddOn class="edit-item-addOns" 
                            :addOn="addOn"
                            :item_id="item._id"
                            :section_id="section_id"
                            :menu="menu"/> 
                    </div>
                </div>
                <div>
                    <EditItemRemove class="edit-item-removes" 
                        :removes="item.removes" :item_id="item._id" :section_id="section_id" :menu="menu" v-if="removesFlag"/>
                </div>
                <div>
                    <EditItemOption class="edit-item-options" 
                        :options="item.options" :item_id="item._id" :section_id="section_id" :menu="menu" v-if="optionsFlag"/>
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
.name-input{
    width: 100%;
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
.item-description-input{
    width: auto;
    padding: 0 2px;
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
.underline{
    border-bottom: 2px solid black;
}
.new-addOn{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
}
.new-addOn-input-field{
    padding-left: 5px;
    width: 200px;
}
.new-addOn-input.name{
    width: 200px;
}
.new-addOn-input.price{
    width: 180px;
}
</style>