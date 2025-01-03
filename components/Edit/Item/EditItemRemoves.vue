<script setup>
const props = defineProps({
    remove: { type: String, required: false },
    item: { type: Object, required: true },
    section: { type:Object, required: true},
    menu: { type:Object, required: true},
    
})
</script>
<template>
    <div class="remove-container">
        <p class="remove-title">Removes:</p>
        <div class="remove">
            <p class="remove-name">{{ remove }}</p>
        </div>
        
    </div>
</template>
<style scoped>
.remove-container{
    
}
.remove-name{
    row-gap: 100px;
    margin-left: 30px;
}
</style>