<script setup>
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
 * Edit Option Name
 *************/
 const { nameInputRef, editName, focusNameInput } = useNameInput();
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
 * new option logic
 ********************/
const isNew = ref(false);
onMounted(()=>{
    if(!props.option?.name){
        isNew.value = true; editName.value=true;
        focusNameInput();
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
        <div class="tab-container">
            <div class="tab-row">
                <div class="btn-icons-group items">
                    <template v-if="!isNew">
                        <button class="btn" @click="deleteOption">
                            <i class="mdi mdi-close"/>
                            <span class="tooltip">delete</span>
                        </button>
                    </template>
                    <template v-else>
                        <button class="btn" @click="postNewOption(option)">
                            <i class="mdi mdi-plus"/>
                            <span class="tooltip">add new option</span>
                        </button>
                    </template>
                </div>
                <div class="tab-name">
                    <template v-if="editName">
                        <div class="text-field">
                            <input
                                type="text"
                                class="name-input"
                                placeholder="option title"
                                ref="nameInputRef"
                                v-model="option.name"
                                @blur="submitEditOptionName(option)"
                            />
                        </div>
                    </template>
                    <template v-else>
                        <span v-if="option.name">
                            <span @click="focusNameInput">{{ option.name }}</span> 
                            <button class="btn" @click=""> add value </button>
                        </span>
                        <span class="placeholder-color" @click="focusNameInput" v-else>name</span>
                    </template>
                </div>
            </div>
        </div>
        <div class="tab-container">
            <div class="tab-row">
                <div v-for="(val, i) in option.values">
                    values
                </div>
            </div>
        </div>
</template>
<style scoped>
</style>