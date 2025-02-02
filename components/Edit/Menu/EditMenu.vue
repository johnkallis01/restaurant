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
</script>
<template>
    <div class="menu-container">
        <div class="container-title menu">
            <button class="btn" @click="modalFlag=true">
                <i class="mdi mdi-close"/>
                <span class="tooltip">delete</span>
            </button>
            <div class="title-text">{{ localMenu.name }}</div>
            <div class="btn-icons-group">
                <button class="btn" @click="addNewSection">
                    <i class="mdi mdi-plus"/>
                    <span>section</span>
                    <span class="tooltip">add section</span>
                </button>
                <span class="spacer"></span>
                <button class="btn times" @click="showTimes=!showTimes">
                    <i class="mdi mdi-calendar-edit"/>
                    <span>edit</span>
                    <span class="tooltip">edit menu times</span>
                </button>
            </div>
        </div>
        <div class="sections">
            <span class="menu-schedule" v-if="showTimes">
               <EditMenuTimes :menu="localMenu" @close-window="getCloseTimes"/>
            </span>
            <div class="section-container" v-if="addSection">
                <EditSection :section="newSection" :menu="localMenu" @send-new-section-flag="getNewSectionFlag"/>
            </div>
            <div class="section-container" v-for="(sec, i) in localMenu.sections" :key="sec._id">
                <EditSection :section="sec" :menu="localMenu" />              
            </div>
        </div>
        <div class="modalWrapper" v-if="modalFlag">
            <ModalDelete class="modal delete" :item="localMenu" itemType="Menu" @close-modal="modalFlag=false" @delete-item="getDelete"/>
        </div>
    </div>
</template>
<style scoped>
.menu-schedule{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    gap: 5px;
}
.spacer{
    display: inline-block;
    width: 15px;
}
.container-title.menu{
    height: 8vh;
    color: black;
    border-bottom: 2px solid #333;
    background-color: rgb(184, 175, 175);
}
</style>