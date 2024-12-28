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
const newAddOn= ref({
    name: '',
    price: 0
});
const newRemove=ref("");
const newOption=ref({
    name: '',
    price: 0
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
            {{"Create " + section?.name + " Item"}}
        </v-card-title>
        <v-card-item>
            <v-row class="item-row">
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="newItem.name"
                        label="item name"
                        :rules="[rules.name, rules.required]"
                    /> 
                </v-col>
                <v-col cols="12" md="8">
                    <v-text-field
                        v-model="newItem.description"
                        label="item description"
                    />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="newAddOn.name"
                        label="add on this to item"
                        :rules="[rules.name, rules.required]"
                    />
                    <v-text-field
                        v-model="newAddOn.price"
                        label="add on price"
                        prefix="$"
                        :rules="[rules.price, rules.required]"
                        class="price"
                    />
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="newRemove.name"
                        label="remove this ingrediant"
                        :rules="[rules.name, rules.required]"
                    />
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="newAddOn.name"
                        label="new add on name"
                        :rules="[rules.name, rules.required]"
                    />
                    <v-text-field
                        v-model="newAddOn.price"
                        label="new add on price"
                        prefix="$"
                        :rules="[rules.price, rules.required]"
                        class="price"
                    />
                </v-col>
            </v-row>
            <v-row class="btn-row">
                <v-col cols="12" md="4">
                    <v-btn text="add" @click="addAddOn"/>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn text="add" @click="addRemove"/>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn text="add" @click="addOption"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    Add Ons:
                    <div v-for="(addOns, i) in newItem.addOns" :key="i">{{ addOns }}</div>
                </v-col>
                <v-col cols="12" md="4">
                    Removes:
                </v-col>
            </v-row>
        </v-card-item>
        <v-card-actions>   
            <v-btn @click="addItem(newItem)" text="add new item" :disabled="isEnabled"/>
            <v-btn text="cancel" @click="closeDialog"/>        
        </v-card-actions>
    </v-card>
</template>
<style scoped>
.btn-row{
    margin-top: -25px;
    margin-bottom: -25px;
}
.item-row{
    margin-bottom: -45px;
}
.price{
    width: 40%;
}
</style>