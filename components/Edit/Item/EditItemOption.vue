<script setup>
const props = defineProps({
    Options: { type: Array, required: false },
    item_id: { type: String, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
});
const menuStore = useMenuStore();
const viewOptions = ref(false);
</script>
<template>
    <div>
        <span class="title-text" @click="viewOptions=!viewOptions">Options:</span>
        <div v-if="viewOptions">
            <p>Options go here</p>
        </div>
    </div>
</template>