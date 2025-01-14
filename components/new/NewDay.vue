<script setup>
const {day} = defineProps({
    day: {type: Object, required: true}
});
const emit = defineEmits(['send-day']);
const schedule = ref({
    day: day,
    open: false,
    start: { hour: 0, min: 0, pm: false },
    end: { hour: 0, min: 0, pm: false },
    error: false,
});
</script>
<template>
  <div class="day-card">
    <div>{{ schedule.day.name + ":"}}</div>
    <div class="times">
      <div @click="schedule.open=!schedule.open" class="toggle">
        <Transition name="slide-fade">
          <span v-if="schedule.open">open</span>
          <span v-else>closed</span>
        </Transition>
      </div>
      <TimeInput :time="schedule.start" :disabled="!schedule.open"/>
      -
      <TimeInput :time="schedule.end" :disabled="!schedule.open" />
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
  margin-right: 20px;
}
@media (max-width: 740px){
  .times{
    margin: 0;
    gap:0;
  }
  .toggle{
    margin: 0px;
  }
}
.times{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 15px;
  margin-right: 20px;
}
</style>