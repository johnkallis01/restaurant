<script setup>
//menus/new/sections/index.vue

const menuStore = useMenuStore();
const router = useRouter();

const sectionsArr = ref([]);
const newSection = ref({
    name: '',
    description: '',
    items: []
})
function sendToItems() {
    menuStore.setSections(sectionsArr.value)
    router.push({path:'/edit/menus/new/sections/items'});
}
function addSection(section){
    sectionsArr.value.push(section); //push to array
    newSection.value={
        name: '',
        description: '',
        items: []
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