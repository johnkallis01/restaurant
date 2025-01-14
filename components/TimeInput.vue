<script setup>
const {time, disabled} = defineProps({
    time: { 
      type: Object,
      required: true,
      default: { hour: 0, min: 0, pm: false }
    },
    disabled: { type: Boolean, required: true, default: false}
    
});
const mins = [0,15,30,45]
const emit = defineEmits(['update:time']);

function updateHour(hour) {
  emit('update:time', { ...time, hour });
}

function updateMinute(min) {
  emit('update:time', { ...time, min });
}

function toggleAMPM(pm) {
  emit('update:time', { ...time, pm });
}
</script>
<template>
    <div class="time-group">
      <select>
        <option class="options">{{ '12' }}</option>
        <option v-for="h in 11" :key="h" class="options">{{ h > 9 ? h : '0'+h }}</option>
      </select>:
      <select>
        <option v-for="m in mins" :key="m" class="options">{{ m<15 ? m+'0':m }}</option>
      </select>
      <div class="toggle" @click="time.pm=!time.pm">
        <Transition name="slide-fade">
          <span v-if="time.pm">AM</span>
          <span v-else>PM</span>
        </Transition>
      </div>
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