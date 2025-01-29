<script setup>
import { onMounted } from 'vue';

const { item, itemType} = defineProps({item: {type: Object, required: true}, itemType:{type:String, required: true}});
const emit = defineEmits(['close-modal','delete-item']);
const input = ref('');
const buttonRef=ref(null);
const getInput = (v) => {
    console.log(v)
    input.value=v;
}
const { tabToButton } = useTabToButton(buttonRef);
onMounted(() => {
  const el = document.querySelector('input')
  console.log(el)
  el.focus();
})
</script>
<template>
    <div class="container">
        <div class="form-title">
             {{ "Delete "+itemType }}
        </div>
        <div class="form-body">
            <div class="item-name"> {{'Are you sure you want to delete '+ item.name + ' and all of its contents?'}}</div>
            <div class="item-name"> {{'type "' + item.name +'" to delete'}}</div>
            <div class="input-field">
                <TextField
                    :placeHolder="'enter name to delete'"
                    :req="true"
                    @send-input="getInput"
                    @keydown.enter="tabToButton"
                />
            </div>
             
        </div>
        <div class="form-actions">
            <button class="btn" @click="(input===item.name) ? emit('delete-item') : null" ref="buttonRef">Submit</button>
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
