<script setup>
import { watch } from 'vue';
const props = defineProps({
    menu: { type:Object, required: true},
    section: { type:Object, required: true},
    item: { type:Object, required: true},
});
const menuStore = useMenuStore();

const postItemEdit = (item) => {
    const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section._id);
    const itemIndex = props.section.items.findIndex(it => it._id === item._id);
    props.menu.sections[sectionIndex].items[itemIndex]=item;
    menuStore.updateMenu(props.menu);
}
/************************
**edit item name logic
*************************/
const itemNameRef = ref(null);
const editName = ref(false);
const editItemName = () => {
  editName.value = true;
  nextTick(()=> itemNameRef.value.focus())
}
const submitEditItemName = (item) => {
    editName.value = false;
    postItemEdit(item);
};
/************************
**edit item description logic
*************************/
const itemDescriptionRef = ref(null);
const editDescription = ref(false);
const editItemDescription = () => {
  editDescription.value = true;
  nextTick(()=> itemDescriptionRef.value.focus())
}
const submitEditItemDescription = (item) => {
    editDescription.value = false;
    postItemEdit(item);
};
/***********
 * Edit Item Price
 *************/
const priceInputRef = ref(null);
const editPrice = ref(false);
const editItemPrice = () =>{
    editPrice.value = true;
    requestAnimationFrame(()=>{
        priceInputRef.value?.focusInput();
    })
}
const getItemPrice = (newPrice) => {
    editPrice.value = false;
    props.item.price = newPrice;
    postItemEdit(props.item);
}
const formatPriceDisplay = (price) => {
    //remove leading zeros
    if(price[0] === "0") {
        price = price.replace(0,"");
        if(price[0] === "0") price = price.replace(0,"");
    }
    return "$" + price;
}
//delete item
const deleteItem = (item)=>{
    const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section._id);
    const itemIndex = props.section.items.findIndex(it => it._id === item._id);
    props.menu.sections[sectionIndex].items.splice(itemIndex, 1);
    menuStore.updateMenu(props.menu);
}
</script>
<template>
    <div>
        <p class="item">
            <span class="btn-icons-group items">
                <button class="btn" @click="deleteItem(item)">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
            </span>
            <span class="name-price">
                <template v-if="editName">
                    <input
                        type="text"
                        class="name-input"
                        ref="itemNameRef"
                        v-model="item.name"
                        @blur="submitEditItemName(item)"
                    />
                </template>
                <template v-else>
                    <span class="item-name" @click="editItemName">{{ item.name }}</span>
                </template>
                <template v-if="editPrice">
                    <PriceInput class="item-price-input" ref="priceInputRef" :price="item.price" @update:price="getItemPrice"/>
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
                    ref="itemDescriptionRef"
                    v-model="item.description"
                    @blur="submitEditItemDescription(item)"
                />
            </template>
            <template v-else>
                <span class="item-description-text" @click="editItemDescription">{{ item.description }}</span>
            </template>
        </p>
        <div class="item-addons-removes-options">
            <div class="item-addons" v-for="(addOn, i) in item.addOns" :key="i">
                <EditItemAddOns class="edit-item-addOns" 
                    :addOn="addOn" :item="item" :section="section" :menu="menu"/>
            </div>
            <div class="item-removes" v-for="(remove, i) in item.removes" :key="i">
                <EditItemRemoves class="edit-item-removes" 
                    :remove="remove" :item="item" :section="section" :menu="menu"/>
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
    min-width: 100%;
}
.item-addons-removes-options{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 20px;
    width: 100%;
}
</style>