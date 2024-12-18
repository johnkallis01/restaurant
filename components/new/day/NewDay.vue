<script setup>
import NewDayDialog from './NewDayDialog.vue';

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
      <div class="time-group">
        <v-switch
          v-model="day.open"
          color="success"
          class="open-switch"
          :false-value="false"
          :true-value="true"
          :label="day.open ? 'Open' : 'Closed'"
        ></v-switch>

        <!-- Start Time Hour -->
        <v-menu :disabled="!day.open">
          <template v-slot:activator="{ props }">
            <v-btn small v-bind="props">{{ day.startTime.hour }}</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(hour) in 12"
              :key="hour"
              @click="day.startTime.hour = hour"
            >
              <v-list-item-title>{{ hour }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Separator -->
        <span class="separator">:</span>

        <!-- Start Time Minute -->
        <v-menu :disabled="!day.open">
          <template v-slot:activator="{ props }">
            <v-btn small v-bind="props">{{ day.startTime.min }}0</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(min) in 6"
              :key="min"
              @click="day.startTime.min = min - 1"
            >
              <v-list-item-title>{{ min - 1 }}0</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- AM/PM Switch -->
        <v-switch
          v-model="day.startTime.pm"
          class="pm-switch"
          :false-value="false"
          :true-value="true"
          :label="day.startTime.pm ? 'PM' : 'AM'"
          :disabled="!day.open"
        ></v-switch>
      </div>

      <!-- End Time Selection -->
      <div class="time-group">
        <!-- End Time Hour -->
        <v-menu :disabled="!day.open">
          <template v-slot:activator="{ props }">
            <v-btn small v-bind="props">{{ day.endTime.hour }}</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(hour) in 12"
              :key="hour"
              @click="day.endTime.hour = hour"
            >
              <v-list-item-title>{{ hour }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Separator -->
        <span class="separator">:</span>

        <!-- End Time Minute -->
        <v-menu :disabled="!day.open">
          <template v-slot:activator="{ props }">
            <v-btn small v-bind="props">{{ day.endTime.min }}0</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(min) in 6"
              :key="min"
              @click="day.endTime.min = min - 1"
            >
              <v-list-item-title>{{ min - 1 }}0</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- AM/PM Switch -->
        <v-switch
          v-model="day.endTime.pm"
          class="pm-switch"
          :false-value="false"
          :true-value="true"
          :label="day.endTime.pm ? 'PM' : 'AM'"
          :disabled="!day.open"
        ></v-switch>
      </div>
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
  padding: 8px; /* Reduced padding around the card */
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
.pm-switch {
  height: 36px; /* Make switches taller */
  line-height: 36px; /* Align the text vertically */
  display: flex;
  align-items: center; /* Reduce switch height */
}

.v-btn {
  min-width: 36px; /* Smaller button width */
  height: 30px; /* Reduce button height */
  font-size: 12px; /* Smaller font size for buttons */
}

.separator {
  font-size: 16px;
  font-weight: bold;
  margin: 0 4px; /* Reduce space around separators */
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