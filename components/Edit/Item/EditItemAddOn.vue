<script setup>
const emit = defineEmits(['send-reset-addOn', 'delete-add-on']);
const {addOn,item_id, section_id, menu} = defineProps({
    addOn: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true}
});
const menuStore = useMenuStore();
const localMenu=reactive(menu);
const localAddOn=reactive(addOn);
const isNew = ref(false);
const { formatPrice } = usePriceFormatter();
const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
const tabToPrice=useTabToInput(focusPriceInput);
const editName = ref(false);
const nameInputRef=ref(null);
const focusNameInput = useFocusInput(nameInputRef,editName);
//updates changes made to existing addOn
function getIndexes(){
    const sectionIndex = localMenu.sections.findIndex(sec => sec._id === section_id);
    const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item_id);
    const addOnIndex = localMenu.sections[sectionIndex].items[itemIndex].addOns.findIndex((addOn)=> localAddOn._id === addOn._id);
    return {sectionIndex, itemIndex, addOnIndex};
}
function postEditAddOn() {
    editName.value=false;
    const {sectionIndex, itemIndex, addOnIndex} = getIndexes();
    localMenu.sections[sectionIndex].items[itemIndex].addOns[addOnIndex] = localAddOn;  
    menuStore.updateMenu(localMenu);
} 
function postNewAddOn(){
    console.log(localAddOn.price)
    //deletes unnessary data
    delete localAddOn.isNew;
    //if there is a name add this data to appear on page
    const {sectionIndex, itemIndex} = getIndexes();
    if(localAddOn.name){
        localMenu.sections[sectionIndex].items[itemIndex].addOns.push({
            name: localAddOn.name,
            price: localAddOn.price,
            _id: localAddOn._id,
        });
        //tells parent to send a new blank component
        emit('send-reset-addOn');
        //write to db
        menuStore.updateMenu(localMenu);
    }
}
//recives the price from the custom price component
const getAddOnPrice = (np) => {
    // console.log('get price')
    // console.log(np)
    editPrice.value = false;
    localAddOn.price = np;
    if(!isNew.value) postEditAddOn();
}
//watches for the input to appear and then focuses the input
watch(()=>editName.value,(n) => {
    n ? focusNameInput():null;
})
//opens the input when new and focuses
onMounted(()=>{
    if(localAddOn.isNew){
        isNew.value = true; editName.value=true;
    }
    if(editName.value) focusNameInput();
});
</script>
<template>
    <div class="tab-container" @click.stop>
        <div class="item-title">
            <div class="button-name">
                <button class="btn delete" @click="emit('delete-add-on')" v-if="!isNew">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
                <button class="btn delete" @click="postNewAddOn(localAddOn)" v-else>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add new add-on</span>
                </button>
                <div class="text-field item-name" v-if="editName">
                    <input 
                        type="text" placeholder="name" ref="nameInputRef"
                        v-model="localAddOn.name"
                        @blur="isNew ? editName=false : postEditAddOn()"
                        @keydown="tabToPrice"
                        @keydown.enter="isNew ? postNewAddOn() : postEditAddOn()"
                    />
                </div>
                <div v-else>
                    <span  class="item-name"
                        v-if="localAddOn.name"
                        @click="focusNameInput; editName=true"    
                        >{{ localAddOn.name }}</span>
                    <span class="placeholder-color"
                        @click="focusNameInput"
                        v-else>name</span>
                </div>
            </div>
            <PriceInput class="item-price" ref="priceInputRef"
                v-if="editPrice"
                :price="localAddOn.price"
                @update-price="getAddOnPrice($event)"
                @blur="isNew ? postNewAddOn() : postEditAddOn()"
                @keydown.enter="isNew ? postNewAddOn() : postEditAddOn()"
                />
            <span class="item-price"
                @click="focusPriceInput"
                v-else>
                {{ formatPrice(localAddOn.price) }}
            </span>
        </div>
    </div>
</template>
<style scoped>
.item-price{
    right: 0;
}
.item-title{
    width: 280px;
}
@media (max-width: 700px){
  .item-title{
    width: 240px;
  }
}
@media(max-width: 600px){
  .item-title{
    width: 395px;
  }
}
@media(max-width: 520px){
  .item-title{
    width: 340px;
  }
}
@media(max-width: 400px){
  .item-title{
    width: 290px;
  }
}
</style>