<script setup>
//menus/new/sections/items/index.vue
import { v4 as uuidv4 } from 'uuid';

const route = useRoute();
const menuStore = useMenuStore();
const section_id = route.params.id;
const section = menuStore.menu.sections.find((section) => section._id === section_id);
const itemsArr = ref([]);
const newItem = ref({
    name:"",
    price: 0,
    description: "",
    addOns: [],
    options: [],
    removes: []
});
const addItem = (item) => {
    itemsArr.value.push(item);
    newItem.value = {
        name:"",
        price: 0,
        description: "",
        addOns: [],
        options: [],
        removes: [],
        _id: uuidv4()
    }
};
</script>
<template>
    <v-card class="container">
        <v-layout>
            <v-navigation-drawer permanent>
                <v-list>
                    <v-list-item class="header">New Items</v-list-item>
                    <v-list-item
                        v-for="(item, i) in itemsArr"
                        :key="i"
                    >{{ item.name }}</v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main>
                <v-card>
                    <v-card-title>{{ menuStore.menu.name + " Menu - " + section.name + " section"}}</v-card-title>                
                    <v-card-subtitle>{{ section.description }}</v-card-subtitle>
                    <v-card-item>
                        <v-form>
                            <v-text-field
                                v-model="newItem.name"
                                label="enter Item name"
                            />
                            <v-text-field
                                v-model="newItem.price"
                                label="enter Item price"
                                prefix="$"
                            />
                            <v-text-field
                                v-model="newItem.description"
                                label="enter Item description"
                            />
                            <v-btn @click="addItem(newItem)">add item</v-btn>
                        </v-form>
                    </v-card-item>
                    <v-card-actions class="d-flex justify-end">
                       <v-btn>{{}}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-main>
        </v-layout>
    </v-card>
</template>
<style scoped>
.submit{
    align-items: center;
}
.header{
    border-bottom: 2px solid black;
}
.container{
    width: 80%;
}
.card{
    height: 70%;
    width: 70%;
}
</style>