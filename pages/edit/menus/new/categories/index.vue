<script setup>
//menus/new/categories/index.vue
import ItemOptionsDialog from '~/components/new/ItemOptionsDialog.vue';
import ItemAddRemoveDialog from '~/components/new/ItemAddRemoveDialog.vue';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID generator

const menuStore = useMenuStore();
//const router = useRouter();
//initialize data
const categoryFlag = ref(false);

const addOnsFlag = ref(false);
const removesFlag = ref(false);
const optionsFlag = ref(false);

const newCategory = ref({
    name: "",
    items: []
});
const newItem = ref({
    name: "",
    price: 0,
    description: "",
    options: [],
    addOns: [],
    removes: []
});

//functions
const receiveAddOns = (addOns) => {
    console.log(addOns)
    addOnsFlag.value=false;
};
const receiveRemoves = (removes) => {
    console.log(removes)
    removesFlag.value=false;
};
const receiveOptions = (options) => {
    console.log(options)
    optionsFlag.value=false;
};
const sendToItems = () => {
    console.log('send to items');
};
</script>
<template>
    <v-card class="container">
      <v-layout>
        <v-navigation-drawer
          permanent
        >
          <v-list>
            <v-list-item>
                <v-text-field
                    v-model="newCategory.name"
                    :disabled="categoryFlag"
                    label="new category name"
                />
            </v-list-item>
            <v-list-item
                v-for="(item, i) in newCategory.items"
                :key="i"
            > {{ item.name }}
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main class="main">
            <v-card>
                <v-card-title class="title">
                    {{ "Create " + menuStore.menu.name + " category and items" }}
                </v-card-title>
            
                    <!-- Grid System for Two Columns -->
                    <v-container>
                        <v-row>
                            <!-- Left Column: Text Fields -->
                            <v-col cols="6" class="d-flex flex-column">
                                <v-text-field
                                    v-model="newItem.name"
                                    dense
                                    label="Enter Item Name"
                                    class="item-name"
                                />
                                <v-text-field
                                    v-model="newItem.price"
                                    label="Enter Item Price"
                                    dense
                                    prepend-inner-icon="mdi-currency-usd"
                                    class="item-price"
                                />
                            </v-col>
                            <!-- Right Column: Textarea -->
                            <v-col cols="6">
                                <v-textarea
                                    v-model="newItem.description"
                                    dense
                                    label="Enter Item Description"
                                    class="item-description"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <v-btn @click="addOnsFlag=true" class="button">Add-ons</v-btn>
                                <v-btn @click="removesFlag=true">Removes</v-btn>
                                <span></span>
                            </v-col>
                            <v-col cols="3">
                                <v-btn @click="optionsFlag=true">Add Option</v-btn>
                                <span></span>
                            </v-col>
                            <v-col cols="6">
                                <v-list>
                                    <v-list-item>
                                        <span>Add Ons:</span>
                                        <span></span>
                                    </v-list-item>
                                    <v-list-item>
                                        <div>Removes:</div>
                                    </v-list-item>
                                    <v-list-item>
                                        <div>Options:</div>
                                    </v-list-item>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-container>
                    
                <v-card-actions>
                    <v-btn @click="addItem(newCategory)">
                        {{ "Add New Item to Category" }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-main>
      </v-layout>
      <div class="dialog-container">
            <v-dialog
                v-model="addOnsFlag"
                persistent
                class="dialog"
            >
                <ItemAddRemoveDialog
                    :options="newItem.addOns"
                    :addOns="true"
                    @getDialog="receiveAddOns"
                />
            </v-dialog>
            <v-dialog
                v-model="removesFlag"
                persistent
                class="dialog"
            >
                <ItemAddRemoveDialog
                    :options="newItem.removes"
                    :addOns="false"
                    @getDialog="receiveRemoves"
                />
            </v-dialog>
            <v-dialog
                v-model="optionsFlag"
                persistent
                class="dialog"
            >
                <ItemOptionsDialog
                    @getDialog="receiveOptions"
                />
            </v-dialog>
        </div>
      <v-card-actions>
        <v-btn @click="sendToItems">submit categories to menu</v-btn>
      </v-card-actions>
    </v-card>
</template>
<style scoped>
.button{
    margin: 5px;
}
.title{
    background-color: darkgreen;
    color: white;
}
.container{
    width: 80%;
    height: 90%;
}
.item-price{
    width: 80%;;
}
.dialog{
    width: 80%;
}
</style>