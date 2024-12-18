<script setup>
const props = defineProps({
    schedule: { type: Array, required: true },
    invalidFlag: {type: Boolean, required: true}
});

</script>
<template>
    <div>
        <v-list>
            <v-list-item v-for="(day, i) in schedule" :key="i">
                <v-card>
                    <span>{{ day.day + ":  "}}</span>
                    <span v-if="day.open">
                        {{ day.startTime.hour + ":" + day.startTime.min + "0 " + (day.startTime.pm ? "AM":"PM") +
                            " - " + day.endTime.hour + ":" + day.endTime.min + "0 " + (day.endTime.pm ? "AM":"PM")}}
                    </span>
                    <span v-else>Closed</span>
                </v-card>
            </v-list-item>
            <v-list-item v-if="invalidFlag"></v-list-item>
        </v-list>
    </div>
</template>