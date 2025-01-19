<script setup>

</script>
<template>
    <div class="schedule">
        <span v-for="(day, i) in openDays" :key="i">{{ i===openDays.length-1 ? day.day.name : day.day.name + "," }}</span>
        <span>{{similarDays()}}</span>
    </div>
</template>
<style scoped>
.schedule{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
</style>