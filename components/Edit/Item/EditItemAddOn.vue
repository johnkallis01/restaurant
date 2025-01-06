<script setup>
const props = defineProps({
    addOn: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
    
});
const menuStore = useMenuStore();
const postEditAddOn = (addOn) => {
    const sectionIndex = props.menu.sections.findIndex((sec)=>sec._id === props.section_id);
    const itemIndex = props.menu.sections[sectionIndex].items.findIndex((it)=>it._id===props.item_id);
    const addOnIndex = props.menu.sections[sectionIndex].items[itemIndex].addOns.findIndex((addOn)=> addOn._id === props.addOn._id);
    props.menu.sections[sectionIndex].items[itemIndex].addOns[addOnIndex] = addOn;   
    menuStore.updateMenu(props.menu);
}
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
    editName.value=false;
    postEditAddOn(addOn);
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
    postEditAddOn(addOn);
}
/****************
 * new add on logic
 ********************/
const isNew = ref(false);
onMounted(()=>{
    if(props.addOn?.new){
        isNew.value = true; editName.value=true; editDescription.value=true;
        delete props.addOn.new;
    }
});
const emit = defineEmits(['send-new-item-flag']);
const postNewItem = (item) => {
    if(item.name){
        const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section_id);
        props.menu.sections[sectionIndex].items.push(item);
        menuStore.updateMenu(props.menu);
        emit('send-new-item-flag', false);
    }
}
const postNewAddOn = (addOn) => {
    if(addOn.name){
        const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section_id);
        const itemIndex = props.menu.sections[sectionIndex].items.findIndex(it => it._id === props.item_id);
        props.menu.sections[sectionIndex].items[itemIndex].addOns.push(addOn);
        menuStore.updateMenu(props.menu);
    }
}
</script>
<template>
    <div class="addOn-container">
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
        <template v-if="editName">
            <input
                type="text"
                class="name-input"
                placeholder="name"
                ref="nameInputRef"
                v-model="addOn.name"
                @blur="submitEditAddOnName(addOn)"
            />
        </template>
        <template v-else>
            <span @click="editAddOnName(addOn)">{{ addOn.name }}</span>
        </template>
        <template v-if="editPrice">
            <PriceInput ref="priceInputRef" :price="addOn.price" @update-price="getAddOnPrice"/>
        </template>
        <template v-else>
            <div @click="editAddOnPrice">{{ formatPriceDisplay(addOn.price) }}</div>
        </template>
</div>
</template>
<style scoped>
.addOn-name{
    row-gap: 100px;
    margin-left: 30px;
}
.new-addOn{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.addOn-container{
    display: flex;
    justify-content: space-between;
}
</style>