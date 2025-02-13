<script setup>
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

const nameInputRef=ref(null);
const editName = ref(false);

const focusNameInput = useFocusInput(nameInputRef,editName);

function postEditRemove(){
    console.log('edit')
    editName.value=false;
    const removeIndex = localMenu.sections[sectionIndex].items[itemIndex].removes.findIndex((rem)=> rem._id === localRemove._id);
    localMenu.sections[sectionIndex].items[itemIndex].removes[removeIndex] = localRemove;   
    menuStore.updateMenu(localMenu);
}

function postNewRemove(){
    editName.value=false;
    if(localRemove.name){    
        const contains = localMenu.sections[sectionIndex].items[itemIndex].removes.some(r => r.name === localRemove.name);
        console.log(contains)
        if(!contains){
        localMenu.sections[sectionIndex].items[itemIndex].removes.push({
            name: localRemove.name,
            _id: localRemove._id,
        });
        menuStore.updateMenu(localMenu);
        
        }
        emit('send-reset-remove');
        focusNameInput();
    }
}
watch(()=>editName.value,() => {
    editName.value ? focusNameInput():null;
})
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
                <button class="btn" @click="emit('delete-remove')" v-if="!isNew">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>                    
                <button class="btn" @click="postNewRemove(localRemove)" v-else>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add new remove</span>
                </button>     
                <div class="text-field" v-if="editName">
                    <input
                        type="text" placeholder="name"
                        class="name-input" ref="nameInputRef"
                        v-model="localRemove.name"
                        @blur="isNew ? postNewRemove() : postEditRemove()"
                        @keydown.enter="isNew ? postNewRemove() : postEditRemove()"
                    />
                </div>
                <div v-else>
                    <span @click="focusNameInput()" v-if="localRemove.name">{{ localRemove.name }}</span>
                    <span class="placeholder-color" @click="focusNameInput()" v-else>name</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.tooltip{
    top: -100%; left: 200%;
}
.item-title{
    width: 280px;
}
@media (max-width: 700px){
  .item-title{
    width: 240px;
  }
}
@media(max-width: 600px){
  .item-title{
    width: 395px;
  }
}
@media(max-width: 520px){
  .item-title{
    width: 340px;
  }
}
@media(max-width: 400px){
  .item-title{
    width: 290px;
  }
}
</style>