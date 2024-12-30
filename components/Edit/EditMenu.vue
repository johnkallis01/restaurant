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
const passItem = ref();
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
const recieveDeleteItemDialog = (flag) => {; 
    deleteItemDialog.value=flag;
};
const deleteMenu = (menu) => {
    console.log('delete ', menu)
    menuStore.deleteMenu(menu._id);
}
const deleteSection = (section) => {
    passSection.value = section;
    deleteSectionDialog.value = true;
}
const deleteItem = (item, section) => {
    passSection.value = section;
    passItem.value = item;
    deleteItemDialog.value = true;
}
const editSection = (section) => {
    passSection.value=section;
    editSectionDialog.value = true;
}
const editItem = (item, section) => {
    console.log('edit item')
    passItem.value = item;
    passSection.value=section;
    editItemDialog.value = true;
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
     
            <v-row dense>
                <v-col
                    v-for="(section, i) in menu.sections"
                    :key="i"
                    cols="12"
                    md="4"
                >
                    <v-card class="fixed-card">
                        <div class="section-title">
                            <span>{{ section.name }}</span>
                            <span class="btn-group">
                                <button class="btn" @click="editSection(section)">
                                    <i class="mdi mdi-square-edit-outline"/>
                                    <span class="tooltip">edit</span>
                                </button>
                                <button class="btn" @click="deleteSection(section)">
                                    <i class="mdi mdi-close"/>
                                    <span class="tooltip">delete</span>
                                </button>
                                <button class="btn" @click="addItem(section)">
                                    <i class="mdi mdi-plus"/>
                                    <span class="tooltip">add item</span>
                                </button> 
                            </span>
                        </div>
                        <div class="list-items">
                            <div v-for="(item, i) in section.items" :key="i">
                                <span class="items-row">
                                    <span class="item-name">
                                        {{ item.name }}
                                    </span>
                                    <span class="btn-group-items">
                                        <button class="btn" @click="editItem(item, section)">
                                            <i class="mdi mdi-square-edit-outline"/>
                                            <span class="tooltip">edit</span>
                                        </button>
                                        <button class="btn" @click="deleteItem(item, section)">
                                            <i class="mdi mdi-close"/>
                                            <span class="tooltip">delete</span>
                                        </button>
                                    </span>
                                </span>
                            </div>
                        </div>                       
                    </v-card>
                </v-col>
            </v-row>
      
        <v-dialog v-model="newMenuDialog" persistent>
            <NewMenuDialog @getDialogFlag="recieveNewMenuDialog"/>
        </v-dialog>
        <v-dialog class="new-section-dialog" v-model="newSectionDialog" persistent>
            <v-card>
                <NewSectionDialog :menu="menu" @getDialogFlag="recieveNewSectionDialog"/>
            </v-card>
        </v-dialog>
        <v-dialog class="new-item-dialog" v-model="newItemDialog" persistent>
            <v-card>
                <NewItemDialog :menu="menu" :section="passSection" persistent @getDialogFlag="recieveNewItemDialog"/>
            </v-card>
        </v-dialog>
        <v-dialog class="dialog delete-menu" v-model="deleteMenuDialog" persistent>
            <v-card>
                <DeleteMenuDialog :menu="menu" @getDialogFlag="recieveDeleteMenuDialog"/>
            </v-card>
        </v-dialog>
        <v-dialog class="dialog delete-section" v-model="deleteSectionDialog" persistent>
            <v-card>
                <DeleteSectionDialog :section="passSection" :menu="menu" @getDialogFlag="recieveDeleteSectionDialog"/>
            </v-card>
        </v-dialog>
        <v-dialog class="dialog delete-item" v-model="deleteItemDialog" persistent>
            <v-card>
                <DeleteItemDialog :menu="menu" :section="passSection" :item="passItem" @getDialogFlag="recieveDeleteItemDialog"/>
            </v-card>
        </v-dialog>
        <v-dialog class="dialog edit-menu" v-model="editMenuDialog" persistent>
            <v-card>
                <EditMenuDialog :menu="menu" @getDialogFlag="recieveEditMenuDialog"/>
            </v-card>
        </v-dialog>
        <v-dialog class="dialog edit-section" v-model="editSectionDialog" persistent>
            <v-card>
                <EditSectionDialog :section="passSection" :menu="menu" @getDialogFlag="recieveEditSectionDialog"/>
            </v-card>
        </v-dialog>
        <v-dialog class="dialog edit-item" v-model="editItemDialog" persistent>
            <v-card>
                <EditItemDialog :menu="menu" :section="passSection" :item="passItem" @getDialogFlag="recieveDeleteItemDialog"/>
            </v-card>
        </v-dialog>
    </v-card>
</template>
<style scoped>
.list-items{
    padding: 5px;
    max-height: 170px;
    overflow-y: auto;
    overflow-x: hidden;
}
.items-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.item-name{
    flex: 1;
}
.btn-group-items{
    display: flex;
}
.dialog{
    width: 80%;
}
.new-section-dialog{
    width: 80vh;
}
.new-item-dialog{
    width: 90%;
    height: 90%;
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
    height: 212px;
    margin: 10px;
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