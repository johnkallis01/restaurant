<script setup>
const props = defineProps({ menu:{ type: Object, required: true }});
const menuStore = useMenuStore();

const deleteMenu = (menu) =>{
    console.log('delete menu')
}
</script>
<template>
    <div class="menu-container">
        <div class="container-title menu">
            <span class="title-text menu">{{ menu.name }}</span>
            <span class="btn-icons-group">
                <button class="btn" @click="deleteMenu(menu)">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
                <button class="btn" @click="editMenu">
                    <i class="mdi mdi-square-edit-outline"/>
                    <span class="tooltip">edit</span>
                </button> 
            </span>
        </div>
        <div class="sections">
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
</style>