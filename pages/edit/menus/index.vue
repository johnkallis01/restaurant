<script setup>
const { data: menus } = await useFetch("/api/menus");
//const { data: sections } = await useFetch("/api/sections");
const tab = ref(null)
const titles = ref(['new menu', 'edit menus','view all'])
</script>
<template>
    <v-card>
        <v-tabs
            v-model="tab"
        >
            <v-tab v-for="(title, i) in titles" :key="i">{{ title }}</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item>
                <NewMenu :sections="sections" :menus="menus" />
            </v-window-item>
        </v-window>
        <v-window v-model="tab">
            <v-window-item>
                <DisplayMenu :menu="menu" :flag="true"/>
            </v-window-item>
        </v-window>
        <v-window v-model="tab">
            <v-window-item>
                <DisplayMenu :menu="menu" :flag="true"/>
            </v-window-item>
        </v-window>
    </v-card>
</template>
<script>
export default {
    data(){
        return{
            newFlag: false,
            showFlag: false,
            newMenu: {
                name: '',
                days: [{
                    day: '',
                    start_time: 0,
                    end_time: 0,
                }],
                sections: []
            },
            days : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        }
    },
    methods: {
        daysLeft(){
            let whatsLeft = this.days.filter(item => !this.newMenu.days.includes(item));
            return whatsLeft;
        }
    }
}
</script>