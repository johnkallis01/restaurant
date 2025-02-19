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
const newAddOn = ref({ name: "", price: "000.00", _id: uuidv4(), isNew: true });
const newRemove = ref({ name: "", _id: uuidv4(), });
//array for dynamic tabs display and functions
const OAR = ref([
    {name:'options', flag: optionsModal, callback: ()=>{resetFlags();optionsModal.value=true;}},
    {name:'addOns', flag: addOnsFlag, callback: viewAddOns},
    {name:'removes', flag: removesFlag, callback: viewRemoves},
]);
//recieve the delete from modal
const getDelete=(item)=>{
    console.log('get delete',item)
    deleteModal.value = false;
    console.log(deleteModal.value)
    deleteItem();
}
//find the item index. delete it from the local data. send updated menu to database
function deleteItem(){
    
    const sectionIndex=localMenu.sections.findIndex(sec => sec._id === section_id);
    const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
    localMenu.sections[sectionIndex].items.splice(itemIndex, 1);
    menuStore.updateMenu(localMenu);
}
//closes the flag 
function postItemEdit(str){
    // console.log('post edit')
    if(str==='name') editName.value=false;
    else if (str ==='price') editPrice.value=false;
    else editDescription.value=false;
    if(!isNew.value){
        const sectionIndex=localMenu.sections.findIndex(sec => sec._id === section_id);
        const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
        localMenu.sections[sectionIndex].items[itemIndex]=localItem;
        menuStore.updateMenu(localMenu);
    }
}
//sends new item to the database
function postNewItem(){
    // console.log('post new')
    if(localItem.name){
        isNew.value=false;
        const sectionIndex=localMenu.sections.findIndex(sec => sec._id === section_id);
        localItem.position=localMenu.sections[sectionIndex].items.length;
        localMenu.sections[sectionIndex].items.push(localItem);
        menuStore.updateMenu(localMenu);
        emit('send-new-item-flag', false);
    }
}
//recieves the price from the emit;
const getItemPrice = (np) => {
    // console.log('x',np)
    editPrice.value = false;
    localItem.price = np;
    if(!isNew.value) postItemEdit('price');
}
//resets the values once the render is closed
const getResetAddOn = () => {newAddOn.value.isNew=true;newAddOn.value.name="";newAddOn.value.price="000.00";newAddOn.value._id=uuidv4();}
const getResetRemove = () =>{ newRemove.value.name= ""; newRemove.value._id=uuidv4(); }
//recieves the emit and deletes the addon item
const getDeleteAddOn = (index) => {
    localItem.addOns.splice(index, 1);
    const sectionIndex=localMenu.sections.findIndex(sec => sec._id === section_id);
    const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
    localMenu.sections[sectionIndex].items[itemIndex]=localItem;
    menuStore.updateMenu(localMenu);
}
//recieves the emit and deletes the remove item
const getDeleteRemove = (index) => {
    localItem.removes.splice(index, 1);
    const sectionIndex=localMenu.sections.findIndex(sec => sec._id === section_id);
    const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
    localMenu.sections[sectionIndex].items[itemIndex]=localItem;
    menuStore.updateMenu(localMenu);
}
//watches for one of the tabs to be open and sets heights accordingly;
//o for open is an array of length 2
watch(()=>[addOnsFlag.value,removesFlag.value],
    (o)=>{
        console.log('jjj',o)
        o.includes(true) ? containerRef.value.style.height='100%' : containerRef.value.style.height='80px';
    }
)
watch(()=>deleteModal,
    (o) => {
        o ? document.addEventListener('dragstart', stopDrag, true) : document.removeEventListener('dragstart', stopDrag, true);
    }
)
watch(()=> optionsModal, 
    (o)=>{
        o.includes(true) ? document.addEventListener('dragstart', stopDrag, true) : document.removeEventListener('dragstart', stopDrag, true);
    }
)
const clickOutsideOARtab = (event) => {clickInsideOK.value && !clickInsideOK.value.contains(event.target) ? resetFlags() : null;}
useEventListener('click', clickOutsideOARtab);
//focuses the input if new item
onMounted(()=>{ if(!localItem.name){ isNew.value = true; focusNameInput();}});
//prenvents drag for even listener when modals are open
const stopDrag=(event)=>{
    event.preventDefault();
}
//watches both flags for change
//when one is true the event listener is added to stop drag

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
    height: 26px;
    scrollbar-width: none;
}
.item-title{
    padding-top: 3px;
}
.item-container{
    height: 80px;
}
</style>