<script setup>
import { useMenuStore } from '~/stores/menu';
import { v4 as uuidv4 } from 'uuid';
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
const newSection = ref({
    name: props.section.name,
    description: props.section.description,
    items: props.section.items,
    _id: props.section._id
});
const rules = { required: (v) => !!v || 'Required', name: (v) => /^[a-zA-Z]{2,}$/.test(v)};
const isEnabled = computed(() => {
    console.log(props.section.name)
    console.log(props)
    if(newSection.value.name !== props.section.name || newSection.value.description !== props.section.description) return false;
    else return true;
});
const editSection = (section, menu) => {
    const index = menu.sections.findIndex( (sec) => sec._id === props.section._id);
    menu.sections[index] = section;
    console.log(menu.sections)
    postSection(props.menu);
    closeDialog();
};
const closeDialog = () => {
    emit('getDialogFlag', false);
};
const postSection = async (menu) => {
  try{
    menuStore.updateMenu(menu);
  } catch(error){
        console.log("section didn't post");
    }
};
</script>
<template>
    <v-card id="dialog-container">
        <v-card-title>
            {{"Edit " + section.name + " Section"}}
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
            <v-btn @click="editSection(newSection, menu)" text="add new section" :disabled="isEnabled"/>
            <v-btn text="cancel" @click="closeDialog"/>        
        </v-card-actions>
    </v-card>
</template>