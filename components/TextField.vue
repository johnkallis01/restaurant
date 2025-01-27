<script setup>
const emit = defineEmits(['send-input']);
const { name } = defineProps({
    placeHolder: { type: String, required: true},
    req: {type: Boolean, required: true},
    password: {type: Boolean, required: false},
    isValid: {type: Boolean, required: false, default: true},
    name: {type: String, required: false, default: ""},
    bgColor: {type: String, required: false, default: 'white'}
});
const localName = ref(name);
const isOpen = ref(false);

const capitalizeFirstLetter = (word)=>{
    word.trim();
    word = word.charAt(0).toUpperCase()+word.slice(1);
    const index= word.indexOf(" ");
    if(index) return word.slice(0,index+1) + word.charAt(index+1).toUpperCase() + word.slice(index+2);
    return word;
}

const togglePassword = () => {isOpen.value=!isOpen.value;}
const onInput = (event) => {
    localName.value = event.target.value;
  emit('send-input', localName.value);
};
</script>
<template>
    <div class="floating-text-field">
        <input
            :type="password && !isOpen ? 'password' : 'text'"
            :name="placeHolder"
            :class="{ invalid: isValid===false }"
            placeholder=" "
            :required="req"
            v-model="localName"
            :aria-label="'Enter '+ placeHolder"
            @input="onInput($event)"
            />
        <label :for="placeHolder" :style="{'--label-bg-color': bgColor}">{{capitalizeFirstLetter(placeHolder)}}</label>
        <button class="eye-button" type="button" @click="togglePassword" v-if="password">
            <i class="mdi mdi-eye-outline" v-if="isOpen"/>
            <i class="mdi mdi-eye-off-outline" v-else/>
        </button>
    </div>
</template>
<style scoped>
.floating-text-field{
    position: relative;
    margin: 3px 0; 
}
.floating-text-field label{ /*no focus */
    position: absolute;
    transition: 0.2s ease;
    pointer-events: none;
    border-radius: 3px 3px 0 0;
    overflow: hidden;
}
.floating-text-field input{
    padding: 10px 10px 10px 15px;
    display: block;
    width: 100%;
    height: 40px;
    font-size: 16px;
    line-height: 20px;
    background-color: white;
    border: 2px solid rgb(96, 97, 97);
    border-radius: 5px;
    transition: border-color 0.3s;
    
}
.floating-text-field input:placeholder-shown + label{
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 14px;
    color: #aaaa;
    transition: 0.3s ease;
    text-wrap: wrap;
    overflow: hidden;
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
    background: linear-gradient(var(--label-bg-color) 50%, white 60%);
}
.eye-button{
    position: absolute;
    top: 7px;
    right: 7px;
    color: #6362628d;
}
input.invalid {
  border-color: red;
}
</style>