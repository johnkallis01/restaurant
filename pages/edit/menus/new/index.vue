<script setup>
//menus/new/index.vue
const menuStore = useMenuStore();
const router = useRouter();

const newMenu = reactive({
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

const hasError = computed(() => {
  let disableSubmit=false;
  newMenu['days'].forEach((day)=>{if(day['error']) disableSubmit = true;})
  return disableSubmit;
});
const isOpen = computed(()=>{
  let flag=false;
  newMenu['days'].forEach((day)=>{if(day['open']) flag=true;})
  return flag;
})

const getName = (name) => { newMenu['name']=name;}
//recieves schedule data from NewDay
const getDay = (d) => {newMenu['days'].forEach(day=> {if(day.position === d.position) day = d;})}
const postMenu = (menu) => {
  if(newMenu['name']){
    try{
      menuStore.postMenu(menu);
      router.push('/');
    }catch(error){console.log("menu didn't post")}
  }
  else{ 
    console.log('no name');
  }
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
      <button class="btn" @click="postMenu(newMenu)" :disabled="hasError || !isOpen">submit</button>
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