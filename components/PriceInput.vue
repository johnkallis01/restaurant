<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    price:{
        type: String,
        required: true,
        default: '000.00'
    }
});
const emit = defineEmits(['update:price']);
const focusPriceRef = ()=>{
  if(priceRef.value) {
    priceRef.value.focus();
  }
}
provide('focusPriceRef', focusPriceRef);
const rawPrice = ref(props.price.replace('.', ''));
watch(
  () => props.price,
  (newPrice) => {
    rawPrice.value = newPrice.replace('.', '');
  }
);
const formattedPrice = computed(()=>{
    const leftHandSide = rawPrice.value.slice(0,-2); // stores first 3 chars 
    const rightHandSide = rawPrice.value.slice(-2); //stores last 2 chars
    return leftHandSide + "." + rightHandSide; //concats strings
    
});
const formatPriceInput = (event) => {
    const inputChar = event.data;
    if(event.inputType === "deleteContentBackward"){
        rawPrice.value = "0"+rawPrice.value.slice(0,-1);
        event.target.value = formattedPrice.value;
        return;
    }
    if(!/^\d$/.test(inputChar)){
        event.target.value=formattedPrice.value;
        return;
    }
    rawPrice.value = (rawPrice.value + inputChar).slice(-5);  
    event.target.value = formattedPrice.value;
};
/**************
 * focus ref logic
 **************/
const priceRef= ref(null);
const focusInput = () => {
    priceRef.value?.focus();
}
defineExpose({ focusInput });
onMounted(()=>{
    focusInput();
})
const submitPrice = () =>{
    emit('update:price', formattedPrice.value)
    console.log('on blur')
}
</script>
<template>
    <div class="price-input">
        <span class="prefix">$</span>
        <input
            type="text"
            ref="priceRef"
            placeholder="000.00"
            :value="formattedPrice"
            @input="formatPriceInput"
            @blur="submitPrice"
        >
    </div>
</template>
<style scoped>
.price-input{
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 8px;
    background-color: white;
}
.price-input .prefix{
    font-size: 14px;
    color: #666;
    margin-right: 8px;
}
.price-input input{
    border: none;
}
.price-input:focus-within {
  border-color: #007bff; /* Highlight border */
  box-shadow: 0 0 3px rgba(0, 123, 255, 0.5); /* Optional shadow effect */
}

</style>