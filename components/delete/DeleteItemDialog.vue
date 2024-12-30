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
    },
    item:{
        type: Object,
        required: true
    }
});
const thisItem = ref(props.item)
const confirmation = ref('');
const isEnabled = computed(() => {
    if(confirmation.value === props.item.name) return false;
    else return true;
});
const closeDialog = () => {
    emit('getDialogFlag', false);
};
const deleteItem = (item, section, menu) =>{
    console.log('delete item ', item)
    closeDialog();
    const removeItem = section.items.filter( (it) => it._id !== item._id); //remove item from section.items
    console.log(removeItem) //items array
    section.items = removeItem; //replace section.items
    console.log(section);
    const index = menu.sections.findIndex( (sec) => section._id === sec._id); //index of section to replace
    if(index !== -1){
        menu.sections[index]=section; //replace menu.section
    }
    console.log(menu.sections)
    postDelete(menu); //post changes
    
}
const postDelete = async (menu) => {
  try{
        await menuStore.updateMenu(menu);
  } catch(error){
        console.log("item didn't post");
    }
};
</script>
<template>
    <v-card id="dialog-container">
        <v-card-title>
            {{ "Are you sure you want to delete: " + item.name }}
        </v-card-title>
        <v-card-item>
            <div class="form-container">
                <div class="text-field">
                    <label for="item-name">Confirm by typing item name</label>
                    <input
                        id="item-name"
                        type="text"
                        placeholder="Enter Item Name"
                        v-model="confirmation">
                </div>
            </div>
        </v-card-item>
        <v-card-actions>   
            <v-btn @click="deleteItem(item, section, menu)" :disabled="isEnabled">{{ "Delete "+item.name }}</v-btn>
            <v-btn text="cancel" @click="closeDialog"/>        
        </v-card-actions>
    </v-card>
</template>