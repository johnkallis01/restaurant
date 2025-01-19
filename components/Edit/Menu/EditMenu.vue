<script setup>
import { v4 as uuidv4 } from 'uuid';
const router=useRouter();
const {menu, menus} = defineProps({ menu: { type: Object, required: true, },
    menus: {type: Array, required: true}});
const menuStore = useMenuStore();
const deleteMenu = (menu) =>{
    const menuIndex = menus.findIndex(m => menu._id === m._id);
    menus.slice(menuIndex, 1);
    console.log('delete menu', menu)
    menuStore.deleteMenu(menu._id);
    router.push('/')
}
const addSection = ref(false);
const addNewSection = () =>{
    addSection.value=!addSection.value;
    newSection.value = {
        name: "",
        description: "",
        _id: uuidv4(),
        items: []
    }
}
const getNewSectionFlag = () => {
    console.log('flag in section')
    addSection.value=false;
}
const newSection = ref({
    name: "",
    description: "",
    _id: uuidv4(),
});
const showTimes=ref(false);
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
               <EditMenuTimes :menu="menu"/>
            </span>
            <div class="section-container" v-if="addSection">
                <EditSection :section="newSection" :menu="menu" @send-new-section-flag="getNewSectionFlag"/>
            </div>
            <div class="section-container" v-for="(section, i) in menu.sections" :key="i">
                <EditSection :section="section" :menu="menu" />              
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