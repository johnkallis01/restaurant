<script setup>
const {day} = defineProps({day: {type: Object, required: true}});
const emit = defineEmits(['send-day']);
const errorTime = computed(()=>{
  if(day['start'].hour > day['end'].hour) {
    day['error']=true;
    return true;
  }else {
    day['error']=false;
    return false;
  }
});
const getStart = (d) =>{
  day['start']=d;
  emit('send-day',day);
}
const getEnd = (d)=>{
  day['end']=d;
  emit('send-day', day);
}

</script>
<template>
  <div class="day-card">
    <div>{{ day['day'].name + ":"}}</div>
    <div class="times">
      <div @click="day['open']=!day['open']" class="toggle">
        <Transition name="slide-fade">
          <span v-if="day['open']">open</span>
          <span v-else>closed</span>
        </Transition>
      </div>
      <TimeInput :error="errorTime"
          :time="day['start']" :disabled="!day['open']" 
          @update:time="getStart"/>
      <span :class="{'placeholder-color': !day['open'],'error-text': errorTime && day['open']}">-</span>
      <TimeInput :error="errorTime"
        :time="day['end']" :disabled="!day['open']" @update:time="getEnd"/>
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