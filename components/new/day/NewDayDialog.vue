<script setup>
const props = defineProps({
    schedule: { type: Array, required: true }
});
const emit = defineEmits(['getDialogFlag'])

const correctTimes = ref(true);
const validateSchedule = () => {
  props.schedule.forEach((day) => {
    if (day.open) {
      const start = day.startTime.hour * 60 + day.startTime.min*10 + (day.startTime.pm ? 720 : 0);
      const end = day.endTime.hour * 60 + day.endTime.min*10 + (day.endTime.pm ? 720 : 0);
      if (start >= end) {
        day.error=true;
        correctTimes.value=false;
      }
      else{
        day.error = false;
      }
    }
  });
}
const sendSubmit = () => {
  if(correctTimes.value){emit('getDialogFlag', { submit: true, cancel: false})}
  else{emit('getDialogFlag', { submit: false, cancel: false})}
}
const sendCancel = () => {
  emit('getDialogFlag', { submit: false, cancel: true});
}

onMounted(()=>{
  validateSchedule();
})
</script>
<template>
    <v-card class="card">
      <v-list>
        <v-card>
        <v-list-item v-for="(day, i) in schedule" :key="i" class="list-item">
          <v-card class="day-card">
              <span class="day-name">{{ day.day + ":  "}}</span>
              <span class="day-time" v-if="day.open">
                <span v-if="!day.error">
                  {{ day.startTime.hour + ":" + day.startTime.min + "0 " + (day.startTime.pm ? "PM":"AM") +
                      " - " + day.endTime.hour + ":" + day.endTime.min + "0 " + (day.endTime.pm ? "PM":"AM")}}
                </span>
                <span style="color:red" class="day-time" v-else>
                  These times are invalid
                </span>
              </span>
              <span class="closed-text" v-else>Closed</span>
          </v-card>
        </v-list-item>        
      </v-card>
      </v-list>
      <v-card-actions>
        <!-- true disables -->
        <v-btn
          color="success"
          :disabled="!correctTimes"
          text="Submit Schedule"
          @click="sendSubmit()"
        />
        <v-btn
          color="error" 
          text="Cancel"
          @click="sendCancel()"
        />
      </v-card-actions>
    </v-card>
</template>
<style scoped>
.card {
  padding: 20px;
}
.list-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0; /* Optional: Divider between rows */
}
.day-card {
  display: flex;
  align-items: left;
  width: 100%; /* Make sure the card spans the full width */
}
.day-name {
  width: 150px; /* Fixed width to align day names */
  font-weight: bold;
  text-align: left;
}
.day-time {
  text-align: left;
  width: 400px; /* Ensures all times align vertically */
}
.closed-text {
  text-align: left;
  width: 400px;
  font-weight: bold;
}
</style>