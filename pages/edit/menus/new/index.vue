<script setup>
//menus/new/index.vue
const menuStore = useMenuStore();
const router = useRouter();

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const textFlag = ref(false);
const nameFlag = ref(false);
const newMenu = ref({
  name: "",
  days: [],
  sections: []
});
//recieves schedule data from NewDay
const getDaysTimes = (daysObj) => {
  if(daysObj.enterName){
    nameFlag.value=true;
  }
  if(daysObj.correctTimes && newMenu.value.name.trim().length){ //if times and name are entered correctly
    newMenu.value.days = daysObj.schedule; //add days and times to newMenu
    menuStore.setMenu(newMenu.value);
    postMenu(newMenu.value); //post menu to db 
    router.push({path:'/edit/menus'}); //redirect to add sections
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
</script>
<template>
    <div class="new-menu-container">
      <div class="title"> Create Menu </div>
      <div class="menu-container-body"> 
        <div class="floating-text-field new-menu">
          <input
            type="text"
            name="name"
            placeholder=" "
            required
            v-model="newMenu.name"/>
          <label for="name">Menu Name</label>
        </div>
      </div>
        <div v-for="(day, i) in days" :key="i">
          <NewDay :day="day"/>
        </div>
          
      </div>
</template>
<style scoped>
.new-menu-container{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-content: center;
  background-color: azure;
  border-radius: 10px;
  width: 80vw;
  height: 100%;
  border: 2px solid green;
}
.title{
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid black;
}
.menu-container-body{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 15px;
  width: 50%;

}
.floating-text-field.new-menu{
  display: flex;
  justify-content: flex-start;
  position: relative;
  top: 0;
}

</style>