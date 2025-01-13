<script setup>
import { onMounted } from 'vue';
import NewDayDialog from './NewDayDialog.vue';
import TimeInput from './TimeInput.vue';

const props = defineProps({
    day: {type: String, required: true}
});
// Define emits to send data to the parent
const emit = defineEmits(['daysTimes']);

// Control for the dialog visibility
const scheduleDialogFlag = ref(false);
const schedule = ref({
    day: props.day,
    open: false,
    startTime: { hour: 12, min: 0, pm: false },
    endTime: { hour: 12, min: 0, pm: false },
    error: false, // Track invalid schedules
  });
// Function to validate the schedule
const recieveDialogFlag = (correctTimes) => {
  scheduleDialogFlag.value=false;
  if(correctTimes.submit){
    emit('daysTimes', { schedule: schedule.value, correctTimes: true});
  }
  else{
    emit('daysTimes', {correctTimes: false})
  }
};
const submitSchedule = () => {
  let submitFlag = false;
  if(props.menuName.trim().length && /^[a-zA-Z]/.test(props.menuName)){
    submitFlag = schedule.value.find((day) => day.open === true);
    //console.log(submitFlag)
  }
  else{
    emit('daysTimes', {enterName: false})
  }
  
  if(submitFlag){
    scheduleDialogFlag.value = true;
  }
}

</script>
<template>
  <div class="day-card">
    <div>{{ day + ":"}}</div>
    <div class="times">
      <div class="time">start time</div>
      <div class="time"> end time</div>
      <div class="switch-container">
        <label class="switch">
            <input type="checkbox" id="toggleSwitch" onchange="toggleSwitch()">
            <span class="slider"></span>
        </label>
    </div>
    </div>
    
  </div>
</template>

<style scoped>
.switch-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.switch {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 16px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 16px; /* Make it fully rounded */
}

.slider:before {
    position: absolute;
    content: "";
    height: 12px;   /* Smaller circle height */
    width: 12px;    /* Smaller circle width */
    border-radius: 50%;
    left: 2px;      /* Adjusted left position for smaller circle */
    bottom: 2px;    /* Adjusted bottom position for smaller circle */
    background-color: white;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #4CAF50;
}

input:checked + .slider:before {
    transform: translateX(10px); /* Moves circle fully to the other side */
}

.day-card {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin: 5px 0 0 15px;
}
.times{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
}
.time{
  flex: 1;
  width: 40px;
}
.day-name {
  font-weight: bold;
  width: 100px; /* Adjust width to fit the content tightly */
}
.time-group {
  display: flex;
  align-items: center;
  gap: 6px; /* Reduce spacing between elements */
}
.open-switch {
  height: 36px; /* Make switches taller */
  line-height: 36px; /* Align the text vertically */
  display: flex;
  align-items: center;
  width: 110px;
}
.v-btn {
  min-width: 36px; /* Smaller button width */
  height: 30px; /* Reduce button height */
  font-size: 12px; /* Smaller font size for buttons */
}
.submit-btn {
  margin-top: 12px;
  font-size: 14px;
  width: 100%;
}
.schedule-dialog {
  align-items: center;
  width: 40%;
}
</style>