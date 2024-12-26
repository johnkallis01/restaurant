<script setup>
//menus/new/index.vue
import { v4 as uuidv4 } from 'uuid';

const menuStore = useMenuStore();
const router = useRouter();

const textFlag = ref(false);
const nameFlag = ref(false);
const newMenu = ref({
  name: "",
  days: [],
  sections: [],
  _id: uuidv4() 
});
const rules = {required: (v) => !!v || 'Required'};
//recieves schedule data from NewDay
const getDaysTimes = (daysTimes) => {
  newMenu.value.days = daysTimes;
  //check if menu name has been entered
  if(newMenu.value.name.length){
    router.push({path:'/edit/menus/new/sections/'}); //redirect to add sections to menu
  }
  else{
    nameFlag.value=true; //open dialog box to enter name
  }
}
const postMenu = async () => {
  if(newMenu.value.name){

  }
  try{
    menuStore.postMenu()
  }catch(error){}
}
const submitName =() => {
  if(menuName.value.trim().length){
    menuStore.setName(menuName.value); //set name

    nameFlag.value=false; //close dialog
    textFlag.value=true; //disable text-field
    router.push({path:'/edit/menus/new/sections/'}); //redirect to add sections to menu
  }
}
</script>
<template>
    <v-card>
        <v-card-item class="menu-name">
            <v-text-field
              v-model="newMenu.name"
              label="menu name"
              :disabled="textFlag"
              :rules="[rules.required]"
            />
        </v-card-item>
        <v-card-item>
          <NewDay @daysTimes="getDaysTimes" />
        </v-card-item>
        <v-dialog v-model="nameFlag">
          <v-card>
            <div class="text">You didn't enter a name</div>
            <v-card-item>
              <v-text-field
                v-model="newMenu.name"
                label="menu name"
                :rules="[rules.required]"
              />
            </v-card-item>
            <v-card-actions>
              <v-btn color="success" @click="submitName">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-card>
</template>
<style scoped>
.menu-name {
  width: 80%;
  margin: 10px auto; /* Center horizontally with margin */
}
.v-card-title{
  background-color: red;
}
.v-dialog{
  width: 30%;
}
.v-card {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  min-height:200px; /* Ensures the card has a minimum size */
  max-height: 600px;
}
</style>