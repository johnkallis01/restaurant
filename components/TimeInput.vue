<script setup>
const {time, disabled} = defineProps({
    time: { 
      type: Object,
      required: true,
      default: { hour: 0, min: 0, pm: false }
    },
    disabled: { type: Boolean, required: true, default: false},
    error: { type: Boolean, required: false, default: false},
    
});
const emit = defineEmits(['update:time']);

const hours=[0,1,2,3,4,5,6,7,8,9,10,11];
const mins = [0,15,30,45];
const displayHour= (hour)=>{
  if (!hour) return 12;
  else if(hour < 10) return '0'+ hour; 
  else return hour;
}

const updateHour = (hour) => {
  if(time['pm']) hour+=12;
  time['hour']=hour;
  emit('update:time', time);
}
const updatePM = (pm) => {
  if (pm) time['hour']+=12;
  else if(!pm) time['hour']-=12;
  emit('update:time', time);
}
const updateMinute = (min) => {emit('update:time', { ...time, min });}
</script>
<template>
    <div class="time-group">
      <select :disabled="disabled" @change="updateHour(Number($event.target.value))" :class="{'error-text': error && !disabled}">
        <option v-for="h in hours" :key="h" class="options">{{ displayHour(h) }}</option>
      </select>
      <span :class="{'placeholder-color': disabled,'error-text':error && !disabled}">:</span>
      <select :disabled="disabled" @change="updateMinute(Number($event.target.value))" :class="{'error-text': error && !disabled}">
        <option  v-for="m in mins" :key="m" class="options">
          {{ m<15 ? m+'0':m }}
        </option>
      </select>
      <button class="toggle" @click="time['pm']=!time['pm']; updatePM(time['pm'])" :disabled="disabled" :class="{'error-text': error && !disabled}">
        <Transition name="slide-fade">
          <span v-if="time['pm']" :class="{'placeholder-color': disabled}">PM</span>
          <span v-else :class="{'placeholder-color': disabled}">AM</span>
        </Transition>
      </button>
    </div>
</template>
<style scoped>
.time-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.options{
  font-size: 12px;
}
.toggle{
  width: 30px;
}
select{
  padding: 5px;
}
select:hover{
  background-color: rgb(248, 238, 238);
  border-radius: 7px;
}
select:focus{
  outline: none;
}
@media (max-width: 740px){
  .time-group{
    gap: 0px;
  }
  .select{
    padding: 0;
  }
}
</style>