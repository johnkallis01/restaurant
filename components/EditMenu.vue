<script setup>
const router = useRouter();
const props = defineProps({
    menu:{
        type: Object,
        required: true
    }
});
//dialog flags
const newMenuDialog = ref(false);
const newSectionDialog = ref(false);
const newItemDialog = ref(false);
const editMenuDialog = ref(false);
const editSectionDialog = ref(false);
const editItemDialog = ref(false);
const deleteMenuDialog = ref(false);
const deleteSectionDialog = ref(false);
const deleteItemDialog = ref(false);

const recieveNewMenuDialog = (flag) => {   
    newMenuDialog.value=flag;
};
const recieveNewSectionDialog = (flag) => {   
    newSectionDialog.value=flag;
};
const recieveNewItemDialog = (flag) => {   
    newItemDialog.value=flag;
};
const recieveEditMenuDialog = (flag) => {   
    editMenuDialog.value=flag;
};
const recieveEditSectionDialog = (flag) => {   
    editSectionDialog.value=flag;
};
const recieveEditItemDialog = (flag) => {   
    editItemDialog.value=flag;
};
const recieveDeleteMenuDialog = (flag) => {   
    deleteMenuDialog.value=flag;
};
const recieveDeleteSectionDialog = (flag) => {   
    deleteSectionDialog.value=flag;
};
const recieveDeleteItemDialog = (flag) => {   
    deleteItemDialog.value=flag;
};
const deleteMenu = (menu) => {
    console.log('delete ', menu)
}
const deleteSection = (menu, section) =>{
    console.log("delete ",section)
}
const deleteItem = (menu, section, item) =>{
    let itemMenu = menu.find((sec) => section._id === sec._id);
    console.log('delete ',item)
}
</script>
<template>
    <v-card flat>
        <div class="menu-title">
            <span class="title-text">{{ menu.name }}</span>
            <span class="btn-group">
                <button class="btn" @click="deleteMenu">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
                <button class="btn" @click="editMenu">
                    <i class="mdi mdi-square-edit-outline"/>
                    <span class="tooltip">edit</span>
                </button>
                <button class="btn" @click="newSectionDialog=true">
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add section</span>
                </button> 
            </span>
        </div>
        <v-card-item>
            <v-row dense>
                <v-col
                    v-for="(section, i) in menu.sections"
                    :key="i"
                    cols="12"
                    md="4"
                >
                    <v-card class="fixed-card">
                        <v-card-title class="section-title">
                            <span>{{ section.name }}</span>
                            <span class="btn-group">
                                <button class="btn" @click="editSection">
                                    <i class="mdi mdi-square-edit-outline"/>
                                    <span class="tooltip">edit</span>
                                </button>
                                <button class="btn" @click="deleteSection">
                                    <i class="mdi mdi-close"/>
                                    <span class="tooltip">delete</span>
                                </button>
                                <button class="btn" @click="newItemDialog=true">
                                    <i class="mdi mdi-plus"/>
                                    <span class="tooltip">add item</span>
                                </button> 
                            </span>
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-item>
        <v-dialog v-model="newMenuDialog" persistent>
            <newMenuDialog @getDialogFlag="recieveNewMenuDialog"/>
        </v-dialog>
        <v-dialog v-model="newSectionDialog" persistent>
            <v-card>
                <NewSectionDialog :menu="menu" @getDialogFlag="recieveNewSectionDialog"/>
            </v-card>
        </v-dialog>
        <v-dialog v-model="newItemDialog" persistent>
            <NewItemDialog :menu="menu" :section="section" persistent @getDialogFlag="recieveNewItemDialog"/>
        </v-dialog>
    </v-card>
</template>
<style scoped>
.btn{
    padding: 5px;
    font-size: 15px;
}

.menu-title{
    display: flex;
    background-color: white;
    border: 2px solid black;
    color: black;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
}
.fixed-card{
    max-width: 300px;
    min-width: 250px;
    height: 200px;
    margin: auto;
}
.section-title{
    background-color: white;
    color: black;
    padding: 8px;
    border-bottom: 2px solid #333;
}
.v-dialog{
    width: 60vw;
}
.btn-group{
    position: absolute;
  right: 0
}
.title-text{
    position: absolute;
    left: 50%;
    font-size: 23px;
}
.tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s;
}
.btn:hover .tooltip{
    opacity: 1;
    visibility: visible;
}
</style>