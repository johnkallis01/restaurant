<script setup>
import { v4 as uuidv4 } from 'uuid';
import { reactive } from 'vue';
const router=useRouter();
const {menu, menus} = defineProps(
    { menu: { type: Object, required: true, },
    menus: {type: Array, required: true}}
);
const menuStore = useMenuStore();
const localMenu = reactive(menu);
const localMenus = reactive(menus);
const showTimes = ref(false);
const addSection = ref(false);
const newSection = reactive({
    name: "",
    description: "",
    _id: uuidv4(),
});
const getNewSectionFlag = () => {addSection.value=false;}
const getCloseTimes = () => {showTimes.value=false;}
const deleteMenu = (menu) =>{
    const menuIndex = localMenus.findIndex(m => menu._id === m._id);
    localMenus.slice(menuIndex, 1);
    menuStore.deleteMenu(menu._id);
    router.push('/');
}
const addNewSection = () =>{
    addSection.value=!addSection.value;
    newSection = {
        name: "",
        description: "",
        _id: uuidv4(),
        items: []
    }
}
</script>
<template>
    <div class="menu-container">
        <div class="container-title menu">
            <button class="btn" @click="deleteMenu(menu)">
                <i class="mdi mdi-close"/>
                <span class="tooltip">delete</span>
            </button>
            <div class="title-text">{{ menu.name }}</div>
            <div class="btn-icons-group">
                <button class="btn" @click="addNewSection">
                    <i class="mdi mdi-plus"/>
                    <span>section</span>
                    <span class="tooltip">add section</span>
                </button>
                <span class="spacer"></span>
                <button class="btn times" @click="showTimes=!showTimes">
                    <i class="mdi mdi-calendar-edit"/>
                    <span>times</span>
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
            <div class="section-container" v-for="(sec, i) in localMenu.sections" :key="i">
                <EditSection :section="sec" :menu="localMenu" />              
            </div>
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