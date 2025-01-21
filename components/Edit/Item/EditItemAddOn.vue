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
const { nameInputRef, editName, focusNameInput } = useNameInput();

const postEditAddOn = () => {
    editName.value=false;
    const addOnIndex = localMenu.sections[sectionIndex].items[itemIndex].addOns.findIndex((addOn)=> localAddOn._id === addOn._id);
    localMenu.sections[sectionIndex].items[itemIndex].addOns[addOnIndex] = localAddOn;  
    menuStore.updateMenu(localMenu);
} 
const postNewAddOn = (ao) => {
    if(ao.name){
        localMenu.sections[sectionIndex].items[itemIndex].addOns.push(ao);
        menuStore.updateMenu(localMenu);
        emit('send-reset-addOn');
        focusNameInput();
    }
}
 const tabToName = (event)=>{ if(event.key==="Tab"){ event.preventDefault(); focusNameInput();}}
 const tabToPrice = (event)=>{ if(event.key==="Tab"){ event.preventDefault(); focusPriceInput();}}

const getAddOnPrice = (np) => {
    editPrice.value = false;
    console.log('edit price')
    if(!isNew.value) {
        localAddOn.price = np;
        postEditAddOn;
    }
    else if (localAddOn.name) postNewAddOn({
        _id: localAddOn._id,
        name: localAddOn.name,
        price: np
    });
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
                <template v-if="editName">
                    <div class="text-field item-name">
                        <input 
                            type="text" placeholder="name" ref="nameInputRef"
                            v-model="localAddOn.name"
                            @blur="postEditAddOn"
                            @keydown="tabToPrice"
                        />
                    </div>
                </template>
                <template v-if="!editName">
                    <span  class="item-name"
                        @click="focusNameInput; editName=true"
                        v-if="localAddOn.name"
                        >{{ localAddOn.name }}</span>
                    <span class="placeholder-color"
                        @click="focusNameInput"
                        v-else>name</span>
                </template>
            </div>
            <template v-if="editPrice">
                <PriceInput class="item-price" ref="priceInputRef" 
                    :price="localAddOn.price"
                    @update-price="getAddOnPrice"
                    />
            </template>
            <template v-else>
                <span class="item-price" @click="focusPriceInput">{{ formatPrice(localAddOn.price) }}</span>
            </template>
        </div>
    </div>
</template>