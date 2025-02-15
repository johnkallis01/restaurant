<script setup>
import { v4 as uuidv4 } from 'uuid';
const {menu, menus} = defineProps({
     menu: { type: Object, required: true},
    menus: {type: Array, required: true}
});
const router=useRouter();
const menuStore = useMenuStore();
const localMenu = reactive(menu);
const localMenus = reactive(menus);
const modalFlag=ref(false);
const showTimes = ref(false);
const addSection = ref(false);
const newSection = ref({
    name: "",
    description: "",
    _id: uuidv4(),
    items: [],
    options: [],
});
const getDelete=()=>{
    console.log('get delete')
    modalFlag.value=false;
    deleteMenu();
}
function deleteMenu(){
    const menuIndex = localMenus.findIndex(m => localMenu._id === m._id);
    localMenus.slice(menuIndex, 1);
    menuStore.deleteMenu(menu._id);
    router.push('/');
}
function addNewSection(){
    addSection.value=!addSection.value;
    newSection.value = {
    name: "",
    description: "",
    _id: uuidv4(),
    items: [],
    options: [],
  };
}
const getNewSectionFlag = () => {addSection.value=false;}
const getCloseTimes = (name) => {
    localMenu.name=name;
    showTimes.value=false;
}
// const draggedSectionIndex=ref(null);
// const onSectionDrag=(event,index) => {
//     console.log('section ev',event)
//     if(event.target.classList.contains('item-container')){
//          event.dataTransfer.isTrusted=false;
//          return;
//         }
//     console.log('p')
    
//     draggedSectionIndex.value=index;
// }
const draggedSectionIndex=ref(null);
const onDrop=(newIndex)=>{
    console.log('drop section')
    // if(!draggedSectionIndex.value) return;
    const draggedSection = localMenu.sections[draggedSectionIndex.value];
    localMenu.sections.splice(draggedSectionIndex.value, 1);
    localMenu.sections.splice(newIndex,0,draggedSection);
    localMenu.sections.forEach((sec, i)=> sec.position=i);
    // menuStore.updateMenu(localMenu);
    draggedSectionIndex.value=null;
}
watch(modalFlag, (open) => {
     if(open) {
        document.addEventListener('dragstart', stopDrag, true);
        document.addEventListener('touchstart', stopDrag, true);
        document.addEventListener('touchmove', stopDrag, true);
     }
     else{ 
        document.removeEventListener('dragstart', stopDrag, true);
        document.removeEventListener('touchstart', stopDrag, true);
        document.removeEventListener('touchmove', stopDrag, true);
    }
 })
const stopDrag=(event)=>{
     event.preventDefault();
}
</script>
<template>
    <div class="menu-container">
        <div class="container-title">
            <span class="left-btns">
                <button class="btn delete" @click="modalFlag=true">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
            </span>
            <span class="title-text">{{ localMenu.name }}</span>
            <span class="right-btns">
                <button class="btn" @click="addNewSection">
                    <i class="mdi mdi-plus"/>
                    <span>section</span>
                    <span class="tooltip">add section</span>
                </button>
                <button class="btn times" @click="showTimes=!showTimes">
                    <i class="mdi mdi-calendar-edit"/>
                    <span>edit</span>
                    <span class="tooltip">edit menu times</span>
                </button>
            </span>
        </div>
        <div class="section-container-holder">
            <div class="section-container">
                <span class="menu-schedule" v-if="showTimes">
                    <EditMenuTimes :menu="localMenu" @close-window="getCloseTimes"/>
                </span>
                <div class="section-container" v-if="addSection">
                    <EditSection :section="newSection" :menu="localMenu" @send-new-section-flag="getNewSectionFlag"/>
                </div>
                <div class="section-container" v-for="(sec,i) in localMenu.sections" :key="sec._id">
                    <EditSection 
                        :section="sec" 
                        :menu="localMenu"
                        @dragstart="draggedSectionIndex=i"
                        @dragover.prevent
                        @drop="onDrop(i)"
                        draggable="true"
                    />    <!-- -->
                </div>
            </div>
        </div>
        <div class="modalWrapper" v-if="modalFlag">
            <ModalDelete class="modal delete" :item="localMenu" itemType="Menu" @close-modal="modalFlag=false" @delete-item="getDelete"/>
        </div>
    </div>
</template>
<style scoped>
.section-container-holder{
    display: flex;
    flex-direction: column;
    position: relative;
    top: 30px;
    /* border: 1px solid blue; */
    margin-bottom: 70px;
}
.menu-schedule{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    gap: 5px;
}
.menu-container{
    overflow: hidden;
    top: 30px;
}
.menu-container button{
    margin: 0 3px;
}
.container-title{
    justify-content: space-between;
    height: 30px;
    color: black;
    border-bottom: 2px solid #333;
    background-color: rgb(184, 175, 175);
}
.container-title button{
    color: black;
}
.title-text{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>