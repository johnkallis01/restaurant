<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['send-reset-remove']);
const {remove, item_id, section_id, menu} = defineProps({
    remove: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},});
const menuStore = useMenuStore();
const localMenu=reactive(menu);
const localRemove=reactive(remove);
const sectionIndex = menu.sections.findIndex(sec => sec._id === section_id);
const itemIndex = menu.sections[sectionIndex].items.findIndex(it => it._id === item_id);
const removeIndex = menu.sections[sectionIndex].items[itemIndex].removes.findIndex((rem)=> rem._id === localRemove._id);
const { nameInputRef, editName, focusNameInput } = useNameInput();
/***********
 * Edit Remove Name
 *************/
const submitEditRemoveName = (r) => {
    if(!!r.name) editName.value=false;
    if(!isNew.value) postEditRemove(r);
}
//post changes
const postEditRemove = (r) => {
    localMenu.sections[sectionIndex].items[itemIndex].removes[removeIndex] = r;   
    menuStore.updateMenu(localMenu);
}
/****************
 * new  remove logic
 ********************/
const isNew = ref(false);
onMounted(()=>{
    if(!localRemove?.name){
        isNew.value = true; editName.value=true;
        focusNameInput();
    }  
});
const postNewRemove = (r) => {
    if(r.name){    
        localMenu.sections[sectionIndex].items[itemIndex].removes.push(r);
        menuStore.updateMenu(localMenu);
        emit('send-reset-remove');
    }
}
const deleteRemove = () => {
    console.log('del')
    localMenu.sections[sectionIndex].items[itemIndex].removes.splice(removeIndex, 1);
    menuStore.updateMenu(localMenu)
}
</script>
<template>
    <div class="tab-container">
        <div class="item-title">
            <div class="button-name">
                <span class="btn-icons-group items">
                    <button class="btn" @click="deleteRemove" v-if="!isNew">
                        <i class="mdi mdi-close"/>
                        <span class="tooltip">delete</span>
                    </button>                    
                    <button class="btn" @click="postNewRemove(localRemove)" v-else>
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
                            v-model="localRemove.name"
                            @blur="isNew ? postNewRemove(localRemove) : submitEditRemoveName(localRemove)"
                            @keydown.enter="postNewRemove(localRemove)"
                        />
                    </div>
        
                    <div v-else>
                        <span @click="focusNameInput" v-if="localRemove.name">{{ localRemove.name }}</span>
                        <span class="placeholder-color" @click="editRemoveName(localRemove)" v-else>name</span>
                    </div>
            </div>
        </div>
    </div>
</template>