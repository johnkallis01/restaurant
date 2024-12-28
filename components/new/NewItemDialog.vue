<script setup>
import { useMenuStore } from '~/stores/menu';
import { v4 as uuidv4 } from 'uuid';
const menuStore = useMenuStore();
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

const newItem = ref({
    name: '',
    description: '',
    price: '00000',
    addOns: [],
    removes: [],
    options: [],
    _id: uuidv4()
});
const newAddOn= ref({
    name: '',
    price: '00000'
});
const newRemove=ref("");

const rules = { required: (v) => !!v || 'Required', name: (v) => /^[a-zA-Z]{2,}$/.test(v)};
const isEnabled = computed(() => {
    if(/^[a-zA-Z ]{2,}$/.test(newItem.value.name)) {
        return false;
    }
    else {return true;}
});
const addItem = (item) => {
    const updateSection = props.menu.sections.find((sec)=>props.section._id === sec._id);
    if(updateSection){
        updateSection.items.push(item);
        console.log(props.menu)
    };
   // postItem(props.menu);
    closeDialog();
};
const closeDialog = () => {
    emit('getDialogFlag', false);
};
const getItemPrice = (newPrice) => {
    newItem.value.price = newPrice;
}
const getAddOnPrice = (newPrice) => {
    newAddOn.value.price = newPrice;
}
const postItem = async (menu) => {
    try{
        menuStore.updateMenu(menu);
    } catch(error){
        console.log("item didn't post");
    }
};
const tabs = ref(null);
</script>
<template>
    <v-card>  
        <v-card-title>
            {{"Create " + section?.name + " Item"}}
        </v-card-title>
        <v-card-item>
            <div id="item-container">
             
                <div class="form-container" id="item-inputs">
                    <div class="name-description-row">
                        <div class="text-field name-field">
                            <label for="item-name">Item Name</label>
                            <input
                                id="item-name"
                                type="text"
                                placeholder="Enter Item Name"
                                v-model="newItem.name"
                            >
                        </div>
                        <div class="text-field description-field" id="description-container">
                            <label for="item-description" id="description-label">Item Description</label>
                            <textarea
                                id="item-description"
                                type="text"
                                placeholder="Enter Description"
                                v-model="newItem.description"
                            ></textarea>
                        </div>
                    </div>
                    <PriceInput title="Item Price" :price="newItem.price" @update:price="getItemPrice"/>
                    
                    
                </div>
                <v-card>
                    <v-tabs v-model="tabs">
                        <v-tab :value="1">Add Ons</v-tab>
                        <v-tab :value="2">Removes</v-tab>
                        <v-tab :value="3">Options</v-tab>
                    </v-tabs>
                    <v-tabs-window v-model="tabs" class="window">
                        <v-tabs-window-item :value="1">
                            <div class="form-container" id="add-ons">
                                <div class="text-field">
                                    <label for="add-on-name">Add-On Name</label>
                                    <input
                                        id="add-on-name"
                                        type="text"
                                        placeholder="Enter Add-On Name"
                                        v-model="newAddOn.name"
                                    >
                                </div>
                                <div>
                                    <PriceInput title="Add-on Price" :price="newAddOn.price" @update:price="getAddOnPrice"/>
                                    <v-btn>add</v-btn>
                                </div>
                            </div>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="2">
                            <div class="form-container" id="add-ons">
                                <div class="text-field">
                                    <label for="remove-name">Remove Name</label>
                                    <input
                                        id="remove-name"
                                        type="text"
                                        placeholder="Enter Remove Name"
                                        v-model="newRemove"
                                    >
                                </div>
                            </div>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="3">
                            <div>options</div>
                            
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card>
            </div>
        </v-card-item>
        <v-card-actions>   
            <v-btn @click="addItem(newItem)" text="add new item" :disabled="isEnabled"/>
            <v-btn text="cancel" @click="closeDialog"/>        
        </v-card-actions>
    </v-card>
</template>
<style scoped>
.name-field{
    flex: 1;
}
.description-field{
    flex: 2;
}
.window{
    display:block
}
.text-field
#item-description{
    height: 80px;
}
#item-inputs{
    border: 2px solid black;
    padding: 5px;
    margin: 0 auto;
}
.name-description-row{
    display: flex;
    gap: 16px;
    align-items: flex-start;
}
#add-ons{
    border: 2px solid black;
    padding: 5px;
}
</style>