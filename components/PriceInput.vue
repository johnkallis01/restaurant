<script setup>
const props = defineProps({
    title:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true,
        default: '000.00'
    }
});
const emit = defineEmits(['update:price']);
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
    if(!/^\d$/.test(inputChar)){ //if not a number
        event.target.value=formattedPrice.value; //update the input with previous value in format 000.00
        return; //end function call999
    }
    rawPrice.value = (rawPrice.value + inputChar).slice(-5); //add the new input the end of the string and remove left most value
    emit('update:price', formattedPrice.value)
    event.target.value = formattedPrice.value;
};
</script>
<template>
    <div class="text-field">
        <label for="price-input" id="item-price-label">{{ title }}</label>
        <div class="price-input">
            <span class="prefix">$</span>
            <input
                id="item-price"
                type="text"
                placeholder="000.00"
                :value="formattedPrice"
                @input="formatPriceInput"
            >
        </div>
    </div>
</template>
<style scoped>
#item-price{
    width: 70px;
}
.price-field{
    
}
.price-input{
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 8px;
    background-color: #fff;
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