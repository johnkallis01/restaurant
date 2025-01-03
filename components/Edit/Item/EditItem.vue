<script setup>
import { watch } from 'vue';

const props = defineProps({
    menu: { type:Object, required: true},
    section: { type:Object, required: true},
    item: { type:Object, required: true},
})
const menuStore = useMenuStore();
const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section._id);
const itemIndex = props.section.items.findIndex(it => it._id === props.item._id);

const itemDescriptionRef = ref(null);


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
    console.log(props.menu.sections[sectionIndex])
    console.log(item.price)
   // menuStore.updateMenu(props.menu);
};
/***********
 * Edit Item Price
 *************/
const itemPriceRef = ref(null);
const rawPrice = ref(props.item.price);
watch(
    () => props.item.price,
    (newPrice) => {
        rawPrice.value = newPrice.replace('.', ''); //removes the decimal
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
    console.log(event)
    if(event.inputType === "deleteContentBackward"){
        rawPrice.value = "0"+rawPrice.value.slice(0,-1);
        event.target.value = formattedPrice.value;
        return;
    }
    else if(event.inputType === "deleteContentFormward"){
        event.preventDefault();
        return;
    }
    else if(!/^\d$/.test(inputChar)){
        rawPrice.value=formattedPrice.value; //update the input with previous value in format 000.00
        return;
     }
     rawPrice.value = (rawPrice.value + inputChar).slice(-5);
     event.target.value = formattedPrice.value;
}
const submitPriceChange = ()=>{
    console.log('submit')
    props.item.editPrice = false;
    props.item.price = rawPrice.value;
    console.log(props.item.price)
}
const disableDelete=(event)=>{
    console.log(event.key)
    if(event.key==="Delete") event.preventDefault();
    
}
const formatPrice = (price) => {
    let priceString =  price.slice(0,3) + "." + price.slice(3,5);
    if(priceString[0] === "0") {
        priceString = priceString.replace(0,"");
        if(priceString[0] === "0") priceString = priceString.replace(0,"");
    }
    return "$" + priceString;
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
onMounted(()=>{
    addItemFlags();
})
</script>
<template>
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
                        @keydown="disableDelete"
                        @blur="submitPriceChange"
                    >
                </div>
            </template>
            <template v-else>
                <span class="item-price" @click="editItemPrice(item)">{{ formatPrice(item.price)}}</span>
            </template>
        </span>
    </p>
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
</style>