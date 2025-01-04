<script setup>
const props = defineProps({
    removes: { type: Array, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
    
})
const viewRemoves = ref(false);
</script>
<template>
    <div class="remove-container">
        <span class="title-text" @click="viewRemoves=!viewRemoves">Removes:</span>
        <div class="remove" v-if="viewRemoves">
            <p class="remove-name">removes go here</p>
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