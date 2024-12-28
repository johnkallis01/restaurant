<script setup>
const router = useRouter();
const props = defineProps({
    menu:{
        type: Object,
        required: true
    }
});
const menuStore = useMenuStore();
const passSection = ref();
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
//receieve flags from emits
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
    menuStore.deleteMenu(menu._id);
}
const deleteSection = (section) =>{
    console.log("delete ",section)
    const index = props.menu.sections.findIndex(sec => sec._id ===section._id );
    console.log(index)
    props.menu.sections.splice(index,1);
    try{
        menuStore.updateMenu(props.menu);
    } catch(error){
            console.log("section didn't post");
    }
}
const deleteItem = (menu, section, item) =>{
    let itemSection = menu.find((sec) => section._id === sec._id);
    console.log('delete ',item)
}
const addItem = (section) => {
    passSection.value = section;
    newItemDialog.value=true;
}
</script>
<template>
    <v-card flat>
        <div class="menu-title">
            <span class="title-text">{{ menu.name }}</span>
            <span class="btn-group">
                <button class="btn" @click="deleteMenu(menu)">
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
                                <button class="btn" @click="addItem(section)">
                                    <i class="mdi mdi-plus"/>
                                    <span class="tooltip">add item</span>
                                </button> 
                            </span>
                        </v-card-title>
                        <div v-for="(item, i) in section.items" :key="i">{{ item.name }}</div>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-item>
        <v-dialog v-model="newMenuDialog" persistent>
            <newMenuDialog @getDialogFlag="recieveNewMenuDialog"/>
        </v-dialog>
        <v-dialog id="new-section-dialog" v-model="newSectionDialog" persistent>
            <v-card>
                <NewSectionDialog :menu="menu" @getDialogFlag="recieveNewSectionDialog"/>
            </v-card>
        </v-dialog>
        <v-dialog id="new-item-dialog" v-model="newItemDialog" persistent>
            <v-card>
                <NewItemDialog :menu="menu" :section="passSection" persistent @getDialogFlag="recieveNewItemDialog"/>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<style scoped>
#new-section-dialog{
    width: 80vh;
}
#new-item-dialog{
    width: 90%;
    height: 90%;
}
.btn{
    padding: 5px;
    font-size: 15px;
}

.menu-title{
    display: flex;
    background-color: rgb(234, 228, 228);
    border-bottom: 2px solid black;
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
    background-color: rgb(234, 228, 228);
    color: black;
    padding: 8px;
    border-bottom: 2px solid #333;
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

</style>