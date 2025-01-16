<script setup>
import { v4 as uuidv4 } from 'uuid';
const router=useRouter();
const {menu, menus} = defineProps({ menu: { type: Object, required: true, },
    menus: {type: Array, required: true}});
const menuStore = useMenuStore();
const deleteMenu = (menu) =>{
    const menuIndex = menus.findIndex(m => menu['_id'] === m['_id']);
    menus.slice(menuIndex, 1);
    console.log('delete menu', menu)
    menuStore.deleteMenu(menu['_id']);
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
</script>
<template>
    <div class="menu-container">
        <div class="container-title menu">
            <button class="btn menu" @click="deleteMenu(menu)">
                <i class="mdi mdi-close"/>
                <span class="tooltip">delete</span>
            </button>
            <span class="title-text">{{ menu['name'] }}</span>
            <span class="btn-icons-group">
                
                <button class="btn" @click="addNewSection">
                    <span>section</span>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add section</span>
                </button> 
            </span>
        </div>
        <div class="sections">
            <div class="section-container" v-if="addSection">
                <EditSection :section="newSection" :menu="menu" @send-new-section-flag="getNewSectionFlag"/>
            </div>
            <div class="section-container" v-for="(section, i) in menu['sections']" :key="i">
                <EditSection :section="section" :menu="menu" />              
            </div>
        </div>
    </div>
</template>
<style scoped>
.container-title.menu{
    height: 8vh;
    color: black;
    border-bottom: 2px solid #333;
    background-color: rgb(184, 175, 175);
}
</style>