<script setup>
const props=defineProps({menu:{type: Object, required: false}});
const openDays=ref(props.menu.days.filter(day => day.open));
function similarDays(){
    console.log(props.menu.name)
    console.log(openDays.value.length)
    let similarDays = [];
    let redoLoop=[];
    let previousDay;
    if(openDays.value.length){
        previousDay=openDays.value[0];
    }
    
    for(let i=1; i< openDays.value.length;i++){
        if(
            previousDay.start.hour===openDays.value[i].start.hour &&
            previousDay.end.hour===openDays.value[i].end.hour &&
            previousDay.start.min===openDays.value[i].start.min &&
            previousDay.end.min===openDays.value[i].end.min
        ) {
            similarDays.push(openDays.value[i])
            previousDay=openDays.value[i]
        }else{
            redoLoop.push(openDays.value[i])
        }
    }
    console.log('similar',similarDays)
    console.log('not', redoLoop)
}
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