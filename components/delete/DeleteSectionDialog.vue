<script setup>
const emit = defineEmits(['getDialogFlag']);
const menuStore = useMenuStore();
const props = defineProps({
    menu: {
        type: Object,
        required: true
    },
    section:{
        type: Object,
        required: true
    }
});
const confirmation = ref('');
const rules = { required: (v) => !!v || 'Required'};
const isEnabled = computed(() => {
    if(confirmation.value === props.section.name) return false;
    else return true;
});
const closeDialog = () => {
    emit('getDialogFlag', false);
};
const deleteSection = (section) =>{
    console.log(section._id)
    const removeSection = props.menu.sections.filter( (sec) => section._id !== sec._id);
   // props.menu = props.menu.sections.filter( (sec) => section._id !== sec._id);
   // console.log(props.menu)
   console.log( removeSection)
   props.menu.sections = removeSection;
   console.log(props.menu)
    postDelete(props.menu);
    closeDialog();
}
const postDelete = async (menu) => {
    console.log('try ',menu)
  try{
        await menuStore.updateMenu({...menu});
  } catch(error){
        console.log("section didn't post");
    }
};
</script>
<template>
    <v-card id="dialog-container">
        <v-card-title>
            {{ "Are you sure you want to delete: " + section.name }}
        </v-card-title>
        <v-card-item>
            <div class="form-container">
                <div class="text-field">
                    <label for="section-name">Confirm by typing section name</label>
                    <input
                        id="section-name"
                        type="text"
                        placeholder="Enter Section Name"
                        v-model="confirmation">
                </div>
            </div>
        </v-card-item>
        <v-card-actions>   
            <v-btn @click="deleteSection(section)" :disabled="isEnabled">{{ "Delete "+section.name }}</v-btn>
            <v-btn text="cancel" @click="closeDialog"/>        
        </v-card-actions>
    </v-card>
</template>