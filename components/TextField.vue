<script setup>
import { useFocusInput } from '../composables/useFocusInput';

const emit = defineEmits(['send-input']);
const { name } = defineProps({
    placeHolder: { type: String, required: true},
    req: {type: Boolean, required: true},
    password: {type: Boolean, required: false, default: false},
    isValid: {type: Boolean, required: false, default: true},
    name: {type: String, required: false, default: ""},
    bgColor: {type: String, required: false, default: 'white'}
});
const inputRef=ref(null);
const localName = ref(name);
const isOpen = ref(false);
const capitalizeFirstLetter = (word)=>{
    word.trim();
    word = word.charAt(0).toUpperCase()+word.slice(1);
    const index= word.indexOf(" ");
    if(index) return word.slice(0,index+1) + word.charAt(index+1).toUpperCase() + word.slice(index+2);
    return word;
}
const onInput = (event) => {
    localName.value = event.target.value;
    emit('send-input', localName.value);
};
const focusInput = useFocusInput(inputRef)
defineExpose({ focusInput });
</script>
<template> 
    <div class="floating-text-field">
        <input ref="inputRef"
            :type="password && !isOpen ? 'password' : 'text'"
            :name="placeHolder"
            :class="{'invalid': isValid===false }"
            placeholder=" "
            :required="req"
            v-model="localName"
            :aria-label="'Enter '+ placeHolder"
            @input="onInput($event)"
            > <!-- :style="password && isOpen ? { fontFamily: 'Segoe UI' } : {}" -->
        <label :for="placeHolder" :style="{'--label-bg-color': bgColor}">{{capitalizeFirstLetter(placeHolder)}}</label>
        <button type="button" @click="isOpen=!isOpen" v-if="password">
            <i class="mdi mdi-eye-outline" v-if="isOpen"/>
            <i class="mdi mdi-eye-off-outline" v-else/>
        </button>
    </div>
</template>
<style scoped>
.floating-text-field{
    position: relative;
    margin-top: 8px;
    width: 230px;
    box-sizing: border-box;
}
.floating-text-field label{ /*no focus */
    position: absolute;
    transition: 0.2s ease;
    pointer-events: none;
    overflow: hidden;
}
.floating-text-field input{
    position: relative;
    padding: 6px 24px 6px 6px;
    width: 230px;
    font-size: 16px;
    background-color: white;
    border: 2px solid rgb(96, 97, 97);
    border-radius: 5px;
    box-sizing: border-box;
}
.floating-text-field input:placeholder-shown + label{
    position: absolute;
    top: 6px;
    left: 8px;
    font-size: 14px;
    color: #aaaa;
    transition: 0.3s ease;
}
.floating-text-field input:hover + label{
    cursor: text;
}
.floating-text-field input:focus + label,
.floating-text-field input:not(:placeholder-shown) + label {
    top: -8px;
    left: 10px;
    font-size: 12px;
    color: #5264ae;
    background-color: white;
    background: linear-gradient(var(--label-bg-color) 55%, white 55%);
}
/* 
    stackover flow to remove injected color 
    from browser form autofill
*/
.floating-text-field input:-webkit-autofill,
.floating-text-field input:-webkit-autofill:hover,
.floating-text-field input:-webkit-autofill:focus,
.floating-text-field input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}
.floating-text-field button{
    position: absolute;
    top: 6px;
    right: 2px;
    font-size: 16px;
    color: #6362628d;
    background-color: transparent;
    z-index: 100;
}
input.invalid {
  border-color: red;
}
</style>