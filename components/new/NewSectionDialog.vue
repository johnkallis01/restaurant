<script setup>
import { useMenuStore } from '~/stores/menu';
import { v4 as uuidv4 } from 'uuid';
const emit = defineEmits(['getDialogFlag']);
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
    items: [],
    _id: uuidv4()
});
const rules = { required: (v) => !!v || 'Required', name: (v) => /^[a-zA-Z]{2,}$/.test(v)};
const isEnabled = computed(() => {
    if(/^[a-zA-Z]{2,}$/.test(newSection.value.name)) return false;
    else return true;
});
const addSection = (section) => {
    props.menu.sections.push(section);
    postSection(props.menu);
    closeDialog();
};
const closeDialog = () => {
    emit('getDialogFlag', false);
};
const postSection = async (menu) => {
  try{
    menuStore.updateMenu({...menu});
  } catch(error){
        console.log("section didn't post");
    }
};
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
                :rules="[rules.name, rules.required]"
            /> 
        </v-card-item>
        <v-card-item>
            <v-text-field
                v-model="newSection.description"
                label="new section description"
            />
        </v-card-item>
        <v-card-actions>   
            <v-btn @click="addSection(newSection)" text="add new section" :disabled="isEnabled"/>
            <v-btn text="cancel" @click="closeDialog"/>        
        </v-card-actions>
    </v-card>
</template>