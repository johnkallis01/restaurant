<script setup>
import { v4 as uuidv4 } from 'uuid';
const emit = defineEmits(['send-new-item-flag']);
const { menu, section_id, item } = defineProps({
    menu: { type: Object, required: true},
    section_id: { type: String, required: true},
    item: { type: Object, required: true},
});
const localItem=reactive(item);
const localMenu=reactive(menu);
const menuStore = useMenuStore();
const { formatPrice } = usePriceFormatter();

const modalRef=ref(null);
const clickInsideOK = ref(null);

const isNew = ref(false);
const newAddOnFlag=ref(true);
const newRemoveFlag=ref(true);
const optionsModal=ref(false);
const deleteModal=ref(false);

const nameInputRef=ref(null);
const descriptionInputRef=ref(null);
const editName = ref(false);
const editDescription = ref(false);
const containerRef=ref(null);
const focusNameInput = useFocusInput(nameInputRef,editName);
const focusDescriptionInput = useFocusInput(descriptionInputRef,editDescription);
const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
const tabToPrice = useTabToInput(focusPriceInput);
const tabToName=useTabToInput(focusNameInput);
const tabToDescription=useTabToInput(focusDescriptionInput);
const {addOnsFlag, removesFlag, resetFlags, viewAddOns,viewRemoves } = useAROFlags();
const sectionIndex=localMenu.sections.findIndex(sec => sec._id === section_id);
const newAddOn = ref({ name: "", price: "000.00", _id: uuidv4(), isNew: true });
const newRemove = ref({ name: "", _id: uuidv4(), });
const OAR = ref([
    {name:'options', flag: optionsModal, callback: ()=>{resetFlags();optionsModal.value=true;}},
    {name:'addOns', flag: addOnsFlag, callback: viewAddOns},
    {name:'removes', flag: removesFlag, callback: viewRemoves},
]);
const getDelete=()=>{
    // console.log('get delete')
    deleteModal.value=false;
    deleteItem();
}
function deleteItem(){
    const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
    localMenu.sections[sectionIndex].items.splice(itemIndex, 1);
    menuStore.updateMenu(localMenu);
}
function postItemEdit(str){
    // console.log('post edit')
    switch(str){
        case 'name':
            editName.value=false;
            break;
        case 'price':
            editPrice.value=false;
            break;
        case 'description':
            editDescription.value=false;
            break;
    }
    if(!isNew.value){
        const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
        localMenu.sections[sectionIndex].items[itemIndex]=localItem;
        menuStore.updateMenu(localMenu);
    }
}
function postNewItem(){
    // console.log('post new')
    if(localItem.name){
        isNew.value=false;
        localItem.position=localMenu.sections[sectionIndex].items.length;
        localMenu.sections[sectionIndex].items.push(localItem);
        menuStore.updateMenu(localMenu);
        emit('send-new-item-flag', false);
    }
}
const getItemPrice = (np) => {
    // console.log('x',np)
    editPrice.value = false;
    localItem.price = np;
    if(!isNew.value) postItemEdit('price');
}
const getResetAddOn = () => {newAddOn.value.isNew=true;newAddOn.value.name="";newAddOn.value.price="000.00";newAddOn.value._id=uuidv4();}
const getResetRemove = () =>{ newRemove.value.name= ""; newRemove.value._id=uuidv4(); }
const getDeleteAddOn = (index) => {
    localItem.addOns.splice(index, 1);
    const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
    localMenu.sections[sectionIndex].items[itemIndex]=localItem;
    menuStore.updateMenu(localMenu);
}
const getDeleteRemove = (index) => {
    localItem.removes.splice(index, 1);
    const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
    localMenu.sections[sectionIndex].items[itemIndex]=localItem;
    menuStore.updateMenu(localMenu);
}
watch(()=>[addOnsFlag.value,removesFlag.value],
    ()=>{
        addOnsFlag.value||removesFlag.value ? containerRef.value.style.height='100%' : containerRef.value.style.height='80px';
    }
)
const clickOutsideOARtab = (event) => {clickInsideOK.value && !clickInsideOK.value.contains(event.target) ? resetFlags() : null;}
useEventListener('click', clickOutsideOARtab);
onMounted(()=>{ if(!localItem.name){ isNew.value = true; focusNameInput();}});
watch([optionsModal,deleteModal], (open) => {
    console.log('edit item watch')
    console.log(open.includes(true))
    if(open.includes(true)) document.addEventListener('dragstart', stopDrag, true);
    else document.removeEventListener('dragstart', stopDrag, true);
});
const stopDrag=(event)=>{
    event.preventDefault();
}
</script>
<template>
    <div class="item-container" ref="containerRef">
        <div class="item-title">
            <div class="button-name">
                <button class="btn delete" ref="buttonRef"
                    @click="deleteModal=true"
                    @keydown="tabToName"
                    v-if="!isNew">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
                <button class="btn delete" ref="buttonRef"
                    @click="postNewItem()"
                    @keydown="tabToName" 
                    v-else>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add new item</span>
                </button>
                <div class="text-field" v-if="editName">
                    <input type="text" placeholder="name"
                        ref="nameInputRef"
                        v-model="localItem.name"
                        @blur="isNew ? editName=false : postItemEdit('name')"
                        @keydown.enter="isNew ? postNewItem() : postItemEdit('name')"
                        @keydown="tabToPrice"/>
                </div>
                <template v-else>
                    <span class="item-name"
                        v-if="localItem.name"
                        @click="focusNameInput"
                        >{{ localItem.name}}</span>
                    <span class="placeholder-color"
                        @click="focusNameInput"
                        v-else>{{ 'name' }}</span>
                </template>
            </div>
            <PriceInput class="item-price" ref="priceInputRef"
                v-if="editPrice"
                :price="localItem.price"
                @keydown="tabToDescription"
                @blur="isNew ? editPrice=false : postItemEdit('price')"
                @keydown.enter="isNew ? postNewItem() : postItemEdit('price')"
                @update-price="getItemPrice"/>
            <div class="item-price" @click="focusPriceInput" v-else>
                {{ formatPrice(localItem.price)}}
            </div>
        </div>
        <div class="item-description">
            <div class="text-field description" v-if="editDescription">
                <textarea type="text" placeholder="description" ref="descriptionInputRef"
                    v-model="localItem.description"
                    @blur="isNew ? editDescription=false : postItemEdit('description')"
                    @keydown.enter="isNew ? 
                    ( localItem.name ? postNewItem() : editDescription=false ) :
                     postItemEdit('description')"/>
            </div>
            <div v-if="!editDescription">
                <span class="item-description-text"
                    v-if="localItem.description.length" 
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
            <div class="item-a-r-o-titles" v-else><span class="title-text">{{ "Add Mods after item creation" }}</span></div>
            <div class="item-a-r-o-components">
                <span v-if="addOnsFlag">
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
                </span>
                <span v-if="removesFlag">
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
                </span>
               
            </div>
        </div>
        <div class="modalWrapper" v-if="optionsModal">
            <div class="modal options" ref="modalRef">
                <ModalAddOptions :item="localItem" :section_id="section_id" 
                    :menu="localMenu" @close-modal="optionsModal=false"/>               
            </div>
        </div>
        <div class="modalWrapper" v-if="deleteModal">
            <ModalDelete class="modal delete" :item="localItem" itemType="Item" @close-modal="deleteModal=false" @delete-item="getDelete"/>
        </div>
    </div>
</template>
<style scoped>
.btn.delete{
    margin: 1px 1px 0 1px;
}
.title-text{
    font-size: 13px;
    padding-bottom: 3px;
}
.item-description{
    height: 38px;
}
.item-description textarea{
    height: 32px;
    scrollbar-width: none;
}
.item-title{
    padding-top: 3px;
}
</style>