<script setup>
import { v4 as uuidv4 } from 'uuid';
const emit = defineEmits(['close-modal']);
//accepts section or item
const {item, section_id, menu} = defineProps({
    item: { type: Object, required: true },
    section_id: { type: String, required: false},
    menu: { type:Object, required: true},
});
const localMenu=reactive(menu);
const localItem=reactive(item);//could be section or item
const menuStore=useMenuStore();
const { detachObject } = useDetachObject();
const detachedItem=reactive(detachObject(item));
const openIndex = ref(-1);
const newOption = reactive({name: "",req: false,content: [],_id: uuidv4(),});
const addNew=ref(false);
const childRef=ref(null);
const newChildRef=ref(null);
const addOptionBtnRef=ref(null);
function closeModal(){
    const detachedItem = detachObject(item); 
    Object.assign(localItem, detachedItem);
    emit('close-modal');
}
function tabToAddOptionsBtn(event){
    if(event.key==='Tab') {
        nextTick(()=>{
            childRef.value[0].nameRef.click(); 
        });
    }
}
function submitChanges(){
    console.log('sci', newOption)
    //when 'submit' is pressed but not 'submit option'
    if(newOption.name && newOption.content.length) getNew(newOption);
    if(section_id){//if item
        const sectionIndex = localMenu.sections.findIndex(sec => sec._id === section_id);
        const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === localItem._id);
        localMenu.sections[sectionIndex].items[itemIndex].options=detachedItem.options;
    }else{//if section
        const sectionIndex = localMenu.sections.findIndex(sec => sec._id === localItem._id);    
        localMenu.sections[sectionIndex].options=detachedItem.options;
    }
    menuStore.updateMenu(localMenu);
    emit('close-modal');
}
const getNew = (op) => {
    addNew.value=false; 
    const newOp = detachObject(op);
    detachedItem.options.push(newOp);
    newOption.name="";
    newOption.req=false;
    newOption.content=[];
    newOption._id=uuidv4();
}
onMounted(()=>{
    if(!newChildRef.value) addOptionBtnRef.value.focus();
})
</script>
<template>
    <div class="modal-container">
        <div class="modal-title">
            <span class="item-name">
                {{ section_id ? localItem.name : "Add options to all items in "+localItem.name}}
            </span>
            <button class="btn add" ref="addOptionBtnRef"
                v-if="detachedItem.options.length"
                @click="addNew=!addNew">add option</button>
        </div>
        <div class="modal-content">
            <EditItemOption ref="newChildRef"
                v-if="detachedItem.options?.length ? addNew : true"
                @create-new-option="getNew"
                :option="newOption"
                :is-open="false"
                :item="detachedItem"/>
            <EditItemOption @click.stop ref="childRef"
                v-for="(op, i) in detachedItem.options" :key="op._id"
                :option="op" :item="detachedItem"        
                :disable-val-btn="addNew"
                :is-open="openIndex===i"
                @update-options="(getOptions) => detachedItem.options=getOptions"
                @toggle="openIndex===i ? openIndex=-1 : openIndex=i"
                @close="openIndex===i ? openIndex=-1 : openIndex=openIndex"/>
        </div>
        <div class="form-actions">
            <button class="btn close" @click="submitChanges()">Submit</button>
            <button class="btn close"
                @click="closeModal()" @keydown="tabToAddOptionsBtn">cancel</button>
        </div>
    </div>
</template>
<style scoped>
.btn.add{
    white-space: nowrap;
    border: 2px solid black;
}
.btn{
    box-sizing: border-box;
    border: 2px solid rgb(233, 235, 235);
    margin: 5px;
}
.btn.close{
    border: 1px solid black;
    box-sizing: border-box;
}
.form-actions{
    display: flex;
    justify-content: flex-end;
    align-items: end;
    align-content: end;
    margin-right: 10px;
}
.item-name{
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>