<script setup>
const props = defineProps({
    schedule: { type: Array, required: true }
});

const invalidFlag = ref(true);
const scheduleErrors = ref([]);

function scheduleDialog() {
  props.schedule.forEach((day) => {
    if (day.open) {
      const start = day.startTime.hour * 60 + day.startTime.min*10 + (day.startTime.pm ? 720 : 0);
      const end = day.endTime.hour * 60 + day.endTime.min*10 + (day.endTime.pm ? 720 : 0);
      if (start >= end) {
        console.log('error on day ', day.day);
        scheduleErrors.value.push(day);
        invalidFlag.value=false;
      }
    }
  });
}
onMounted(()=>{
    scheduleDialog();
})
</script>
<template>
    <v-card>
        <div v-if="scheduleErrors.length">
          <NewDayDisplay :schedule="scheduleErrors" :invalidFlag="invalidFlag"/>
        </div>
        <div v-else>
          <NewDayDisplay :schedule="schedule" :invalidFlag="invalidFlag"/>
        </div>
    </v-card>
</template>
<style>
    
</style>