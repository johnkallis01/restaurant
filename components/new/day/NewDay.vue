<script setup>
const props = defineProps({
    day: {type: String, required: true}
});
const emit = defineEmits(['send-day']);
const schedule = ref({
    day: props.day,
    open: false,
    start: { hour: '00', min: '00', pm: false },
    end: { hour: '00', min: '00', pm: false },
    error: false,
});
</script>
<template>
  <div class="day-card">
    <div>{{ schedule.day + ":"}}</div>
    <div class="times">
      <div @click="schedule.open=!schedule.open" class="toggle">
        <div class="toggle-text">
          <span :class="{ active: schedule.open }">open</span>
          <span :class="{ active: !schedule.open }">closed</span>
        </div>
      </div>
      <select class="time-dropdown" v-model="schedule.start.hour">
        <option v-for="h in 12" :key="h">{{ h > 9 ? h : '0'+h }}</option>
      </select>:
      <select v-model="schedule.start.min" class="time-dropdown">
        <option :value="schedule.start.hour">{{ '12' }}</option>
        <option v-for="m in 6" :key="m" :value="schedule.start.min">{{ (m-1)+"0" }}</option>
      </select>
      <div class="toggle pm" @click="schedule.start.pm=!schedule.start.pm">
        <div class="toggle-text">
          <span :class="{active: schedule.start.pm }">AM</span>
          <span :class="{active: !schedule.start.pm }">PM</span>
        </div>
      </div>     
      -
      <select v-model="schedule.end.hour" class="time-dropdown">
        <option :value="schedule.end.hour">{{ '12' }}</option>
        <option v-for="h in 11" :key="h" :value="schedule.end.hour">{{ (h > 9) ? h : '0'+h }}</option>
      </select>:
      <select v-model="schedule.end.min" class="time-dropdown">
        <option v-for="m in 6" :key="m" :value="schedule.end.min">{{ (m-1)+"0" }}</option>
      </select>
      <div class="toggle pm" @click="schedule.end.pm=!schedule.end.pm">
        <div class="toggle-text">
          <span :class="{active: schedule.end.pm }">AM</span>
          <span :class="{active: !schedule.end.pm }">PM</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.time-dropdown {
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease;
}
.time-dropdown:hover,
.time-dropdown:focus {
  border-color: rgba(76, 150, 175, 0.5);
}
.day-card {
  border: 2px dotted rgb(192, 192, 116);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin: 5px 0 0 15px;
}
.times{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 5px;
}
.toggle {
  display: flex;
  justify-content: center;
  width: 50px;
  height: 30px;
  position: relative;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  overflow: hidden;
  border: 2px solid black;
  border-radius: 7px;
}
.toggle.pm{
  width: 30px;
}
.toggle-text {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  top: 0;
}
.toggle-text span {
  display: block;
  width: 100%;
  line-height: 40px;
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: absolute;
  top: 0;
}
.toggle-text span.active {
  opacity: 1;
  transform: translateY(-10%);
}
.toggle-text span:not(.active) {
  opacity: 0;
  transform: translateY(-100%);
}
</style>