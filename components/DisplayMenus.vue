<script setup>
const {menus} = defineProps({menus: {type: Array, required: true}});
</script>
<template>
    <div>
        {{ menus }}
    </div>
</template>