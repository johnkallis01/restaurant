<script setup>
const {menu} = defineProps({menu: {type: Object, required: true}});
</script>
<template>
    <div>
        <div v-for="(section, i) in menu['sections']" :key="i">
            {{ section.name }}
        </div>
    </div>
</template>