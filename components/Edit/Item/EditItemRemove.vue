<script setup>
const {remove, item_id, section_id, menu} = defineProps({
    remove: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},});
const menuStore = useMenuStore();
const sectionIndex = menu.sections.findIndex(sec => sec._id === section_id);
const itemIndex = menu.sections[sectionIndex].items.findIndex(it => it._id === item_id);
const removeIndex = menu.sections[sectionIndex].items[itemIndex].removes.findIndex((rem)=> rem._id === remove._id);
const { nameInputRef, editName, focusNameInput } = useNameInput();
/***********
 * Edit Remove Name
 *************/
const submitEditRemoveName = (remove) => {
    if(!!remove.name) editName.value=false;
    if(!isNew.value) postEditRemove(remove);
    
}
//post changes
const postEditRemove = (remove) => {
    menu.sections[sectionIndex].items[itemIndex].removes[removeIndex] = remove;   
    menuStore.updateMenu(menu);
}
/****************
 * new  remove logic
 ********************/
const isNew = ref(false);
onMounted(()=>{
    if(!remove?.name){
        isNew.value = true; editName.value=true;
        focusNameInput();
    }  
});
const emit = defineEmits(['send-reset-remove']);

const postNewRemove = (remove) => {
    if(remove.name){    
        menu.sections[sectionIndex].items[itemIndex].removes.push(remove);
        menuStore.updateMenu(menu);
        emit('send-reset-remove');
    }
}
const deleteRemove = () => {
    console.log('del')
    menu.sections[sectionIndex].items[itemIndex].removes.splice(removeIndex, 1);
    menuStore.updateMenu(menu)
}
</script>
<template>
    <div class="tab-container">
        <div class="button-name">
            <span class="btn-icons-group items">
                <button class="btn" @click="deleteRemove" v-if="!isNew">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>                    
                <button class="btn" @click="postNewRemove(remove)" v-else>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add new remove</span>
                </button>     
            </span>
          
                <div class="text-field" v-if="editName">
                    <input
                        type="text"
                        class="name-input"
                        placeholder="name"
                        ref="nameInputRef"
                        v-model="remove.name"
                        @blur="isNew ? postNewRemove(remove) : submitEditRemoveName(remove)"
                        @keydown.enter="postNewRemove(remove)"
                    />
                </div>
       
                <div v-else>
                    <span @click="focusNameInput" v-if="remove.name">{{ remove.name }}</span>
                    <span class="placeholder-color" @click="editRemoveName(remove)" v-else>name</span>
                </div>
        </div>  
    </div>
</template>