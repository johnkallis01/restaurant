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
    postItem(props.menu);
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
const pushAddOn = (addOn) => {
    newItem.value.addOns.push(addOn);
    newAddOn.value={
        name: '',
        price: '00000'
    }
}
const pushRemove = (ingr) => {
    newItem.value.removes.push(ingr);
    newRemove.value="";
}
const postItem = async (menu) => {
    try{
        await menuStore.updateMenu(menu);
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
                    <PriceInput title="Item Price" :price="newItem.price" @update:price="getItemPrice" class="price-field"/>
                </div>
                <v-card class="tabs-card">
                    <v-tabs v-model="tabs" align-tabs="center">
                        <v-tab :value="1">Add Ons</v-tab>
                        <v-tab :value="2">Removes</v-tab>
                        <v-tab :value="3">Options</v-tab>
                    </v-tabs>
                    <v-tabs-window v-model="tabs" class="window">
                        <v-tabs-window-item :value="1">
                            <div class="form-container add-ons" id="add-ons">
                                <div class="input-container">
                                    <div class="text-field add-ons-field">
                                        <label for="add-on-name">Add-On Name</label>
                                        <input
                                            id="add-on-name"
                                            type="text"
                                            placeholder="Enter Add-On Name"
                                            v-model="newAddOn.name"
                                        >
                                    </div>
                                    <div class="price-button-group">
                                        <PriceInput title="Add-On Price :" :price="newAddOn.price" @update:price="getAddOnPrice"/>
                                        <button class="btn" @click="pushAddOn(newAddOn)">Add</button>
                                    </div>
                                </div>
                                <div class="list-container add-ons">
                                    <div>Add-Ons:</div>
                                    <div v-for="(addOn, i) in newItem.addOns" :key="i">
                                        {{ addOn.name }} - {{"$ " + addOn.price }}
                                    </div>
                                </div>
                            </div>
                        </v-tabs-window-item>
                        <v-tabs-window-item :value="2">
                            <div class="form-container removes" id="removes">
                                <div class="removes-container">
                                    <div class="input-container removes">
                                        <div class="text-field removes">
                                            <label for="remove-name">Ingredient Name:</label>
                                            <input
                                                id="remove-name"
                                                type="text"
                                                placeholder="Enter ingredient to remove"
                                                v-model="newRemove"
                                            >
                                        </div>
                                        <div class="button-container">
                                            <button class="btn" @click="pushRemove(newRemove)">Add</button>
                                        </div>
                                        
                                    </div>
                                    <div class="list-container removes">
                                        <div class="title">Removes: </div>
                                        <div v-for="(ingr, i) in newItem.removes" :key="i" class="removes-list">{{ ingr }}</div>
                                    </div>
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
.removes-container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 15px;
}
.list-container.removes{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}
.form-container.add-ons{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-top: 15px;
}
.button-container{
    padding: 10px 0;
}
.input-container{
    flex: 1;
}
.list-container{
    flex: 1;
}
.btn {
  display: inline-block;
  padding: 5px;
  font-size: 16px;
  margin-left: 10px;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}
.btn:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.btn.primary:active {
  background-color: #003f7f; /* Even Darker Blue */
}
.btn.secondary:hover {
  background-color: #5a6268; /* Darker Gray */
}
.price-button-group{
    display: flex;
    align-items: center;
}
.add-ons-field{
    margin-bottom: 7px;
}
.name-field{
    flex: 1;
}
.tabs-card{
    min-height: 250px;
}
.add-ons{
    display: flex;
    gap: 16px;
}
.description-field{
    flex: 2;
}
.window{
    display:block
}
.price-field{
    margin-top: -50px;
    margin-bottom: 5px;
}
#item-description{
    height: 80px;
}
#item-inputs{
    border-bottom: 2px solid black;
    padding: 5px;
    margin: 0 auto;
}
.name-description-row{
    display: flex;
    gap: 16px;
    align-items: flex-start;
}
#add-ons{
    padding: 5px;
}
.v-tabs{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>