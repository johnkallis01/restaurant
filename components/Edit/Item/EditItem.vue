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
const modalRef=ref(null);
const newAddOnFlag=ref(true);
const newRemoveFlag=ref(true);
const newAddOn = ref({ name: "", price: "000.00", _id: uuidv4(), });
const newRemove = ref({ name: "", _id: uuidv4(), });
const OAR = ref([
    {name:'options', flag: optionsFlag, callback: ()=> {if(localItem.name) {resetFlags();modalFlag.value=true}}},
    {name:'addOns', flag: addOnsFlag, callback: viewAddOns},
    {name:'removes', flag: removesFlag, callback: viewRemoves},
    ]);
const clickInsideOK = ref(null);


// **************
// From Emits
// **************
const getItemPrice = (np) => {
    editPrice.value = false;
    localItem.price = np;
    if(!isNew.value) postItemEdit(localItem);
}
const getResetAddOn = () => {newAddOn.value.name="";newAddOn.value.price="000.00";newAddOn.value._id=uuidv4();}
const getResetRemove = () =>{ newRemove.value.name= ""; newRemove.value._id=uuidv4(); }
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
    else if(!isNew.value) postItemEdit(it);
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
const getDeleteAddOn = (index) => {
    localItem.addOns.splice(index, 1);
    localMenu.sections[sectionIndex].items[itemIndex]=localItem;
    menuStore.updateMenu(localMenu);
}
const getDeleteRemove = (index) => {
    localItem.removes.splice(index, 1);
    localMenu.sections[sectionIndex].items[itemIndex]=localItem;
    menuStore.updateMenu(localMenu);
}
const itemContainerRef=ref(null);
const clickOutsideOARtab = (event) => {
    if (clickInsideOK.value && !clickInsideOK.value.contains(event.target)) resetFlags();
}
onMounted(()=>{
    if(!localItem.name){
        isNew.value = true; 
        focusNameInput();
    }
    document.addEventListener('click', clickOutsideOARtab);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutsideOARtab);
});
</script>
<template>
    <div class="item-container" ref="itemContainerRef">
        <div class="item-title">
            <div class="button-name">
                <span class="btn-icons-group items">
                    <button class="btn" ref="buttonRef"
                        @click="deleteItem"
                        @keydown="tabToName"
                        v-if="!isNew">
                        <i class="mdi mdi-close"/>
                        <span class="tooltip">delete</span>
                    </button>
                    <button class="btn" ref="buttonRef"
                        @click="postNewItem(localItem)"
                        @keydown="tabToName" 
                        v-else>
                        <i class="mdi mdi-plus"/>
                        <span class="tooltip">add new item</span>
                    </button>
                </span>
                <div class="text-field item-name" v-if="editName">
                    <input type="text" placeholder="name"
                        ref="nameInputRef"
                        v-model="localItem.name"
                        @blur="submitEditItemName(localItem)"
                        @keydown="tabToPrice"
                        />
                </div>
                <div v-else>
                    <span class="item-name"
                        v-if="localItem.name"
                        @click="focusNameInput"
                        >{{ localItem.name }}</span>
                        <span class="placeholder-color"
                            @click="focusNameInput"
                            v-else
                        >{{ 'name' }}</span>
                </div>
            </div>
            
            <PriceInput class="item-price" ref="priceInputRef"
                v-if="editPrice"
                :price="localItem.price"
                @keydown="tabToDescription"
                @update-price="getItemPrice"/>
            <span class="item-price" @click="focusPriceInput" v-else>
                {{ formatPrice(localItem.price)}}
            </span>
        </div>
        <div class="item-description">
            <div class="text-field description" v-if="localItem.name ? editDescription : false">
                <textarea type="text" placeholder="description" ref="descriptionInputRef"
                    v-model="localItem.description"
                    @blur="submitEditItemDescription(localItem)"
                    />
            </div>
            <div v-if="!editDescription">
                <span class="item-description-text"
                    v-if="localItem.description" 
                    @click="focusDescriptionInput">{{ localItem.description }}
                </span>
                <span class="placeholder-color" @click="focusDescriptionInput" v-else>description</span>
            </div>
        </div>
        <div class="item-addons-removes-options" ref="clickInsideOK">
            <div class="item-a-r-o-titles" v-if="!isNew">
                <button class="btn"
                    v-for="(el, i) in OAR" :key="i"
                    @click="el.callback"
                    @keydown.enter="el.callback">
                    <span :class="{'underline': el.flag}" >{{ el.name }}</span>
                </button>
            </div>
            <div class="item-a-r-o-titles mods" v-else>{{ "Add Mods after item creation" }}</div>
            <div class="item-a-r-o-components">
                <div v-if="addOnsFlag">
                    <EditItemAddOn
                        v-if="newAddOnFlag"
                        :addOn="newAddOn"
                        :item_id="localItem._id"
                        :section_id="section_id"
                        :menu="localMenu"
                        @send-reset-addOn="getResetAddOn"
                    />
                    <EditItemAddOn
                        v-for="(ao, i) in localItem.addOns" :key="ao._id"
                        @delete-add-on="getDeleteAddOn(i)"
                        :addOn="ao"
                        :item_id="localItem._id"
                        :section_id="section_id"
                        :menu="localMenu"
                        
                    />   
                </div>
                <div v-if="removesFlag">
                    <EditItemRemove 
                        v-if="newRemoveFlag"
                        :remove="newRemove"
                        :item_id="localItem._id"
                        :section_id="section_id"
                        :menu="localMenu"
                        @send-reset-remove="getResetRemove"
                    />
                    <EditItemRemove
                        v-for="(r, i) in localItem.removes" :key="r._id"
                        @delete-remove="getDeleteRemove(i)"
                        :remove="r"
                        :item_id="localItem._id"
                        :section_id="section_id"
                        :menu="localMenu"
                    /> 
                </div>
               
            </div>
        </div>
        <div class="modalWrapper" v-if="modalFlag">
            <div class="modal" ref="modalRef">
                <ModalAddOptions :item="localItem" :section_id="section_id" 
                    :menu="localMenu" @close-modal="closeModal"/>               
            </div>
        </div>
    </div>
</template>
<style scoped>
.item-a-r-o-titles.mods{
    font-size: 12px;
}
</style>