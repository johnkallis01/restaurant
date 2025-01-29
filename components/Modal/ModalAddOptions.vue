<script setup>
import { v4 as uuidv4 } from 'uuid';
import { nextTick, onMounted } from 'vue';
const emit = defineEmits(['close-modal']);
const {item, section_id, menu} = defineProps({
    item: { type: Object, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
});
const localMenu=reactive(menu);
const localItem=reactive(item);
const menuStore=useMenuStore();
const { detachObject } = useDetachObject();
const detachedItem=reactive(detachObject(item));
const openIndex = ref(-1);
const newOption = reactive(detachObject({name: "",required: false,content: [],_id: uuidv4(),}));
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
        requestAnimationFrame(()=>{
            childRef.value[0].nameRef.click(); 
        });
    }
}
function submitChanges(){
    if(newOption.name && newOption.content.length) getNew(newOption);
    const sectionIndex = localMenu.sections.findIndex(sec => sec._id === section_id);
    const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === localItem._id);
    localMenu.sections[sectionIndex].items[itemIndex].options=detachedItem.options;
    menuStore.updateMenu(localMenu);
    emit('close-modal');
}
const getNew = (op) => {
    addNew.value=false; 
    const newOp = detachObject(op);
    detachedItem.options.push(newOp);
    newOption.name="";
    newOption.required=false;
    newOption.content=[];
    newOption._id=uuidv4();
}
onMounted(()=>{
    if(!newChildRef.value) addOptionBtnRef.value.focus();
})
</script>
<template>
    <div class="container">
        <div class="item-title">
            <div class="item-name">
                {{ localItem.name }}
            </div>
            <div>
                <button class="btn add" ref="addOptionBtnRef"
                    v-if="detachedItem.options.length"
                    @click="addNew=!addNew">add option</button>
            </div>
        </div>
        <div class="form-body" >
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
.form-body{
    height: 100%;
    width: 100%;
    padding: 5px;
    overflow-y: auto;
}
.item-title{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 5px;
    border-bottom: 2px solid black;
}
.item-title.aro{
    border: none;
}
.form-actions{
    display: flex;
    justify-content: flex-end;
    align-items: end;
    align-content: end;
    margin-right: 10px;
}
.container{
    height: 100%;
    width: 100%;
    border-radius: 15px;
}
.container.aro{
    display: flex;
    justify-content: center;
    width: 80%;
}
</style>