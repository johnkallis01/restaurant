<script setup>
const props = defineProps({
    remove: { type: Object, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
    
});
const menuStore = useMenuStore();
const sectionIndex = props.menu.sections.findIndex(sec => sec._id === props.section_id);
const itemIndex = props.menu.sections[sectionIndex].items.findIndex(it => it._id === props.item_id);
const removeIndex = props.menu.sections[sectionIndex].items[itemIndex].removes.findIndex((remove)=> remove._id === props.remove._id);
const { nameInputRef, editName, focusNameInput } = useNameInput();
/***********
 * Edit Add-on Name
 *************/
const submitEditRemoveName = (remove) => {
    if(!!remove.name) editName.value=false;
    if(!isNew.value) postEditRemove(remove);
    
}
//post changes
const postEditRemove = (remove) => {
    props.menu.sections[sectionIndex].items[itemIndex].removes[removeIndex] = remove;   
    menuStore.updateMenu(props.menu);
}
/****************
 * new add on logic
 ********************/
const isNew = ref(false);
onMounted(()=>{
    if(!props.remove?.name){
        isNew.value = true; editName.value=true;
        focusNameInput();
    }  
});
const emit = defineEmits(['send-reset-remove']);

const postNewRemove = (remove) => {
    if(remove.name){    
        props.menu.sections[sectionIndex].items[itemIndex].removes.push(remove);
        menuStore.updateMenu(props.menu);
        emit('send-reset-remove');
    }
}
const deleteRemove = () => {
    console.log('del')
    props.menu.sections[sectionIndex].items[itemIndex].removes.splice(removeIndex, 1);
    menuStore.updateMenu(props.menu)
}
</script>
<template>
    <div class="tab-container">
        <span class="btn-icons-group items">
            <template v-if="!isNew">
                <button class="btn" @click="deleteRemove">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
            </template>
            <template v-else>
                <button class="btn" @click="postNewRemove(remove)">
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add new add-on</span>
                </button>
            </template>
        </span>
        <span class="tab-row">
            <span class="tab-name">
                <template v-if="editName">
                    <div class="text-field">
                        <input
                            type="text"
                            class="name-input"
                            placeholder="name"
                            ref="nameInputRef"
                            v-model="remove.name"
                            @blur="submitEditRemoveName(remove)"
                        />
                    </div>
                </template>
                <template v-else>
                    <span @click="focusNameInput" v-if="remove.name">{{ remove.name }}</span>
                    <span class="placeholder-color" @click="editRemoveName(remove)" v-else>name</span>
                </template>
            </span>
        </span>
    </div>
</template>
<style scoped>
.remove-name{
    row-gap: 100px;
    margin-left: 30px;
}
.new-remove{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.remove-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>