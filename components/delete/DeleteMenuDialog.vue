<script setup>
const emit = defineEmits(['getDialogFlag']);
const menuStore = useMenuStore();
const props = defineProps({
    menu: {
        type: Object,
        required: true
    },
});
const confirmation = ref('');
const rules = { required: (v) => !!v || 'Required'};
const isEnabled = computed(() => {
    if(confirmation.value === props.menu.name) return false;
    else return true;
});
const closeDialog = () => {
    emit('getDialogFlag', false);
};
const deleteMenu = (menu) =>{
    console.log(menu._id)
    postDelete(props.menu);
    closeDialog();
}
const postDelete = async (menu) => {
  try{
        await menuStore.deleteMenu(menu);
  } catch(error){
        console.log("menu didn't post");
    }
};
</script>
<template>
    <v-card id="dialog-container">
        <v-card-title>
            {{ "Are you sure you want to delete: " + menu.name }}
        </v-card-title>
        <div>This will delete the menu and all of its contents</div>
        <v-card-item>
            <div class="form-container">
                <div class="text-field">
                    <label for="menu-name">Confirm by typing the menu name</label>
                    <input
                        id="menu-name"
                        type="text"
                        placeholder="Enter Menu Name"
                        v-model="confirmation">
                </div>
            </div>
        </v-card-item>
        <v-card-actions>   
            <v-btn @click="deleteMenu(menu)" :disabled="isEnabled">{{ "Delete "+menu.name }}</v-btn>
            <v-btn text="cancel" @click="closeDialog"/>        
        </v-card-actions>
    </v-card>
</template>