<script setup>

const router = useRouter();

const newMenu = ref({ _id: '', name: '', days: [], sections: [] });
const textFlag = ref(false);
const nameFlag = ref(false);

//recieves schedule data from NewDay
function getDaysTimes(daysTimes) {
  newMenu.value.days = daysTimes.map((day) => ({...day}));
  localStorage.setItem('menu', JSON.stringify(newMenu.value))
  //check if menu name has been entered
  if(newMenu.value.name.length){
    router.push({
      path:'/edit/menus/new/sections/'
    }); //redirect to add sections to menu
  }
  else{
    nameFlag.value=true; //open dialog box to enter name
  }
}
function submitName(){
  if(newMenu.value.name.length){
    nameFlag.value=false; //close dialog
    textFlag.value=true; //disable text-field
    router.push({
        path:'/edit/menus/new/sections/',
        state: newMenu.value
      }); //redirect to add sections to menu
  }
}

async function submitMenu() {
  const payload = {
    name: newMenu.name || '',
    sections: newMenu.sections,
    days: newMenu.days
  };
  try {
    const res = await fetch('/api/menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('Menu submitted:', await res.json());
    router.push('/editMenu/');
  } catch (error) {
    console.error('Error:', error);
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
            />
        </v-card-item>
        <v-card-item>
          <NewDay @daysTimes="getDaysTimes" />
        </v-card-item>
        <v-dialog v-model="nameFlag">
          <v-card>
            <div>You didn't enter a name for the menu</div>
            <v-text-field
              v-model="newMenu.name"
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