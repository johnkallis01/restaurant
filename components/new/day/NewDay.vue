<script setup>
import { onMounted } from 'vue';
import NewDayDialog from './NewDayDialog.vue';
import TimeInput from './TimeInput.vue';

const props = defineProps({
    menuName: { type: String, required: true }
});
// Define emits to send data to the parent
const emit = defineEmits(['daysTimes']);

// Control for the dialog visibility
const scheduleDialogFlag = ref(false);
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const schedule = ref([]);

onMounted(() => {
    // Initialize the schedule only on the client
  schedule.value = days.map((day) => ({
    day,
    open: false,
    startTime: { hour: 12, min: 0, pm: false },
    endTime: { hour: 12, min: 0, pm: false },
    error: false, // Track invalid schedules
  }));
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
  <div>
    <!-- Iterate through each day's schedule -->
    <client-only>
      <div class="day-card" v-for="(day, i) in schedule" :key="i">
        <span class="day-name">{{ day.day }}</span>

        <!-- Start Time Selection -->
        <template class="time-group">
          <v-switch
            v-model="day.open"
            color="success"
            class="open-switch"
            :false-value="false"
            :true-value="true"
            :label="day.open ? 'Open' : 'Closed'"
          ></v-switch>
          <TimeInput
            :time="day.startTime"
            :open="day.open"
            @update:time="(value) => day.startTime = value"
          />
        </template>

        <!-- End Time Selection -->
        <template class="time-group">
          <!-- End Time Hour -->
          <TimeInput
            :time="day.endTime"
            :open="day.open"
            @update:time="(value) => day.endTime = value"
          />
        </template>
      </div>
    </client-only>
    <!-- Submit Button -->
    <v-btn
      text="Submit Schedule"
      @click="submitSchedule"
      class="submit-btn"
    />
    <v-dialog
      v-model="scheduleDialogFlag" 
      persistent
      class="schedule-dialog"
    >
      <NewDayDialog :schedule="schedule" @getDialogFlag="recieveDialogFlag"/>
    </v-dialog>
  </div>
</template>

<style scoped>
.day-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px; /* Adjust the gap between items */
  margin-bottom: 20px; /* Reduce space between day rows */
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