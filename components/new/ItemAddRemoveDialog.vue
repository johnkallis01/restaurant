<script setup>
const props = defineProps({
    options: {
        type: Array,
        required: true,
        default: { name: ""}
    },
    addOns: {
        type: Boolean,
        required: true,
        default: false
    }
});
const emit = defineEmits(['getDialog']);
const holderArr = ref([]);
const holderObj = ref({
    name: "",
    price: 0
});
const title = () => {
    if(props.addOns){
        return "Add Ons";
    }
    else{
        return "Removes";
    }
}
const addItem = () => {
    const item = {...holderObj.value};
    console.log(item)
    holderArr.value.push(item);
    holderObj.value = {
        name: "",
        price: 0
    }
}
const formatPrice = (item) => {
   if(item.price){
    return " - $"+item.price;
   }else{return "";}
}
const submitDialog = () => {
    emit('getDialog', holderArr.value);
}
</script>
<template>
    <v-card class="container">
        <v-layout>
            <v-navigation-drawer permanent class="drawer">
                <v-list>
                    <v-list-item
                        v-for="(item, i) in holderArr"
                        :key="i"
                    >
                    {{ item.name + formatPrice(item)}}
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main class="main">
            <v-card>
                <v-card-title class="title">{{ title() }}</v-card-title>
                <v-card-item>
                    <v-text-field
                        v-model="holderObj.name"
                        dense
                        outlined
                        label="name"
                    />
                    <v-text-field
                        v-model="holderObj.price"
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
}
.drawer{
    width: 10%;
}
</style>