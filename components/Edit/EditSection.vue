<script setup>
import { v4 as uuidv4 } from 'uuid';
const emit = defineEmits(['send-new-section-flag']);
const {section, menu} = defineProps({
    section: { type:Object, required: true},
    menu: { type:Object, required: true},
});
const menuStore = useMenuStore();
const localMenu = reactive(menu);
const localSection = reactive(section);
const deleteModalFlag=ref(false); const addOptionsModalFlag=ref(false);
const nameInputRef=ref(null); const descriptionInputRef = ref(null);
const editName=ref(false); const editDescription = ref(false);
const isNew = ref(false); const addItem = ref(false);
const newItem = ref({
        new: true,
        name: "",
        price: "000.00",
        description: "",
        addOns: [],
        removes: [],
        options: [],
        position: 0,
        _id: uuidv4(),
});
function updateMenu(){
    const sectionIndex = menu.sections.findIndex(sec => sec._id === section._id);
    localMenu.sections[sectionIndex]=localSection;
    menuStore.updateMenu(localMenu);
}
function postSectionEdit(str){
    switch(str){
        case 'name':
            editName.value=false;
            break;
        case 'description':
            editDescription.value=false;
            break;
    }
    if(!isNew.value){
        updateMenu();
    }
    
}
const getDelete=()=>{
    deleteModalFlag.value=false;
    deleteSection();
}
function deleteSection(){
    const sectionIndex = menu.sections.findIndex(sec => sec._id === section._id);
    localMenu.sections.splice(sectionIndex, 1);
    menuStore.updateMenu(localMenu);
}
function postNewSection(){
    if(localSection.name){
        localMenu.sections.push(localSection);
        menuStore.updateMenu(localMenu);
        emit('send-new-section-flag');  
    }
}
function addNewItem(){
    addItem.value=!addItem.value;
    newItem.value = {
        name: "",
        price: "000.00",
        description: "",
        addOns: [],
        removes: [],
        options: [],
        _id: uuidv4(),
    }
}
const draggedItemIndex=ref(null);
const onDrop=(newIndex)=>{
    console.log('onDrop')
    if(!draggedItemIndex.value) return;
    const draggedItem = section.items[draggedItemIndex.value];
    localSection.items.splice(draggedItemIndex.value, 1);
    localSection.items.splice(newIndex,0,draggedItem);
    localSection.items.forEach((item, i)=> item.position=i)
    // updateMenu();
    draggedItemIndex.value=null;
}

const droppedOnIndex=ref(null);
const onTouchStart=(event, index)=>{
    draggedItemIndex.value=index;
    console.log(draggedItemIndex.value)
}
const onTouchMove = (event) => {
    event.preventDefault(); // Prevent scrolling while dragging
    const touch = event.touches[0];
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    droppedOnIndex.value=target;
};
const onTouchEnd=()=>{
    if(droppedOnIndex.value?.className){
        while(droppedOnIndex.value?.className!=='item-container'){
            droppedOnIndex.value=droppedOnIndex.value.parentElement;
            console.log(droppedOnIndex.value)
        }
        droppedOnIndex.value=Number(droppedOnIndex.value.dataset.index);
        console.log(droppedOnIndex.value,draggedItemIndex.value)
        // if(!draggedItemIndex.value) return;
        const draggedItem = section.items[draggedItemIndex.value];
        localSection.items.splice(draggedItemIndex.value, 1);
        localSection.items.splice(droppedOnIndex.value,0,draggedItem);
        localSection.items.forEach((item, i)=> item.position=i);
        // updateMenu();
        draggedItemIndex.value=null;
        droppedOnIndex.value=null;

    }
    // console.log(draggedItemIndex.value,event)
}


const focusDescriptionInput = useFocusInput(descriptionInputRef,editDescription);
const focusNameInput = useFocusInput(nameInputRef, editName);
const tabToDescription = useTabToInput(focusDescriptionInput);
onMounted(()=>{if(!localSection.name){isNew.value = true;focusNameInput();}})
</script>
<template>
    <div class="section-container">
        <div class="section-name">
            <span class="left-btns">
                <button class="btn delete" @click="postNewSection()" v-if="isNew">
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add section</span>
                </button>
                <button class="btn delete" @click="deleteModalFlag=true" v-else>
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete section</span>
                </button>
                <template v-if="editName">
                    <div class="text-field name">
                        <input
                            type="text"
                            ref="nameInputRef"
                            v-model="localSection.name"
                            @blur="isNew ? editName=false : postSectionEdit('name')"
                            @keydown.enter="isNew ? postNewSection() : postSectionEdit('name')"
                            @keydown="tabToDescription"
                        />
                    </div>
                </template>
                <template v-else>
                    <span @click="focusNameInput" v-if="localSection.name">{{ localSection.name }}</span>
                    <span class="placeholder-color" @click="focusNameInput" v-else>name</span>
                </template>
            </span>
            <div class="right-btns">
                <button class="btn" @click="addOptionsModalFlag=true" v-if="!isNew">
                    <span>options</span>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add options to all items</span>
                </button> 
                <button class="btn" @click="addNewItem()" v-if="!isNew">
                    <span>item</span>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add item</span>
                </button>
            </div>
        </div>
        <div class="section-description">
            <template v-if="editDescription">
                <div class="text-field description">
                    <input
                        type="text"
                        ref="descriptionInputRef"
                        v-model="localSection.description"
                        @blur="isNew ?  editDesciption=false : postSectionEdit('description')"
                        @keydown.enter="isNew ? (localSection.name ? postNewSection() : editDesciption=false) : postSectionEdit('description')"
                    />
                </div>
            </template>
            <template v-else>
                <span @click="focusDescriptionInput" v-if="localSection.description">{{ localSection.description }}</span>
                <span  class="placeholder-color" @click="focusDescriptionInput" v-else>description</span>
            </template>
        </div>
        <div class="section-items">
            <EditItem
                v-if="addItem"
                :item="newItem"
                :section_id="localSection._id"
                :menu="localMenu"
                @send-new-item-flag="addItem=false"/>
            <EditItem
                ref="item"
                v-for="(item,i) in localSection.items"
                :key="item._id"
                :item="item"
                :section_id="localSection._id"
                :menu="localMenu"
/>
<!--                 :data-index="i"
                @dragstart="draggedItemIndex=i"
                @dragover.prevent
                @drop="onDrop(i)"
                @touchstart="onTouchStart($event, i)"
                @touchmove="onTouchMove($event)"
                @touchend="onTouchEnd($event)"
                draggable="true" -->
        </div>
        <div class="modalWrapper" v-if="addOptionsModalFlag">
            <ModalAddOptions class="modal options" :menu="localMenu" :item="localSection" @close-modal="addOptionsModalFlag=false"/>
        </div>
        <div class="modalWrapper" v-if="deleteModalFlag">
            <ModalDelete class="modal delete" :item="localSection" itemType="Section" @close-modal="deleteModalFlag=false" @delete-item="getDelete"/>
        </div>
    </div>
</template>
<style scoped>
.btn.delete{
    padding: 3px;
    margin: 0px 4px;
}
.modal{
    position: relative;
    width: 70%;
    height: 300px;
    left: 15%;
}
.right-btns{
    font-size:20px;
    margin-right: 15px;
    padding: 5px;
    gap: 10px;
}
.right-btns button{
    padding: 7px 3px;
}
.text-field.name{
    position: absolute;
    left: 25px;
    top: 7px;    
    height: 35px;
    width: 200px;
}
.text-field.name input{
    height: 30px;
    font-size: 25px;
    width: inherit;
}
.text-field.description input{
    width: 500px;
    font-size: 12px;
}
.modal.delete{
    height: 35vh;
    width: 40vw;
    left: 30vw;
    top: 40vh;
}
@media(max-width: 600px){
    .modal.options{
        width: 100vw;
        left: 0;
    }
}
</style>