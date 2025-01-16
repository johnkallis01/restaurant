<script setup>
//menus/new/index.vue
const menuStore = useMenuStore();
const router = useRouter();

const textFlag = ref(false);
const nameFlag = ref(false);
const newMenu=reactive({
  "name":"",
  "days":[
    {"day":{"name":"Sunday","position":0},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Monday","position":1},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Tuesday","position":2},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Wednesday","position":3},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Thursday","position":4},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Friday","position":5},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Saturday","position":6},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false}],
  "sections":[]
});
const hasError = (menu) => {
  menu['day'].forEach((day)=>{
    if(day['error']) return true;
  })
}
const disableSubmit=ref(false);
const getName = (name) => {newMenu.value['name']=name;}
//recieves schedule data from NewDay
const getDay = (day) => {
  console.log('day',day);
}
const postMenu = async (menu) => {
  console.log(disableSubmit.value)
  disableSubmit.value = newMenu.value['days'].forEach(day => {if(day['error']) return true;});
  if(!disableSubmit.value && newMenu.value['name']){
    try{
      console.log('post ', menu)
      menuStore.postMenu({menu})
    }catch(error){console.log("menu didn't post")}
  }else{ console.log('else');disableSubmit.value=false;}
  
}
</script>
<template>
    <div class="new-menu-container">
      <div class="title"> Create Menu </div>
      <div class="menu-container-body"> 
        <TextField  place-holder="menu name" :req="true" @send-input="getName"/>
        <NewDay class="day-row"
          :day="day" v-for="(day, i) in newMenu['days']" :key="i" @send-day="getDay"/>
      </div>
      <button class="btn" @click="postMenu(newMenu)" :disabled="hasError(newMenu)">submit</button>
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