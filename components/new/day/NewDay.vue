<script setup>
import NewDayDialog from './NewDayDialog.vue';
import TimeInput from './TimeInput.vue';

const emit = defineEmits(['daysTimes']);

const scheduleDialogFlag = ref(false);
const days = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
const schedule = ref(
  days.value.map((day) => ({
    day,
    open: false,
    startTime: { hour: 12, min: 0, pm: false },
    endTime: { hour: 12, min: 0, pm: false },
  }))
);
// Function to emit the schedule data
function sendDaysTimes() {
  console.log('Schedule:', schedule);
  emit('daysTimes', schedule);
}
</script>

<template>
  <div class="card">
    <!-- Iterate through each day's schedule -->
    <div v-for="(day, i) in schedule" :key="i" class="day-card">
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
    <!-- Submit Button -->
    <v-btn
      text="Submit Schedule"
      @click="scheduleDialogFlag=true"
      class="submit-btn"
    ></v-btn>
    <v-dialog v-model="scheduleDialogFlag" class="schedule-dialog">
      <NewDayDialog :schedule="schedule"/>
    </v-dialog>
  </div>
</template>

<style scoped>
.card {
  padding: 8px;
  margin-top: 10px;
}
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
  width: 50%;
}
</style>