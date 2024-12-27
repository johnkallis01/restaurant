<script setup>
//menus/new/index.vue
const menuStore = useMenuStore();
const router = useRouter();

const textFlag = ref(false);
const nameFlag = ref(false);
const newMenu = ref({
  name: "",
  days: [],
  sections: []
});
const rules = {required: (v) => !!v || 'Required', name: (v) => /^[a-zA-Z]{2,}$/.test(v)};
//recieves schedule data from NewDay
const getDaysTimes = (daysObj) => {
  if(daysObj.enterName){
    nameFlag.value=true;
  }
  if(daysObj.correctTimes && newMenu.value.name.trim().length){ //if times and name are entered correctly
    newMenu.value.days = daysObj.schedule; //add days and times to newMenu
    menuStore.setMenu(newMenu.value);
    postMenu(newMenu.value); //post menu to db 
    router.push({path:'/edit/menus/new/sections/'}); //redirect to add sections
  }
  else if(daysObj.correctTimes && !newMenu.value.name.length){
    nameFlag.value=true;//trigger dialog box for name entry
  }
}
const postMenu = async (menu) => {
  try{
    console.log('post ', menu)
    menuStore.postMenu({...menu})
  }catch(error){console.log("menu didn't post")}
}
const submitName =() => {
 
    //menuStore.setName(menuName.value); //set name

    nameFlag.value=false; //close dialog
  //  textFlag.value=true; //disable text-field
   // router.push({path:'/edit/menus/new/sections/'}); //redirect to add sections to menu
  
}
</script>
<template>
    <v-card>
      <v-card-title>Create Menu</v-card-title>
        <v-card-item class="menu-name">
            <v-text-field
              v-model="newMenu.name"
              label="menu name"
              :disabled="textFlag"
              :rules="[rules.name, rules.required]"
            />
        </v-card-item>
        <v-card-item>
          <NewDay @daysTimes="getDaysTimes" :menuName="newMenu.name"/>
        </v-card-item>
        <v-dialog v-model="nameFlag">
          <v-card>
            <div class="text">You didn't enter a name</div>
            <v-card-item>
              <v-text-field
                v-model="newMenu.name"
                label="menu name"
                :rules="[rules.name, rules.required]"
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
.v-dialog{
  width: 30%;
}
.v-card-item{
  margin-bottom: 0;
}
.v-card {
  margin-top: 10px;
  margin-bottom: 10px;
  
  min-height:200px; /* Ensures the card has a minimum size */
  max-height: 600px;
}
</style>