<script setup>
const props = defineProps({
    price:{
        type: String,
        required: true,
        default: '000.00'
    }
});
const emit = defineEmits(['update-price']);
//emit to parent component
const submitPrice = () =>{
    emit('update-price', formattedPrice.value)
}
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
//expose focus to parent
defineExpose({ focusInput });
onMounted(()=>{
    focusInput();
})

</script>
<template>
    <div class="price-input">
        <div class="text-field price">
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
    </div>
</template>
<style scoped>
.text-field.price input{
    width: auto;
    background-color: white;
    padding: 0 2px;
    text-align: right;
    max-width: 65px;
}
.text-field.price .prefix{
    position: relative;
    left: 24px;
}
</style>