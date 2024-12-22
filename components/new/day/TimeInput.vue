<script setup>
const props = defineProps({
    time: { 
      type: Object,
      required: true,
      default: () => ({ hour: 12, min: 0, pm: false })
    },
    open: { type: Boolean, required: true, default: false}
    
});

const emit=defineEmits(['update:time']);

const updateHour = (hour) => {
  emit('update:time', { ...props.time, hour });
}

const updateMinute = (min) => {
  emit('update:time', { ...props.time, min });
}

const toggleAMPM = () => {
  emit('update:time', { ...props.time, pm: !props.time.pm });
}
</script>
<template>
    <div class="time-group">
        <v-menu :disabled="!open">
          <template v-slot:activator="{ props }">
            <v-btn small v-bind="props">{{ time.hour }}</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(hour) in 12"
              :key="hour"
              @click="updateHour(hour)"
            >
              <v-list-item-title>{{ hour }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Separator -->
        <span class="separator">:</span>

        <!-- End Time Minute -->
        <v-menu :disabled="!open">
          <template v-slot:activator="{ props }">
            <v-btn small v-bind="props">{{ time.min }}0</v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(min) in 6"
              :key="min"
              @click="updateMin(min-1)"
            >
              <v-list-item-title>{{ (min - 1) + "0" }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- AM/PM Switch -->
        <v-switch
          v-model="time.pm"
          class="pm-switch"
          :false-value="false"
          :true-value="true"
          :label="time.pm ? 'PM' : 'AM'"
          :disabled="!open"
          @click="toggleAMPM"
        ></v-switch>
    </div>
</template>
<style scoped>
.time-group {
  display: flex;
  align-items: center;
  gap: 6px; /* Reduce spacing between elements */
}
.separator {
  font-size: 16px;
  font-weight: bold;
  margin: 0 4px; /* Reduce space around separators */
}
.pm-switch {
  height: 36px; /* Make switches taller */
  line-height: 36px; /* Align the text vertically */
  display: flex;
  align-items: center; /* Reduce switch height */
}
</style>