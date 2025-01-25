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
const { priceInputRef, editPrice, focusPriceInput, tabToPrice } = useTabToPrice();
const { nameInputRef, editName, focusNameInput, tabToName } = useTabToName();

const postEditAddOn = () => {
    editName.value=false;
    const addOnIndex = localMenu.sections[sectionIndex].items[itemIndex].addOns.findIndex((addOn)=> localAddOn._id === addOn._id);
    localMenu.sections[sectionIndex].items[itemIndex].addOns[addOnIndex] = localAddOn;  
    menuStore.updateMenu(localMenu);
} 
const postNewAddOn = (ao) => {
    if(localAddOn.name){
        localMenu.sections[sectionIndex].items[itemIndex].addOns.push({
            name: localAddOn.name,
            price: localAddOn.price,
            _id: localAddOn._id,
    });
        menuStore.updateMenu(localMenu);
        emit('send-reset-addOn');
        focusNameInput();
    }
}
const getAddOnPrice = (np) => {
    editPrice.value = false;
    localAddOn.price = np;
    if(!isNew.value) postEditAddOn();
} 
onMounted(()=>{
    if(!localAddOn.name){
        isNew.value = true;
        focusNameInput();
    }
});
</script>
<template>
    <div class="tab-container" @click.stop>
        <div class="item-title">
            <div class="button-name">
                <span class="btn-icons-group items">
                    <button class="btn" @click="emit('delete-add-on')" v-if="!isNew">
                        <i class="mdi mdi-close"/>
                        <span class="tooltip">delete</span>
                    </button>
                    <button class="btn" @click="postNewAddOn(localAddOn)" v-else>
                        <i class="mdi mdi-plus"/>
                        <span class="tooltip">add new add-on</span>
                    </button>
                </span>
                <div class="text-field item-name" v-if="editName">
                    <input 
                        type="text" placeholder="name" ref="nameInputRef"
                        v-model="localAddOn.name"
                        @blur="isNew ? postNewAddOn : postEditAddOn"
                        @keydown="tabToPrice"
                        @keydown.enter="isNew ? postNewAddOn : postEditAddOn"
                    />
                </div>
                <div v-if="!editName">
                    <span  class="item-name"
                        @click="focusNameInput; editName=true"
                        v-if="localAddOn.name"
                        >{{ localAddOn.name }}</span>
                    <span class="placeholder-color"
                        @click="focusNameInput"
                        v-else>name</span>
                </div>
            </div>
            <PriceInput class="item-price" ref="priceInputRef"
                v-if="editPrice"
                :price="localAddOn.price"
                @update-price="getAddOnPrice"
                @keydown.enter="postNewAddOn"
                />
            <span class="item-price"
                @click="focusPriceInput"
                v-else>
                {{ formatPrice(localAddOn.price) }}
            </span>
        </div>
    </div>
</template>