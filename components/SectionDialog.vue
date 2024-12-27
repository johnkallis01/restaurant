<script setup>
import { useMenuStore } from '~/stores/menu';
const emit = defineEmits(['getDialogFlag'])
const props = defineProps({
    menu:{
        type: Object,
        required: true
    }
});
const menuStore = useMenuStore();
const newSection = ref({
    name: '',
    description: '',
    items: []
});
const rules = {required: (v) => !!v || 'Required'}

const addSection = (section) => {
    props.menu.sections.push(section);
    console.log(props.menu);
    postSection(props.menu)
    emit('getDialogFlag', { section: section, flag: false})
}
const postSection = async (menu) => {
  try{
    menuStore.postSection({...menu})
  }catch(error){
    console.log("section didn't post")
}
}
</script>
<template>
    <v-card>
        <v-card-title>
            {{"Create " + menu.name + " Section"}}
        </v-card-title>
        <v-card-item>
            <v-text-field
                v-model="newSection.name"
                label="new section name"
                :rules="[rules.required]"
            /> 
        </v-card-item>
        <v-card-item>
            <v-text-field
                v-model="newSection.description"
                label="new section description"
            />
        </v-card-item>
        <v-card-actions>   
            <v-btn @click="addSection(newSection)">add new section</v-btn>          
        </v-card-actions>
    </v-card>
</template>