<script setup>
//menus/edit/new/categories/_id
const menuStore = useMenuStore();
const categoriesArr = ref([]);
const itemsArr=ref([]);
const newItem = ref({
    categoryName: "",
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
        <v-card-title>{{ menuStore.menu.name }}</v-card-title>
        <v-card-subtitle>{{ "Add items to " + menuStore.menu.name + " Categories" }}</v-card-subtitle>
        <v-tabs v-model="tab" bg-color="success">
            <v-tab v-for="(category, i) in menuStore.menu.categories" :key="i">
                {{ category.name }}
            </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item v-for="(category, i) in menuStore.menu.categories">
                <v-card>
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
    height: 90%
}
.main{
    height:100%;
}
.layout{
    height: 100%;
    width: 100%;
}
</style>