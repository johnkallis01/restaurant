<script setup>
import { v4 as uuidv4 } from 'uuid';
const {item, section_id, menu} = defineProps({
    item: { type: Object, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
});
const emit = defineEmits(['close-modal']);
const { formatPrice } = usePriceFormatter();
const addNew=ref(false);
const closeModal = ()=>{
    emit('close-modal');
}
const submitOption = ()=>{
    emit('close-modal');
}
const resetOption = () => {
    console.log('reset')
    addNew.value=false;
    option.value={
        name: "",
        required: false,
        content: [],
        _id: uuidv4(),
    }
}
const option = ref({
    name: "",
    required: false,
    content: [],
    _id: uuidv4(),
})
</script>
<template>
    <div class="container">
        <div class="item-title">
            <div class="item-name">
                {{ item.name }}
            </div>
            <div>
                <button class="btn add" @click="addNew=!addNew">add option</button>
            </div>
        </div>
        <div class="form-body">
            <EditItemOption
                v-if="addNew"
                @send-reset-option="resetOption"
                :option="option"
                :item="item"
                :menu="menu"
                :section_id="section_id" />
            <EditItemOption
                v-for="(op, i) in item.options"
                :option="op"
                :item="item"
                :menu="menu"
                :section_id="section_id" />     
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
    border: 1px solid green;
    box-sizing: border-box;
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