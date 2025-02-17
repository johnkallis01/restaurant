<script setup>
import { useDetachObject } from '~/composables/useDetachObject';

useHead({
  title: "John's Restaurant - Edit Menu"
});
definePageMeta({middleware: ['admin','auth']});
const newMenu = reactive({
  name:"",
  days:[
    {day:{name:"Sunday",position:0},open:false,start:{hour:0,min:0,pm:false},end:{hour:0,min:0,pm:false},error:false},
    {day:{name:"Monday",position:1},open:false,start:{hour:0,min:0,pm:false},end:{hour:0,min:0,pm:false},error:false},
    {day:{name:"Tuesday",position:2},open:false,start:{hour:0,min:0,pm:false},end:{hour:0,min:0,pm:false},error:false},
    {day:{name:"Wednesday",position:3},open:false,start:{hour:0,min:0,pm:false},end:{hour:0,min:0,pm:false},error:false},
    {day:{name:"Thursday",position:4},open:false,start:{hour:0,min:0,pm:false},end:{hour:0,min:0,pm:false},error:false},
    {day:{name:"Friday",position:5},open:false,start:{hour:0,min:0,pm:false},end:{hour:0,min:0,pm:false},error:false},
    {day:{name:"Saturday",position:6},open:false,start:{hour:0,min:0,pm:false},end:{hour:0,min:0,pm:false},error:false}],
  sections:[],
});
// const menus=useMenuStore().menus;
const menuStore=useMenuStore();
const menus=ref(null);
const dragMenu=ref(null);
const {detachObject}=useDetachObject();
const onDragStart=(index)=>{
  // console.log(index, menus.value)
  dragMenu.value=index;
}
const onDragOver=(event) => {
  event.preventDefault();
}
const onDropMenu=(index) => {
  // console.log(menus.value)
  if (dragMenu.value === null || dragMenu.value === index) return;
  const draggedMenu=menus.value[dragMenu.value];
  menus.value.splice(dragMenu.value, 1);
  menus.value.splice(index,0,draggedMenu);
  // console.log(menus.value)
  const slicePoint = dragMenu.value < index ? dragMenu.value : index;
  console.log(slicePoint)
  // menus.value.splice(newIndex,0,draggedMenu);
  // console.log(menus.value.slice(slicePoint))
  const newMenus=detachObject(menus.value)
  menus.value.slice(slicePoint).forEach((menu, i)=> {
      menu.position=i+slicePoint;
  });
  menuStore.bulkUpdateMenus(menus.value.slice(slicePoint));
  dragMenu.value=null;
}
async function fetchMenus(){
  try{
    await menuStore.fetchMenus();
    menus.value=[...menuStore.menus];
  }catch (error){
    console.log('error fetching menus')
  }
}
onMounted(fetchMenus);
const sortMenus=(menus)=>{
  if(!menus) return;
  return menus.sort((a,b)=>a.position-b.position)
}
</script>
<template>
  <div class="page-container">
    <div class="container-title">
      <span class="edit-menu">Edit Menu Order:</span>
      <span class="menu-names"
          v-for="(menu,i) in sortMenus(menus)" 
              :key="menu._id"
              draggable="true"
              @dragstart="onDragStart(i)"
              @dragover="onDragOver($event)"
              @drop="onDropMenu(i)"
          >{{ menu.name}}</span>
    </div>
    <div class="new-menu-page">
      <div class="title"> Create Menu </div>
        <EditMenuTimes :menu="newMenu" :isNew="true"/>
      </div>
  </div>
  
</template>
<style scoped>
.new-menu-page{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 10px;
  width: 60vw;
  max-width: 600px;
  background-color: azure;
}
.container-title{
  justify-content: start;
  overflow-x: scroll;
  scrollbar-width: none;
}
.edit-menu{
  padding-left: 5px;
}
.menu-names{
  padding: 0 5px;
  text-wrap: nowrap;
}
.title{
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid black;
}
@media(max-width: 800px) {
  .new-menu-page{
    width: 90vw;
    left: 5vw;
    border-radius: 0px;
    overflow: auto;
    /* border: 1px solid red; */
  }
}

@media(max-width: 600px) {
  .new-menu-page{
    width: 100vw;
    border-radius: 0px;
    overflow: auto;
    /* border: 1px solid red; */
  }
}
</style>