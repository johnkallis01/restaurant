<script setup>
import { v4 as uuidv4 } from 'uuid';
const emit = defineEmits(['send-new-item-flag']);
const { menu, section_id, item } = defineProps({
    menu: { type: Object, required: true},
    section_id: { type: String, required: true},
    item: { type: Object, required: true},
});
const sectionIndex = menu.sections.findIndex(sec => sec._id === section_id);
const itemIndex = menu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
const localItem=reactive(item);
const localMenu=reactive(menu);
const menuStore = useMenuStore();

const { formatPrice } = usePriceFormatter();
const { nameInputRef, editName, focusNameInput } = useNameInput();

const { tabToDescription, descriptionInputRef,editDescription,
    focusDescriptionInput} = useTabToDescription();

const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();

const {addOnsFlag, removesFlag, optionsFlag,resetFlags, viewAddOns,
     viewRemoves } = useAROFlags();



const isNew = ref(false);
const modalFlag=ref(false);
const newAddOn = ref({ name: "", price: "000.00", _id: uuidv4(), });
const newRemove = ref({ name: "", _id: uuidv4(), });
const OAR = ref([
    {name:'options', flag: optionsFlag, callback: ()=>modalFlag.value=true},
    {name:'addOns', flag: addOnsFlag, callback: viewAddOns},
    {name:'removes', flag: removesFlag, callback: viewRemoves},
    ]);
const clickInsideOK = ref(null);
const handleClickOutside = (event) => {
  if (clickInsideOK.value && !clickInsideOK.value.contains(event.target)) resetFlags();
}
onMounted(()=>{
    if(!localItem.name){
        isNew.value = true; 
        focusNameInput();
    }
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

// **************
// From Emits
// **************
const getItemPrice = (np) => {
    editPrice.value = false;
    localItem.price = np;
    if(!isNew.value) postItemEdit(localItem);
}
const getResetAddOn = () => {newAddOn.value = { name: "", price: "000.00", _id: uuidv4(),}}
const getResetRemove = () =>{newRemove.value = { name: "", _id: uuidv4(), }}
const closeModal = ()=>{modalFlag.value=false;}
/****************
 * Tab Controls
 ****************/
const tabToPrice = (event)=>{
    if(event.key==="Tab"){event.preventDefault();focusPriceInput();}
}
const tabToName = (event)=>{
    if(event.key==="Tab"){event.preventDefault();focusNameInput();}
}

const deleteItem = ()=>{
    localMenu.sections[sectionIndex].items.splice(itemIndex, 1);
    menuStore.updateMenu(localMenu);
  //  console.log('delete item disabled')
}
const postItemEdit = (it) => {
    if(!isNew.value){
        localMenu.sections[sectionIndex].items[itemIndex]=it;
        menuStore.updateMenu(localMenu);
    }
}
const submitEditItemName = (it) => { 
    if(!!localItem.name) editName.value=false;
    if(!isNew.value) postItemEdit(it);
}
const submitEditItemDescription = (it, event) => { 
    editDescription.value=false;
    if(!isNew.value) {postItemEdit(it);}
    else postNewItem(it)
}
const postNewItem = (it) => {
    if(it.name){
        const sectionIndex = localMenu.sections.findIndex(sec => sec._id === section_id);
        localMenu.sections[sectionIndex].items.push(it);
        menuStore.updateMenu(localMenu);
        emit('send-new-item-flag', false);
    }
}
</script>
<template>
    <div class="item-container">
        <div class="item-title">
            <div class="button-name">
                <span class="btn-icons-group items">
                    <template v-if="!isNew">
                        <button class="btn" @click="deleteItem" @keydown="tabToName" ref="buttonRef">
                            <i class="mdi mdi-close"/>
                            <span class="tooltip">delete</span>
                        </button>
                    </template>
                    <template v-else>
                        <button class="btn" @click="postNewItem(localItem)" @keydown="tabToName" ref="buttonRef">
                            <i class="mdi mdi-plus"/>
                            <span class="tooltip">add new item</span>
                        </button>
                    </template>
                </span>
                <template v-if="editName">
                    <div class="text-field item-name">
                        <input type="text" placeholder="name"
                            ref="nameInputRef"
                            v-model="localItem.name"
                            @blur="submitEditItemName(localItem)"
                            @keydown="tabToPrice"
                            />
                    </div>
                </template>
                <template v-if="!editName">
                    <span class="item-name"
                        v-if="localItem.name"
                        @click="focusNameInput"
                        >{{ localItem.name }}</span>
                        <span class="placeholder-color"
                            @click="focusNameInput"
                            v-else
                        >name</span>
                </template>
            </div>
            <template v-if="editPrice">
                <PriceInput class="item-price" ref="priceInputRef"
                    :price="localItem.price"
                    @keydown="tabToDescription"
                    @update-price="getItemPrice"/>
            </template>
            <template v-else>
                <span class="item-price" @click="focusPriceInput">{{ formatPrice(localItem.price)}}</span>
            </template>
         
        </div>
        <div class="item-description">
            <template v-if="editDescription">
                <div class="text-field description">
                    <textarea type="text" placeholder="description" ref="descriptionInputRef"
                        v-model="localItem.description"
                        @blur="submitEditItemDescription(localItem)"
                        />
                </div>
            </template>
            <template v-if="!editDescription">
                <span class="item-description-text"
                    v-if="localItem.description" 
                    @click="focusDescriptionInput">{{ localItem.description }}
                </span>
                <span class="placeholder-color" @click="focusDescriptionInput" v-else>description</span>
            </template>
        </div>
        <div class="item-addons-removes-options" ref="clickInsideOK">
            <div class="item-a-r-o-titles" >
                <template v-for="(el, i) in OAR" :key="i">
                    <button class="btn"
                        @click="el.callback" @keydown.enter="el.callback">
                        <span :class="{'underline': el.flag}" >{{ el.name }}</span>
                    </button>
                </template>
            </div>
            <div class="item-a-r-o-components">
                <div v-if="addOnsFlag">
                    <EditItemAddOn 
                        :addOn="newAddOn"
                        :item_id="localItem._id"
                        :section_id="section_id"
                        :menu="localMenu"
                        @send-reset-addon="getResetAddOn"
                    />
                    <EditItemAddOn 
                        :addOn="addOn"
                        :item_id="localItem._id"
                        :section_id="section_id"
                        :menu="localMenu"
                        v-for="(addOn, i) in localItem.addOns" :key="i"
                    />   
                </div>
                <div v-if="removesFlag">
                    <EditItemRemove 
                        :remove="newRemove"
                        :item_id="localItem._id"
                        :section_id="section_id"
                        :menu="localMenu"
                        @send-reset-remove="getResetRemove"
                    />
                    <EditItemRemove
                        :remove="remove"
                        :item_id="localItem._id"
                        :section_id="section_id"
                        :menu="localMenu"
                        v-for="(remove, i) in localItem.removes" :key="i"
                    /> 
                </div>
               
            </div>
        </div>
        <div v-if="modalFlag" class="modal">
            <ModalAddOptions :item="localItem" :section_id="section_id"
                :menu="localMenu" @close-modal="closeModal"/>               
        </div>
    </div>
</template>
<style scoped>
.modal{
    top: 15vh;
    left: 5vw;
    height: 80vh;
    width: 90vw;
}
</style>