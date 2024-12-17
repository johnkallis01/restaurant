<script setup>
import { reactive, ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['daysTimes']);

const days = ref(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
const schedule = reactive(
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
  <v-card class="card">
    <v-list>
      <!-- Iterate through each day's schedule -->
      <v-list-item v-for="(day, i) in schedule" :key="i">
        <v-card class="day-card">
          <span id="day" class="day-name">{{ day.day }}</span>
          
          <!-- Start Time Selection -->
          <div class="time-group">
            <v-switch
              v-model="day.open"
              class="open-closed-switch"
              :false-value="false"
              :true-value="true"
              inset
              :label="day.open ? 'Open' : 'Closed'"
            ></v-switch>

            <!-- Start Time Hour -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props">{{ day.startTime.hour }}</v-btn>
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
            
            :
            
            <!-- Start Time Minute -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props">{{ day.startTime.min }}0</v-btn>
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
            
            <!-- Start Time AM/PM Switch -->
            <v-switch
              v-model="day.startTime.pm"
              class="am-pm-switch"
              :false-value="false"
              :true-value="true"
              inset
              :label="day.startTime.pm ? 'PM' : 'AM'"
            ></v-switch>
          </div>

          <!-- End Time Selection -->
          <div class="time-group">
            <!-- End Time Hour -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props">{{ day.endTime.hour }}</v-btn>
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
            
            :
            
            <!-- End Time Minute -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props">{{ day.endTime.min }}0</v-btn>
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
            
            <!-- End Time AM/PM Switch -->
            <v-switch
              v-model="day.endTime.pm"
              class="am-pm-switch"
              :false-value="false"
              :true-value="true"
              inset
              :label="day.endTime.pm ? 'PM' : 'AM'"
            ></v-switch>
          </div>
        </v-card>
      </v-list-item>
    </v-list>

    <!-- Submit Button -->
    <v-btn text="Submit Schedule" @click="sendDaysTimes" class="submit-btn"/>
  </v-card>
</template>

<style scoped>
.card {
  margin-bottom: -;
  padding: 16px; /* Remove extra space around card */
}

.day-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px; /* Reduce gap between elements */
  padding: 8px;
  margin-bottom: -20px; /* Reduced bottom margin for compactness */
  margin-top: -20px;
}

.day-name {
  font-weight: bold;
  width: 100px; /* Adjust width to reduce space */
}

.time-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.open-closed-switch {
  align-self: center;
  margin-top: 20px; /* Remove unnecessary margin */
}

.am-pm-switch {
  align-self: center;
  margin-top: 16px; /* Remove unnecessary margin */
}

.submit-btn {
  margin-top: 16px;
}
</style>