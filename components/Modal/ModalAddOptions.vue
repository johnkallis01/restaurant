<script setup>
import { v4 as uuidv4 } from 'uuid';

const emit = defineEmits(['close-modal']);

const {item, section_id, menu} = defineProps({
    item: { type: Object, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
});

const closeModal = ()=>{ emit('close-modal');}
const submitOption = ()=>{ emit('close-modal');}
const localMenu=reactive(menu);
const localItem=reactive(item);
const addNew=ref(false);
const option = ref({
    name: "",
    required: false,
    content: [],
    _id: uuidv4(),
})
const resetOption = () => {
    addNew.value=false;
    option.value={
        name: "",
        required: false,
        content: [],
        _id: uuidv4(),
    }
}
const openIndex = ref(-1);
const closeOpen=(i)=>{
    // console.log('p close')
    // console.log('close',i, openIndex.value)
    if(openIndex.value===i) openIndex.value=-1;

}
const toggleOpen=(i)=>{
    // console.log('p togg', i, openIndex.value)
    if(openIndex.value===i) openIndex.value=-1;
    else openIndex.value=i;
}

const disableBtn=ref(false);
const toggleAddNew = () => {
        addNew.value=!addNew.value;
       // disableBtn.value=!disableBtn.value;
}
</script>
<template>
    <div class="container">
        <div class="item-title">
            <div class="item-name">
                {{ localItem.name }}
            </div>
            <div>
                <button class="btn add" @click="toggleAddNew">add option</button>
            </div>
        </div>
        <div class="form-body">
            <EditItemOption 
                v-if="addNew"
                @send-reset-option="resetOption"
                :option="option"
                :is-open="false"
                :item="localItem"
                :menu="localMenu"
                :section_id="section_id"/>
          
            <EditItemOption
                v-for="(op, i) in localItem.options" :key="op._id"
                :option="op"                
                :item="localItem"
                :menu="localMenu"
                :section_id="section_id"
                :is-open="openIndex===i"
                @toggle="toggleOpen(i)"
                @close="closeOpen(i)"/>
           
        </div>
        <div class="form-actions">
            <button class="btn close" @click="submitOption">submit</button>
            <button class="btn close" @click="closeModal">cancel</button>
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
}
.btn.close{
    border: 1px solid black;
    box-sizing: border-box;
}
.form-body{
    height: 100%;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
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
}
.container{
    height: 100%;
    width: 100%;
}
.container.aro{
    display: flex;
    justify-content: center;
    width: 80%;
}
</style>