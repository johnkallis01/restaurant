<script setup>
import { onMounted } from 'vue';

const { item, itemType} = defineProps({item: {type: Object, required: true}, itemType:{type:String, required: true}});
const emit = defineEmits(['close-modal','delete-item']);
const input = ref('');
const buttonRef=ref(null);
const { tabToButton } = useTabToButton(buttonRef);
onMounted(() => {
    const modal = document.getElementById('delete-modal');
    const el = modal.querySelector('input');
    el.focus();
})
</script>
<template>
    <div class="container" id="delete-modal">
        <div class="form-title">
             {{ "Delete "+itemType }}
        </div>
        <div class="form-body">
            <span class="item-name"> {{'Are you sure you want to delete '+ item.name + ' and all of its contents?'}}</span>
            <span class="item-name"> {{'Type "' + item.name +'" to delete'}}</span>
            <div class="input-field">
                <TextField
                    placeHolder="enter name to delete"
                    :req="true"
                    @send-input="(v)=>input=v"
                    @keydown.enter="tabToButton"
                />
            </div>
             
        </div>
        <div class="form-actions">
            <button class="btn" @click="(input.trim()===item.name.trim()) ? emit('delete-item') : null" ref="buttonRef">Submit</button>
            <button class="btn" @click="emit('close-modal')">Cancel</button>
        </div>
    </div>
</template>
<style scoped>
.form-body{
    height: 100%;;
    overflow: hidden;
}
.title-text{
    justify-content: flex-start;
    margin: 5px;
}
.item-title.delete{
    height: 8vh;
    color: black;
    border-bottom: 2px solid #333;
    background-color: rgb(184, 175, 175);
}
.item-name{
    margin: 10px;
    width: 90%;
    font-size: 14px;
    text-wrap: wrap;
}
.btn{
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
}
.input-field{
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>
