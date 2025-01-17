<script setup>
const { item } = defineProps({item: {type: Object, required: true}})
const emits = defineEmits(['send-item']);
const { formatPrice } = usePriceFormatter();
</script>
<template>
    <div class="container">
        <div class="item-title">
            <div class="item-name">
                {{ item['name'] }} 
            </div>
            <div class="item-price">
                {{ formatPrice(item['price']) }}
            </div>  
        </div>
        <div class="form-body">

        </div>
        <div class="form-actions">
            <button class="btn">submit</button>
            <button class="btn">cancel</button>
        </div>
    </div>
</template>
<style scoped>
.btn{
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
</style>