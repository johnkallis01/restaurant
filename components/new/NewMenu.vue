<script setup>
    const props = defineProps({
        menus: {type: Array,required: true},
        sections: {type: Array,required: true}
    })
    const newMenu = reactive({ _id: '', name: '',days: [], sections: []})
</script>
<template>
    <v-card>
        <v-card-item v-if=!submitName>
            <v-text-field
                v-model="newMenu.name"
                label="new name"
            />
        </v-card-item>
        <v-card-item v-else>
            
        </v-card-item>
        <v-card-item title="Add Days:">
            <NewDay @daysTimes="getDaysTimes"/>
        </v-card-item>


        <v-divider/>
        
        <v-card-item>
            Add Sections <br/>
            <v-chip
                v-for="(section,i) in newMenu.sections"
                :key="i"
            >
                {{ section.name }}
                <v-icon icon="mdi-close" @click="newMenu.sections.splice(i,1)"/>
            </v-chip>
        </v-card-item>
        <v-card-item>
            Add Sections: <br/>
            <v-chip
                v-for="(section,i) in sections"
                :key="i"
                @click="addSection(section)"
            >
                {{ section.name }}
            </v-chip>
        </v-card-item>
        <v-card-actions>
            <v-btn @click="submitMenu()">submit</v-btn>
            <v-btn @click="cancel()">cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    methods:{
        getDaysTimes(daysTimes){
            console.log(daysTimes)
        },
        addDay(day, index){
            console.log(day)
            console.log(index)
            const holder = {
                day: day,
                _id: index
            }
            this.newDay.day=holder.day;
            this.newDay.day_id=holder._id;
            this.dayFlag=true;
        },
        addNewDay(day){
            const holder = {
                day: day.day,
                day_id: day.day_id,
                startHour: day.startHour,
                startMin10: day.startMin10,
                startMin01: day.startMin01,
                start_pm: day.start_pm,
                endHour: day.endHour,
                endMin10: day.endMin10,
                endMin01: day.endMin01,
                end_pm: day.end_pm,
            }
            this.newMenu.days.push(holder)
        },
        addSection(section){
            const sectionHolder={
                name: section.name ? section.name : '',
                _id: section._id ? section._id : '',
                choice: section.choice ? section.choice : 0,
                suggested: section.suggested.length ? section.suggested:[],
                ingr: section.ingr.length ? section.ingr : [],
            }
            console.log(sectionHolder)
            this.newMenu.sections.push(sectionHolder)
        },
        cancel(){
            newMenu=null;
            this.$router.push({path:'/editMenu/',})
        },
        async submitMenu(){
            const holder = {
                name: this.newMenu.name ? this.newMenu.name : '',
                sections: this.newMenu.sections.length ? this.newMenu.sections : [],
                days: this.newMenu.days.length ? this.newMenu.days : []
            }
            const res = await useFetch('/api/menus', {
                method: 'POST',
                body: JSON.stringify(holder)
            })
            this.$router.push({path:'/editMenu/',})
        },
    }
}
</script>