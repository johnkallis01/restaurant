<script setup>
const emit = defineEmits(['update:time']);
const {time, disabled, error} = defineProps({
    time: { type: Object,required: true},
    disabled: { type: Boolean, required: true},
    error: { type: Boolean, required: false, default: false},  
});
const hours=[0,1,2,3,4,5,6,7,8,9,10,11];
const mins = [0,15,30,45];
const updateHour = (h) => {
  emit('update:time', {...time, hour: time.pm & h<12 ? h + 12 : h,});
};
const updatePM = (pm) => {
  let newHour = time.hour;
  if (pm && time.hour < 12) newHour += 12;
  if (!pm && time.hour >= 12) newHour -= 12;
  emit('update:time', { ...time, pm, hour: newHour });
};
const updateMinute = (min) => {
  emit('update:time', { ...time, min });
};
</script>
<template>
    <div class="time-group">
      <select :class="{'error-text': error && !disabled}"
        @change="updateHour(Number($event.target.value))"
        :value="(time.hour === 0 || time.hour % 12 ===0) ? 12 : time.hour % 12" 
        :disabled="disabled">
        <option class="options" type="number"
          v-for="h in hours" :key="h">
          {{ (h === 0 ? 12 : h) }}
        </option>
      </select>
      <span :class="{'placeholder-color': disabled,'error-text':error && !disabled}">
        :
      </span>
      <select :class="{'error-text': error && !disabled}"
        @change="updateMinute(Number($event.target.value))"
        :value="time.min===0 ? '00' : time.min"
        :disabled="disabled">
        <option class="options"
          v-for="m in mins" :key="m">
          {{ m<15 ? m+'0':m }}
        </option>
      </select>
      <button class="toggle" :class="{'error-text': error && !disabled}"
        @click="time.pm=!time.pm; updatePM(time.pm)"
        :disabled="disabled" >
        <Transition name="slide-fade">
          <span :class="{'placeholder-color': disabled}" 
            v-if="time.pm">PM</span>
          <span :class="{'placeholder-color': disabled}"
            v-else>AM</span>
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
  text-align: right;
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