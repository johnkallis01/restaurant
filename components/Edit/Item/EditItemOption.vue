<script setup>
import { v4 as uuidv4 } from 'uuid';
const props = defineProps({
    option: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
    
});
const menuStore = useMenuStore();
const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section_id);
const itemIndex = props.menu.sections[sectionIndex].items.findIndex(it => it._id === props.item_id);
const optionIndex = props.menu.sections[sectionIndex].items[itemIndex].options.findIndex((option)=> option._id === props.option._id);
/***********
 * Edit Add-on Name
 *************/
const editName=ref(false); const nameInputRef=ref(null);
const editOptionName = ()=>{
    editName.value=true;
    nextTick(()=> nameInputRef.value.focus());
}
const submitEditOptionName = (option) => {
    if(!!option.name) editName.value=false;
    if(!isNew.value) postEditOption(option);
    
}
//post changes
const postEditOption = (option) => {
    props.menu.sections[sectionIndex].items[itemIndex].options[optionIndex] = option;   
    menuStore.updateMenu(props.menu);
}
/****************
 * new add on logic
 ********************/
const isNew = ref(false);
onMounted(()=>{
    if(!props.option?.name){
        isNew.value = true; editName.value=true;
    }  
});
const emit = defineEmits(['send-reset-option']);

const postNewOption = (option) => {
    if(option.name){    
        props.menu.sections[sectionIndex].items[itemIndex].options.push(option);
        menuStore.updateMenu(props.menu);
        emit('send-reset-option');
    }
}
const deleteOption = () => {
    console.log('del')
    props.menu.sections[sectionIndex].items[itemIndex].options.splice(optionIndex, 1);
    menuStore.updateMenu(props.menu)
}
</script>
<template>
    <div class="option-container">
        <span class="btn-icons-group items">
            <template v-if="!isNew">
                <button class="btn" @click="deleteOption">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
            </template>
            <template v-else>
                <button class="btn" @click="postNewOption(option)">
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add new add-on</span>
                </button>
            </template>
        </span>
        <template v-if="editName">
            <div class="text-field">
                <input
                    type="text"
                    class="name-input"
                    placeholder="name"
                    ref="nameInputRef"
                    v-model="option.name"
                    @blur="submitEditOptionName(option)"
                />
            </div>
        </template>
        <template v-else>
            <span @click="editOptionName(option)" v-if="option.name">{{ option.name }}</span>
            <span class="placeholder-color" @click="editOptionName(option)" v-else>name</span>
        </template>
    </div>
</template>
<style scoped>
.option-name{
    row-gap: 100px;
    margin-left: 30px;
}
.new-option{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.option-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>