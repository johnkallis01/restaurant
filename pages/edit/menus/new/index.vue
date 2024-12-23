<script setup>
//menus/new/index.vue
const menuStore = useMenuStore();
const router = useRouter();

const menuName=ref("");
const textFlag = ref(false);
const nameFlag = ref(false);

//recieves schedule data from NewDay
const getDaysTimes = (daysTimes) => {
  menuStore.setDays(daysTimes);
  //check if menu name has been entered
  if(menuName.value.trim().length){
    menuStore.setName(menuName.value);
    router.push({path:'/edit/menus/new/sections/'}); //redirect to add sections to menu
  }
  else{
    nameFlag.value=true; //open dialog box to enter name
  }
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
              v-model="menuName"
              label="menu name"
              :disabled="textFlag"
            />
        </v-card-item>
        <v-card-item>
          <NewDay @daysTimes="getDaysTimes" />
        </v-card-item>
        <v-dialog v-model="nameFlag">
          <v-card>
            <div>You didn't enter a name for the menu</div>
            <v-text-field
              v-model="menuName"
              label="menu name"
            />
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
.v-card {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  min-height:200px; /* Ensures the card has a minimum size */
  max-height: 600px;
}
</style>