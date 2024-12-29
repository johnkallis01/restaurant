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
    if(/^[a-zA-Z ]{2,}$/.test(newSection.value.name)) return false;
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
    <v-card id="dialog-container">
        <v-card-title>
            {{"Create " + menu.name + " Section"}}
        </v-card-title>
        <v-card-item>
            <div class="form-container">
                <div class="text-field">
                    <label for="section-name">Section Name</label>
                    <input
                        id="section-name"
                        type="text"
                        placeholder="Enter Section Name"
                        v-model="newSection.name">
                </div>
                <div class="text-field">
                    <label for="section-description" id="description-label">Section Description</label>
                    <textarea
                        id="section-description"
                        type="text"
                        placeholder="Enter Description"
                        v-model="newSection.description" ></textarea>
                </div>
            </div>
        </v-card-item>
        <v-card-actions>   
            <v-btn @click="addSection(newSection)" text="add new section" :disabled="isEnabled"/>
            <v-btn text="cancel" @click="closeDialog"/>        
        </v-card-actions>
    </v-card>
</template>