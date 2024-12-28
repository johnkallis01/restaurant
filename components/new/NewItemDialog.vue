<script setup>
import { useMenuStore } from '~/stores/menu';
const emit = defineEmits(['getDialogFlag']);
const props = defineProps({
    menu:{
        type: Object,
        required: true
    },
    section:{
        type: Object,
        required: true
    }
});
const menuStore = useMenuStore();
const newItem = ref({
    name: '',
    description: '',
    price: 0,
    addOns: [],
    removes: [],
    options: []
});
const rules = { required: (v) => !!v || 'Required', name: (v) => /^[a-zA-Z]{2,}$/.test(v)};
const isEnabled = computed(() => {
    if(/^[a-zA-Z]{2,}$/.test(newItem.value.name)) return false;
    else return true;
});
const addItem = (item) => {
    props.menu.sections.push(item);
    postSection(props.menu);
    closeDialog();
};
const closeDialog = () => {
    emit('getDialogFlag', false);
};
const postItem = async (menu, section, item) => {

  try{
    menuStore.postItem({...menu});
  } catch(error){
        console.log("item didn't post");
    }
};
</script>
<template>
    <v-card>
        <v-card-title>
            {{"Create " + section.name + " Item"}}
        </v-card-title>
        <v-card-item>
            <v-text-field
                v-model="newItem.name"
                label="new section name"
                :rules="[rules.name, rules.required]"
            /> 
        </v-card-item>
        <v-card-item>
            <v-text-field
                v-model="newItem.description"
                label="new section description"
            />
        </v-card-item>
        <v-card-actions>   
            <v-btn @click="addItem(newItem)" text="add new item" :disabled="isEnabled"/>
            <v-btn text="cancel" @click="closeDialog"/>        
        </v-card-actions>
    </v-card>
</template>