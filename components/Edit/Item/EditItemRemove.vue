<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['send-reset-remove','delete-remove']);
const {remove, item_id, section_id, menu} = defineProps({
    remove: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},});
const menuStore = useMenuStore();
const localMenu=reactive(menu);
const localRemove=reactive(remove);
const isNew = ref(false);
const sectionIndex = menu.sections.findIndex(sec => sec._id === section_id);
const itemIndex = menu.sections[sectionIndex].items.findIndex(it => it._id === item_id);

const { nameInputRef, editName, focusNameInput } = useNameInput();

const postEditRemove = () => {
    editName.value=false;
    const removeIndex = menu.sections[sectionIndex].items[itemIndex].removes.findIndex((rem)=> rem._id === localRemove._id);
    localMenu.sections[sectionIndex].items[itemIndex].removes[removeIndex] = localRemove;   
    menuStore.updateMenu(localMenu);
}

const postNewRemove = (r) => {
    if(r.name){    
        localMenu.sections[sectionIndex].items[itemIndex].removes.push({
            name: r.name,
            _id: r._id,
        });
        menuStore.updateMenu(localMenu);
        emit('send-reset-remove');
        focusNameInput();
    }
}
onMounted(()=>{
    if(!localRemove?.name){
        isNew.value = true; editName.value=true;
        focusNameInput();
    }  
});
</script>
<template>
    <div class="tab-container" @click.stop>
        <div class="item-title">
            <div class="button-name">
                <span class="btn-icons-group items">
                    <button class="btn" @click="emit('delete-remove')" v-if="!isNew">
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
                            @blur="isNew ? postNewRemove(localRemove) : postEditRemove"
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