<script setup>
import { v4 as uuidv4 } from 'uuid';
const {section, menu} = defineProps({
    section: { type:Object, required: true},
    menu: { type:Object, required: true},
});
const menuStore = useMenuStore();
//new section logic
const isNew = ref(false);
onMounted(()=>{
    if(!section['name']){
        isNew.value = true;
        focusNameInput();
    }
})
// reusable post edits to db logic
const postSectionEdit = (section) => {
    if(!isNew.value){
        const sectionIndex = menu['sections'].findIndex(sec => sec['_id'] === section['_id']);
        menu['sections'][sectionIndex]=section;
        menuStore.updateMenu(menu);
    }else{
        postNewSection(section);
    }

    
}
/************************
**edit section name logic
*************************/
const { nameInputRef, editName, focusNameInput } = useNameInput();
const submitEditSectionName = (section) => {
    editName.value = false;
    if(!isNew.value) postSectionEdit(section);
};
/************************
**edit section description logic
*************************/
const { tabToDescription, descriptionInputRef,
    editDescription, focusDescriptionInput} = useTabToDescription();
const submitEditSectionDescription = (section) => { 
    editDescription.value = false; 
    if(!isNew.value) postSectionEdit(section);
}
//delete section
const deleteSection = ( section )=>{
    const sectionIndex = menu['sections'].findIndex(sec => sec['_id'] === section['_id']);
    menu['sections'].splice(sectionIndex, 1);
   // menuStore.updateMenu(props.menu);
    console.log('delete section disabled')
}
const postNewSection = (section) => {
    console.log('postNewSection')
    if(section['name']){
     //   console.log('if section name')
        menu['sections'].push(section);
        menuStore.updateMenu(menu);
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
const emit = defineEmits(['send-new-section-flag']);
const getNewItemFlag = () => {
   // console.log('flag in section')
    addItem.value=false;
}
</script>
<template>
    <div class="section-container">
        <div class="section-name">
            <button class="btn delete" @click="postNewSection(section)" v-if="isNew">
                <i class="mdi mdi-plus"/>
                <span class="tooltip">add section</span>
            </button>
            <button class="btn delete" @click="deleteSection(section)" v-else>
                <i class="mdi mdi-close"/>
                <span class="tooltip">delete section</span>
            </button>
            <template v-if="editName">
                <div class="text-field name">
                    <input
                        type="text"
                        ref="nameInputRef"
                        v-model="section['name']"
                        @blur="submitEditSectionName(section)"
                        @keydown.enter="postNewSection(section)"
                        @keydown=tabToDescription
                    />
                </div>
            </template>
            <template v-else>
                <span @click="focusNameInput" v-if="section['name']">{{ section['name'] }}</span>
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
                        v-model="section['description']"
                        @keydown.enter="postNewSection(section)"
                        @blur="submitEditSectionDescription(section)"
                    />
                </div>
            </template>
            <template v-else>
                <span @click="focusDescriptionInput" v-if="section['description']">{{ section['description'] }}</span>
                <span class="placeholder-color" @click="focusDescriptionInput" v-else>description</span>
            </template>
        </div>
        <div class="section-items">
            <EditItem
                v-if="addItem"
                :item="newItem"
                :section_id="section['_id']"
                :menu="menu"
                @send-new-item-flag="getNewItemFlag"/>
            <EditItem 
                v-for="(item, i) in section['items']"
                :key="i"
                ref="it"
                :item="item"
                :section_id="section['_id']"
                :menu="menu"/>
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