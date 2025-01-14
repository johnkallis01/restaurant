<script setup>
//menus/new/index.vue
const menuStore = useMenuStore();
const router = useRouter();

const days = [{"name":"Sunday","day":0},{"name":"Monday","day":1},{"name":"Tuesday","day":2},{"name":"Wednesday","day":3},{"name":"Thursday","day":4},{"name":"Friday","day":5},{"name":"Saturday","day":6}];
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
        <TextField  place-holder="menu name" :req="true"/>
        <NewDay class="day-row"
          :day="day" v-for="(day, i) in days" :key="i"/>
      </div>
      <button class="btn" @click="postMenu(newMenu)">submit</button>
      </div>
</template>
<style scoped>

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
  justify-content: space-between;
  align-content: center;
  padding: 5px;
  border-bottom: 2px solid black;
}
.day-row{
  margin: 2px;
}
.floating-text-field.new-menu{
  display: flex;
  justify-content: flex-start;
  position: relative;
  top: 0;
}

</style>