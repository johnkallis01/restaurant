<script setup>
const emit = defineEmits(['send-reset-addOn', 'delete-add-on']);
const {addOn,item_id, section_id, menu} = defineProps(
{
    addOn: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},});

const menuStore = useMenuStore();
const localMenu=reactive(menu);
const localAddOn=reactive(addOn);
const isNew = ref(false);
const sectionIndex = localMenu.sections.findIndex(sec => sec._id === section_id);
const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item_id);

const { formatPrice } = usePriceFormatter();
const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
const tabToPrice=useTabToInput(focusPriceInput);
const editName = ref(false);
const nameInputRef=ref(null);
const focusNameInput = useFocusInput(nameInputRef,editName);
function postEditAddOn() {
    editName.value=false;
    const addOnIndex = localMenu.sections[sectionIndex].items[itemIndex].addOns.findIndex((addOn)=> localAddOn._id === addOn._id);
    localMenu.sections[sectionIndex].items[itemIndex].addOns[addOnIndex] = localAddOn;  
    menuStore.updateMenu(localMenu);
} 
function postNewAddOn(){
    console.log(localAddOn.price)
    delete localAddOn.isNew;
    if(localAddOn.name){
        localMenu.sections[sectionIndex].items[itemIndex].addOns.push({
            name: localAddOn.name,
            price: localAddOn.price,
            _id: localAddOn._id,
        });
        emit('send-reset-addOn');
        menuStore.updateMenu(localMenu);
        focusNameInput();
    }
}
const getAddOnPrice = (np) => {
    // console.log('get price')
    // console.log(np)
    editPrice.value = false;
    localAddOn.price = np;
    if(!isNew.value) postEditAddOn();
}
watch(()=>editName.value,() => {
    editName.value ? focusNameInput():null;
})
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
/* .button-name{
    left: 0;
} */
.item-price{
    right: 0;
}
.item-title{
    width: 280px;
}
@media (max-width: 840px){
    .item-title{
        width: 280px;

    }
}
</style>