<script setup>
//menus/new/sections/items/index.vue

const tab = ref(null);
const menuStore = useMenuStore();
const itemsArr = ref([]);
const newItem = ref({
    name:"",
    price: 0,
    description: "",
    sides: [],
    options: []
});
const addItem = (item) => {
    itemsArr.value.push(item);
}
</script>
<template>
    <v-card class="container">
        <v-layout>
            <v-navigation-drawer permanent>
                <v-list>
                    <v-list-item class="header">New Items</v-list-item>
                    <v-list-item
                        v-for="(item, i) in newItems"
                        :key="i"
                    >{{ item.name }}</v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main>
                <v-card>
                    <v-card-title>{{ menuStore.menu.name }}</v-card-title>
                        <v-card-subtitle>{{ "Add items to " + menuStore.menu.name + " Sections" }}</v-card-subtitle>
                        <v-tabs v-model="tab" bg-color="success">
                            <v-tab v-for="(section, i) in menuStore.menu.sections" :key="i">
                                {{ section.name }}
                            </v-tab>
                        </v-tabs>
                <v-tabs-window v-model="tab">
                    <v-tabs-window-item v-for="(section, i) in menuStore.menu.sections">
                        <v-card>
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
                                    />
                                    <v-text-field
                                        v-model="newItem.description"
                                        label="enter Item description"
                                    />
                                </v-form>
                            </v-card-item>
                            <v-card-actions class="d-flex justify-end">
                                <span><v-btn>submit</v-btn></span>
                            </v-card-actions>
                        </v-card>
                    </v-tabs-window-item>
                </v-tabs-window>
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
    width: 90%;
}
.card{
    height: 70%;
    width: 70%;
}
</style>