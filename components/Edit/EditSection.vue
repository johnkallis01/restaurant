<script setup>
import { v4 as uuidv4 } from 'uuid';
const emit = defineEmits(['send-new-section-flag']);
const {section, menu} = defineProps({
    section: { type:Object, required: true},
    menu: { type:Object, required: true},
});
const { nameInputRef, editName, focusNameInput } = useNameInput();
const { tabToDescription, descriptionInputRef,editDescription, focusDescriptionInput} = useTabToDescription();
const menuStore = useMenuStore();
const localMenu = reactive(menu);
const localSection = reactive(section);
const isNew = ref(false);
const addItem = ref(false);
const newItem = ref({
        new: true,
        name: "",
        price: "000.00",
        description: "",
        addOns: [],
        removes: [],
        options: [],
        _id: uuidv4(),
    })

function postSectionEdit(str){
    if(!isNew.value){
        const sectionIndex = menu.sections.findIndex(sec => sec._id === section._id);
        localMenu.sections[sectionIndex]=localSection;
        menuStore.updateMenu(localMenu);
    }
    switch(str){
        case 'name':
            editName.value=false;
            break;
        case 'description':
            editDescription.value=false;
            break;
    }
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
const getNewItemFlag = () => {addItem.value=false;}
onMounted(()=>{if(!localSection.name){isNew.value = true;focusNameInput();}})
</script>
<template>
    <div class="section-container">
        <div>
            <div class="section-name">
                <button class="btn delete" @click="postNewSection()" v-if="isNew">
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add section</span>
                </button>
                <button class="btn delete" @click="deleteSection()" v-else>
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
                            @keydown=tabToDescription
                        />
                    </div>
                </template>
                <template v-else>
                    <span @click="focusNameInput" v-if="localSection.name">{{ localSection.name }}</span>
                    <span class="placeholder-color" @click="focusNameInput" v-else>name</span>
                </template>
                <button class="btn add-item" @click="addNewItem()" v-if="!isNew">
                    <span class="btn-text">item</span>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add item</span>
                </button> 
            </div>
            <div class="section-description">
                <template v-if="editDescription">
                    <div class="text-field description">
                        <input
                            type="text"
                            class="input-description"
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
        </div>
        <div class="section-items">
            <EditItem
                v-if="addItem"
                :item="newItem"
                :section_id="localSection._id"
                :menu="localMenu"
                @send-new-item-flag="getNewItemFlag"/>
            <EditItem 
                v-for="(item, i) in localSection.items"
                :key="item._id"
                ref="it"
                :item="item"
                :section_id="localSection._id"
                :menu="localMenu"/>
        </div>
    </div>
</template>
<style scoped>
.btn.add-item{
    position: absolute;
    right: 0;
    font-size:20px;
    margin-right: 15px;
    padding: 5px;
}
.input-description{
    width: 40vw;
}
</style>