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
const closeDialog = () => emit('getDialogFlag', false);

const postSection = async (menu) => {
  try{
    menuStore.updateMenu(menu);
  } catch(error){
        console.log("section didn't post");
    }
};
</script>
<template>
    <div class="dialog-container">
        <div class="title dialog">
            {{"Edit " + section.name + " Section"}}
        </div>
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
                    <label for="section-description" class="description-label">Section Description</label>
                    <textarea
                        class="section-description"
                        type="text"
                        placeholder="Enter Description"
                        v-model="newSection.description" ></textarea>
                </div>
            </div>
        <div class="container-actions">   
            <button class="btn" @click="editSection(newSection, menu)" :disabled="isEnabled">Add New Section</button>
            <button class="btn" @click="closeDialog">Cancel</button>    
        </div>
    </div>
</template>
<style scoped>
.dialog-container{
    background-color: white;
}
.section-description{
    height: 100px;
}
.title.dialog{
    padding: 5px;
}
</style>