<script setup>
//menus/new/sections/index.vue
import { v4 as uuidv4 } from 'uuid';
const menuStore = useMenuStore();
const router = useRouter();

const sectionsArr = ref([]);
const newSection = ref({
    name: '',
    description: '',
    items: []
});
const rules = {required: (v) => !!v || 'Required'}
function sendToItems() {
    menuStore.setSections(sectionsArr.value);
    navigateTo('/edit/menus/new/sections/'+sectionsArr[0]?._id);
}
function addSection(section){
    sectionsArr.value.push(section);
    newSection.value={
        name: '',
        description: '',
        items: [],
        _id: uuidv4()
    }; //empty for next section
}
</script>
<template>
    <v-card class="container">
      <v-layout>
        <v-navigation-drawer
          permanent
        >
          <v-list>
            <v-list-item
                v-for="(section, i) in sectionsArr"
                :key="i"
            > 
                <span class="display-name">
                    {{ section.name }}
                </span>
                <span class="display-description">
                    {{ " - " + section.description }}
                </span>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 400px">
            <v-card>
                <v-card-title>
                    {{"Create " + menuStore.menu.name + " Sections"}}
                </v-card-title>
                <v-card-item>
                    <v-text-field
                        v-model="newSection.name"
                        label="new section name"
                        :rules="[rules.required]"
                    /> 
                </v-card-item>
                <v-card-item>
                    <v-text-field
                        v-model="newSection.description"
                        label="new section description"
                    />
                </v-card-item>
                <v-card-actions>   
                    <v-btn @click="addSection(newSection)">add new section</v-btn>          
                </v-card-actions>
            </v-card>
        </v-main>
      </v-layout>
      <v-card-actions>
        <v-btn @click="sendToItems">add all sections to menu</v-btn>
      </v-card-actions>
    </v-card>
</template>
<style scoped>
.container{
    width: 80%;
}
</style>