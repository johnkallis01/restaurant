<script setup>
const {day} = defineProps({day: {type: Object, required: true}});
const localDay=reactive(day)
const emit = defineEmits(['send-day']);
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
  console.log(d)
  localDay.end=d;
  emit('send-day', localDay);
}

</script>
<template>
  <div class="day-card">
    <div>{{ localDay.day.name + ":"}}</div>
    <div class="times">
      <div @click="localDay.open=!localDay.open" class="toggle">
        <Transition name="slide-fade">
          <span v-if="localDay.open">open</span>
          <span v-else>closed</span>
        </Transition>
      </div>
      <TimeInput :error="errorTime"
          :time="localDay.start" :disabled="!localDay.open" 
          @update:time="getStart"/>
      <span :class="{'placeholder-color': !localDay.open,'error-text': errorTime && localDay.open}">-</span>
      <TimeInput :error="errorTime"
        :time="localDay.end" :disabled="!localDay.open" @update:time="getEnd"/>
    </div>
  </div>
</template>

<style scoped>
.day-card {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.toggle{
  margin-right: 40px;
}
@media (max-width: 755px){
  .times{
    gap:0;
  }
  .toggle{
    margin: 0;

  }
}
.times{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 15px;
}
</style>