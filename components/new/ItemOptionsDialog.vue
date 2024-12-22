<script setup>
const emit = defineEmits(['getDialog']);
const holderArr = ref([]);
const option = ref({
    name: "",
    items: []
});
const item = ref({
    name: "",
    price: 0
});
const addItem = () => {
    //const item = {...holderObj.value};
    console.log(item.value)
    console.log(option.value.items)
    option.value.items.push(item.value);
    item.value = {
        name: "",
        price: 0
    }
}
const submitDialog = () => {
    emit('getDialog', holderArr.value);
}
</script>
<template>
    <v-card class="container">
        <v-layout>
            <v-navigation-drawer permanent>
                <v-list>
                    <v-list-item>
                        <v-text-field
                            v-model="option.name"
                            label="options category name"
                        />
                    </v-list-item>
                    <div
                        v-for="(item, i) in option.items"
                        :key="i"
                        class="pa-2"
                    >
                    {{ item.name }}
                </div>
                </v-list>
            </v-navigation-drawer>
            <v-main>
                <v-card class="card">
                    <v-card-title class="title">{{ "Add Item Option" }}</v-card-title>
                    <v-card-item>
                        <v-text-field
                            v-model="item.name"
                            dense
                            outlined
                            label="name"
                        />
                        <v-text-field
                            v-model="item.price"
                            dense
                            outlined
                            label="price"
                            prepend-inner-icon="mdi-currency-usd"
                        />
                        <v-btn @click="addItem">add</v-btn>
                    </v-card-item>
                    <v-card-actions>
                        <v-btn @click="submitDialog">submit group</v-btn>
                    </v-card-actions>
                </v-card>
        </v-main>
        </v-layout>
    </v-card>
</template>
<style scoped>
.container{
    align-self: center;
    width: 20%;
}
</style>