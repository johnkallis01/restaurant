<script setup>
import { watch } from 'vue';
const menuStore = useMenuStore();
const props = defineProps({
    menu: { type:Object, required: true},
    section: { type:Object, required: true},
    item: { type:Object, required: true},
});
const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section._id);
const itemIndex = props.section.items.findIndex(it => it._id === props.item._id);

/************************
**edit item name logic
*************************/
const itemNameRef = ref(null);
const editItemName = (item) => {
  item.editName = true;
  nextTick(()=> itemNameRef.value.focus())
}
const submitEditItemName = (item) => {
    item.editName = false;
    let newItem = item;
    delete newItem.editName;
    delete newItem.editDescription;
    delete newItem.editPrice;
    props.menu.sections[sectionIndex].items[itemIndex] = newItem;
   // menuStore.updateMenu(props.menu);
};
/************************
**edit item description logic
*************************/
const itemDescriptionRef = ref(null);
const editItemDescription = (item) => {
  item.editDescription = true;
  nextTick(()=> itemDescriptionRef.value.focus())
}
const submitEditItemDescription = (item) => {
    item.editDescription = false;
    let newItem = item;
    delete newItem.editName;
    delete newItem.editDescription;
    delete newItem.editPrice;
    props.menu.sections[sectionIndex].items[itemIndex] = newItem;
   // menuStore.updateMenu(props.menu);
};
/***********
 * Edit Item Price
 *************/
const itemPriceRef = ref(null);
const rawPrice = ref(props.item.price.replace('.', ''));
watch(
  () => props.item.price,
  (newPrice) => {
    rawPrice.value = newPrice.replace('.', '');
  }
);
const editItemPrice = (item) => {
  item.editPrice = true;
  nextTick(() => itemPriceRef.value.focus())
};
const formattedPrice = computed(()=>{
    const leftHandSide = rawPrice.value.slice(0,3); // left 3 values
    const rightHandSide = rawPrice.value.slice(-2); // right 2 values
    return leftHandSide + "." + rightHandSide; //add the decimal back in
});
const formatPriceInput = (event) => {
    const inputChar = event.data;
    if(event.inputType === "deleteContentBackward"){
        rawPrice.value = "0"+rawPrice.value.slice(0,-1);
        event.target.value = formattedPrice.value;
        return;
    }
    if(!/^\d$/.test(inputChar)){
        event.target.value=formattedPrice.value;
    if(!/^\d$/.test(inputChar)){
        event.target.value=formattedPrice.value;
        return;
    }    
    }    
     rawPrice.value = (rawPrice.value + inputChar).slice(-5);
     event.target.value = formattedPrice.value;
}
const submitPriceChange = (event)=>{
    props.item.editPrice = false;
    props.item.price = rawPrice.value;
    props.item.price = formattedPrice.value;
}
const formatPriceDisplay = (price) => {
    //remove leading zeros
    if(price[0] === "0") {
        price = price.replace(0,"");
        if(price[0] === "0") price = price.replace(0,"");
    }
    return "$" + price;
}
/***Add Flags for Edits*****/
const addItemFlags = (item) => {
    item = {
        ...item,
        editName: false,
        editDescription: false,
        editPrice: false,
    }
}
onMounted(()=>{addItemFlags();})
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
                <template v-if="item.editName">
                    <input
                        type="text"
                        class="name-input"
                        ref="itemNameRef"
                        v-model="item.name"
                        @blur="submitEditItemName(item)"
                    />
                </template>
                <template v-else>
                    <span class="item-name" @click="editItemName(item)">{{ item.name }}</span>
                </template>
                <template v-if="item.editPrice">
                    <div class="item-price-input">
                        <span class="prefix">$</span>
                        <input
                            class="item-price-input-field"
                            type="text"
                            ref="itemPriceRef"
                            :value="formattedPrice"
                            @input="formatPriceInput"                
                            @blur="submitPriceChange"
                        >
                    </div>
                </template>
                <template v-else>
                    <span class="item-price" @click="editItemPrice(item)">{{ formatPriceDisplay(item.price)}}</span>
                </template>
            </span>
        </p>
        <p class="item-description">
            <template v-if="item.editDescription">
                <input
                    type="text"
                    class="item-description-input"
                    ref="itemDescriptionRef"
                    v-model="item.description"
                    @blur="submitEditItemDescription(item)"
                />
            </template>
            <template v-else>
                <span class="item-description-text" @click="editItemDescription(item)">{{ item.description }}</span>
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
.item-price-input-field{
    width: auto;
    padding: 0 2px;
    text-align: right;
    max-width: 80px;
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