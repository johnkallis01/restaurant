<script setup>

const emit = defineEmits(['update:time']);

const {time, disabled, error} = defineProps({
    time: { type: Object,required: true},
    disabled: { type: Boolean, required: true},
    error: { type: Boolean, required: false, default: false},  
});
const localTime=ref(time);
const hours=[0,1,2,3,4,5,6,7,8,9,10,11];
const mins = [0,15,30,45];
const displayHour = (hour) => (hour === 0 ? 12 : hour);

const updateHour = (h) => {
  emit('update:time', {...localTime.value, hour: localTime.value.pm & h<12 ? h + 12 : h,});
};
const updatePM = (pm) => {
  const newHour = localTime.value.hour;
  if (pm && localTime.value.hour < 12) newHour += 12;
  if (!pm && localTime.value.hour >= 12) newHour -= 12;
  emit('update:time', { ...localTime.value, pm, hour: newHour });
};
const updateMinute = (m) => {emit('update:time', { ...localTime.value, m });};
</script>
<template>
    <div class="time-group">
      <select :class="{'error-text': error && !disabled}"
        @change="updateHour(Number($event.target.value))"
        :value="(localTime.hour === 0 || localTime.hour % 12 ===0) ? 12 : localTime.hour % 12" 
        :disabled="disabled">
        <option class="options" type="number"
          v-for="h in hours" :key="h">
          {{ displayHour(h) }}
        </option>
      </select>
      <span :class="{'placeholder-color': disabled,'error-text':error && !disabled}">
        :
      </span>
      <select :class="{'error-text': error && !disabled}"
        @change="updateMinute(Number($event.target.value))"
        :value="localTime.min===0 ? '00' : localTime.min"
        :disabled="disabled">
        <option class="options"
          v-for="m in mins" :key="m">
          {{ m<15 ? m+'0':m }}
        </option>
      </select>
      <button class="toggle" :class="{'error-text': error && !disabled}"
        @click="localTime.pm=!localTime.pm; updatePM(localTime.pm)"
        :disabled="disabled" >
        <Transition name="slide-fade">
          <span :class="{'placeholder-color': disabled}" 
            v-if="localTime.pm">PM</span>
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