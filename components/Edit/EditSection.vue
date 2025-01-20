<script setup>
import { v4 as uuidv4 } from 'uuid';
import { reactive } from 'vue';
const emit = defineEmits(['send-new-section-flag']);
const {section, menu} = defineProps({
    section: { type:Object, required: true},
    menu: { type:Object, required: true},
});
const menuStore = useMenuStore();
const localMenu = reactive(menu);
const localSection = reactive(section);
const sectionIndex = menu.sections.findIndex(sec => sec._id === section._id);
//new section logic
const isNew = ref(false);
onMounted(()=>{
    if(!localSection.name){
        isNew.value = true;
        focusNameInput();
    }
})
// reusable post edits to db logic
const postSectionEdit = (s) => {
    if(!isNew.value){
        localMenu.sections[sectionIndex]=s;
        menuStore.updateMenu(localMenu);
    }else postNewSection(s);
}
/************************
**edit section name logic
*************************/
const { nameInputRef, editName, focusNameInput } = useNameInput();
const submitEditSectionName = (s) => {
    editName.value = false;
    if(!isNew.value) postSectionEdit(s);
};
/************************
**edit section description logic
*************************/
const { tabToDescription, descriptionInputRef,
    editDescription, focusDescriptionInput} = useTabToDescription();
const submitEditSectionDescription = (s) => { 
    editDescription.value = false; 
    if(!isNew.value) postSectionEdit(s);
}
//delete section
const deleteSection = ()=>{
    localMenu.sections.splice(sectionIndex, 1);
    menuStore.updateMenu(localMenu);
    console.log('delete section disabled')
}
const postNewSection = (s) => {
    console.log('postNewSection')
    if(s.name){
     //   console.log('if section name')
     localMenu.sections.push(s);
        menuStore.updateMenu(localMenu);
        emit('send-new-section-flag');  
    }
}
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
//add item
const addNewItem = () => {
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
</script>
<template>
    <div class="section-container">
        <div class="section-name">
            <button class="btn delete" @click="postNewSection(localSection)" v-if="isNew">
                <i class="mdi mdi-plus"/>
                <span class="tooltip">add section</span>
            </button>
            <button class="btn delete" @click="deleteSection(localSection)" v-else>
                <i class="mdi mdi-close"/>
                <span class="tooltip">delete section</span>
            </button>
            <template v-if="editName">
                <div class="text-field name">
                    <input
                        type="text"
                        ref="nameInputRef"
                        v-model="localSection.name"
                        @blur="submitEditSectionName(localSection)"
                        @keydown.enter="postNewSection(localSection)"
                        @keydown=tabToDescription
                    />
                </div>
            </template>
            <template v-else>
                <span @click="focusNameInput" v-if="localSection.name">{{ localSection.name }}</span>
                <span class="placeholder-color" @click="focusNameInput" v-else>name</span>
            </template>
            <button class="btn add-item" @click="addNewItem" v-if="!isNew">
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
                        @keydown.enter="postNewSection(localSection)"
                        @blur="submitEditSectionDescription(localSection)"
                    />
                </div>
            </template>
            <template v-else>
                <span @click="focusDescriptionInput" v-if="localSection.description">{{ localSection.description }}</span>
                <span class="placeholder-color" @click="focusDescriptionInput" v-else>description</span>
            </template>
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
                :key="i"
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