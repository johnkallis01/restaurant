<script setup>
const emit = defineEmits(['send-day']);
const {day} = defineProps({day: {type: Object, required: true}});
const localDay=reactive(day)
const errorTime = computed(()=>{
  if(localDay.start.hour > localDay.end.hour) {
    localDay.error=true;
    return true;
  }else {
    localDay.error=false;
    return false;
  }
});
const getStart = (d) =>{
  localDay.start=d;
  emit('send-day',localDay);
}
const getEnd = (d)=>{
  localDay.end=d;
  emit('send-day', localDay);
}
</script>
<template>
  <div class="day-card">
    <div class="day">{{ localDay.day.name + ":"}}</div>
    <div class="times">
      <div @click="localDay.open=!localDay.open" class="toggle">
        <Transition name="slide-fade">
          <span v-if="localDay.open">open</span>
          <span v-else>closed</span>
        </Transition>
      </div>
      <div class="time-inputs">
        <TimeInput :error="errorTime" class="time-input"
          :time="localDay.start" :disabled="!localDay.open" 
          @update:time="getStart"/>
        <span :class="{'placeholder-color': !localDay.open,'error-text': errorTime && localDay.open}">-</span>
        <TimeInput :error="errorTime" class="time-input"
          :time="localDay.end" :disabled="!localDay.open" @update:time="getEnd"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time-inputs{
  display: flex;
  gap: 5px;
}
.day-card {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  /* border: 1px solid blue;
  box-sizing: border-box; */
}
.day{
  width: 100px;
  min-width: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* border: 1px solid purple;
  box-sizing: border-box; */
}
@media(max-width: 755px){
  .day-card{
    justify-content: center;
  }
  .times{
    gap:0;
  }
  .toggle{
    margin: 0;
  }  
}
@media(max-width: 600px){
  .day{
    width: 40px;
  }
  
}

.times{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 15px;
}
</style>