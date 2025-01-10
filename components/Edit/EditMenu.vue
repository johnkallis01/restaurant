<script setup>
import { v4 as uuidv4 } from 'uuid';
const props = defineProps({ menu:{ type: Object, required: true }});
const deleteMenu = (menu) =>{
    console.log('delete menu')
}
const addSection = ref(false);
const addNewSection = () =>{
    addSection.value=!addSection.value;
}
const getNewSectionFlag = () => {
    console.log('flag in section')
    addSection.value=!addSection.value;
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
            <span class="title-text menu">{{ menu.name }}</span>
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
            <div class="section-container" v-for="(section, i) in menu.sections" :key="i">
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
.text-field.description{
    width: 100%;

}
.input-description{
    width: 100%;
}
.title-text{
    position: absolute;
    left: 50%;
    font-size: 23px;
}
.btn.delete{
    margin-right: 20px;
}
.name-price{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50vh;
}
.item-name{
    flex: 1;
    text-align: left;
}
.item-price{
    flex: 0 0 100px;
    text-align: right;
}
.btn.menu{
    position: absolute;
    left: 0;
}
</style>