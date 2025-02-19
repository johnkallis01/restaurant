<script setup>
import { Menu } from "~/models/Menu";
useHead({
  title: "John's Restaurant - Edit Menu"
});
definePageMeta({middleware: ['admin','auth']});
const newMenu = reactive(new Menu());
const menuStore=useMenuStore();
const menus=ref(null);
const pageContainerRef=ref(null);
const dragMenu=ref(null);
const touchDragMenu=ref(null);
const touchDropMenu=ref(null);
const onTouchMove = (event) => {
    event.preventDefault(); // Prevent scrolling while dragging
    const touch = event.touches[0];
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    // console.log('move',target)
    touchDropMenu.value=target;
};
const onTouchEnd=()=>{
    // console.log(touchDropMenu.value.dataset.index)
    if(touchDropMenu.value?.className==='menu-names'){
        // let droppedOnIndex=Number(touchDropMenu.value.dataset.index);
        let draggedMenu=menus.value[touchDragMenu.value];
        // console.log(droppedOnSection, droppedOnIndex)
        menus.value.splice(touchDragMenu.value, 1);
        menus.value.splice(touchDropMenu.value.dataset.index,0,draggedMenu);
            // console.log(true)
        let slicePoint = touchDragMenu.value < touchDropMenu.value.dataset.index ? touchDragMenu.value : touchDropMenu.value.dataset.index;
        menus.value.slice(slicePoint).forEach((menu, i)=> {
            menu.position=i+slicePoint;
        });
        menuStore.bulkUpdateMenus(menus.value.slice(slicePoint));
        touchDragMenu.value=null;
        touchDropMenu.value=null;
    }
}
const onDropMenu=(index) => {
  // console.log(menus.value)
  if (dragMenu.value === null || dragMenu.value === index) return;
  let draggedMenu=menus.value[dragMenu.value];
  menus.value.splice(dragMenu.value, 1);
  menus.value.splice(index,0,draggedMenu);
  // console.log(menus.value)
  let slicePoint = dragMenu.value < index ? dragMenu.value : index;
  console.log(slicePoint)
  // console.log(menus.value.slice(slicePoint))
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
const { sortByPosition } = useSortByPosition();
</script>
<template>
  <div class="page-container" ref="pageContainerRef">
    <div class="container-title" v-if="menus">
      <span class="edit-menu">Edit Menu Order:</span>
      <span class="menu-names"
          v-for="(menu,i) in sortByPosition(menus)" 
              :key="menu._id"
              draggable="true"
              :data-index="i"
              @touchstart="touchDragMenu=i"
              @touchmove="onTouchMove($event)"
              @touchend="onTouchEnd"
              @dragstart="dragMenu=i"
              @dragover.prevent
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
.page-container{
  background-color: transparent;
  width: 100vw;
  left: 0;
}
@media(max-width: 415px){
  .page-container{
    width: 105vw;
  }
  .container-title{
    width: 105vw;
    margin-right: 5vw;
    margin-left: 20px;
  }
}
.new-menu-page{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 10px;
  width: 60vw;
  max-width: 600px;
  background-color: rgb(247, 249, 252);
}
.container-title{
  justify-content: start;
  overflow-x: scroll;
  scrollbar-width: none;
}
.edit-menu{
  padding-left: 5px;
  text-wrap: nowrap;
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
    overflow: auto;
    /* border: 1px solid red; */
  }
}
@media(max-width: 600px) {
  .new-menu-page{
    width: 100vw;
    overflow: auto;
    /* border: 1px solid red; */
  }
}
</style>