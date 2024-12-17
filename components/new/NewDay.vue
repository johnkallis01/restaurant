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
  <v-card>
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
    <v-btn text="Submit Schedule" @click="sendDaysTimes"/>
  </v-card>
</template>

<style scoped>
.day-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  padding: 8px;
}

.day-name {
  font-weight: bold;
  width: 90px; /* To keep day names aligned */
}

.time-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.open-closed-switch {
  align-self: flex-end; /* Align the switch to the baseline of other inputs */
  margin-top: 20px; /* Fine-tune vertical alignment */
  width: 120px;
}
.am-pm-switch {
  align-self: flex-end; /* Align the switch to the baseline of other inputs */
  margin-top: 20px; /* Fine-tune vertical alignment */
  width: 90px;
}
</style>