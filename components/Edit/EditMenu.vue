<script setup>
const props = defineProps({ menu:{ type: Object, required: true }});
const menuStore = useMenuStore();

const passSection = ref();
const passItem = ref();

//dialog flags
const newSectionDialog = ref(false);
const newItemDialog = ref(false);
const editMenuDialog = ref(false);
const editSectionDialog = ref(false);
const editItemDialog = ref(false);
const deleteMenuDialog = ref(false);
const deleteSectionDialog = ref(false);
const deleteItemDialog = ref(false);

const deleteSection = (section) => { passSection.value = section; deleteSectionDialog.value = true; }
const deleteItem = (item, section) => { passSection.value = section; passItem.value = item; deleteItemDialog.value = true; }

const editMenu = () => editMenuDialog.value = true;
//const editSection = (section) => {  passSection.value=section; editSectionDialog.value = true;}
const editItem = (item, section) => { passItem.value = item; passSection.value=section; editItemDialog.value = true; }

const addItem = (section) => { passSection.value = section; newItemDialog.value=true; }
const formatPrice = (priceString) => {
  const number = parseFloat(priceString);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
};
/************************
**edit section name logic
*************************/
const sectionNameRefs = ref([]);
const editSectionName = (section, index) => {
  section.editName = true;
  nextTick(() => { if(sectionNameRefs.value[index]) { sectionNameRefs.value[index].focus();}});
};
const setSectionNameRef = (el, index) => { if (el) sectionNameRefs.value[index] = el;};
const submitEditSectionName = (section, index) => {
  section.editName = false;
  let newSection = { //remove flags
    name: section.name,
    description: section.description,
    items: section.items,
    _id: section._id
  }
  props.menu.sections[index] = newSection;
  menuStore.updateMenu(props.menu);
};
/**********************
**edit section description logic
**********************/
const sectionDescriptionRefs = ref([]);
const editSectionDescription = (section, index) => {
    section.editDescription = true;
    nextTick(() => { if(sectionDescriptionRefs.value[index]) sectionDescriptionRefs.value[index].focus();})
};
const setSectionDescriptionRef = (el, index) => { if (el) sectionDescriptionRefs.value[index] = el;};
const submitEditSectionDescription = (section, index) => {
  section.editDescription= false;
  let newSection = { //remove flags
    name: section.name,
    description: section.description,
    items: section.items,
    _id: section._id
  }
  props.menu.sections[index] = newSection;
  menuStore.updateMenu(props.menu);
};

/** 
 * add flags to new menu object
 **/
 const thisMenu = ref(props.menu);
 const addSectionFlags = () => {
    thisMenu.value.sections = thisMenu.value.sections.map( section =>({
        ...section,
        editName: false,
        editDescription: false,
    }))
};
const addItemFlags = () => {

}
onMounted(() => {addSectionFlags();});
</script>
<template>
    <div class="menu-container">
        <div class="container-title menu">
            <span class="title-text">{{ menu.name }}</span>
            <span class="btn-icons-group">
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
        <div class="sections">
            <div 
                class="section-container"
                v-for="(section, i) in thisMenu.sections"
                :key="i"
            >
                <div class="section-name">
                    <template v-if="section.editName">
                        <div class="text-field name">
                            <input
                                type="text"
                                :ref="el => setSectionNameRef(el, i)" 
                                v-model="section.name"
                                @blur="submitEditSectionName(section, i)"
                            />
                        </div>
                    </template>
                    <template v-else>
                        <span>{{ section.name }}</span>
                    </template>
                    <span class="btn-icons-group">
                        <button class="btn" @click="editSectionName(section, i)">
                            <i class="mdi mdi-square-edit-outline"/>
                            <span class="tooltip">edit name</span>
                        </button>
                        <button class="btn" @click="deleteSection(section)">
                            <i class="mdi mdi-close"/>
                            <span class="tooltip">delete</span>
                        </button>
                        <button class="btn" @click="addItem(section)">
                            <span class="btn-text">item</span>
                            <i class="mdi mdi-plus"/>
                            <span class="tooltip">add item</span>
                        </button> 
                    </span>
                </div>
                <div class="section-description">
                    <template v-if="section.editDescription">
                        <div class="text-field description">
                            <input
                            type="text"
                            :ref="el => setSectionDescriptionRef(el, i)" 
                            v-model="section.description"
                            @blur="submitEditSectionDescription(section, i)"
                        />
                        </div>
                    </template>
                    <template v-else>
                        <span>{{ section.description }}</span>
                    </template>
                    <span class="btn-icons-group">
                        <button class="btn" @click="editSectionDescription(section, i)">
                            <i class="mdi mdi-square-edit-outline"/>
                            <span class="tooltip">edit description</span>
                        </button> 
                    </span>
                </div>
                <div class="section-items">
                    <div v-for="(item, i) in section.items" :key="i">
                        <div class="section-items">
                            <div class="item-name">
                                <span class="btn-icons-group items">
                                    <button class="btn" @click="editItem(item, section)">
                                        <i class="mdi mdi-square-edit-outline"/>
                                        <span class="tooltip">edit</span>
                                    </button>
                                    <button class="btn" @click="deleteItem(item, section)">
                                        <i class="mdi mdi-close"/>
                                        <span class="tooltip">delete</span>
                                    </button>
                                </span>
                                <span>
                                    {{ item.name }}
                                </span>
                                <span class="item-price">
                                    {{ formatPrice(item.price)}}
                                </span>
                                
                            </div>
                        </div>
                    </div>
                </div>                       
         
            </div>
        </div>
        <div id="dialogs">
            <v-dialog class="dialog new-section" v-model="newSectionDialog" persistent fullscreen>
                <v-card>
                    <NewSectionDialog :menu="menu" @getDialogFlag="newSectionDialog=flag"/>
                </v-card>
            </v-dialog>
            <v-dialog class="dialog new-item" v-model="newItemDialog" persistent fullscreen>
                <v-card>
                    <NewItemDialog :section="passSection" :menu="menu" persistent @getDialogFlag="newItemDialog=flag"/>
                </v-card>
            </v-dialog>
            <v-dialog class="dialog delete-menu" v-model="deleteMenuDialog" persistent fullscreen>
                <v-card>
                    <DeleteMenuDialog :menu="menu" @getDialogFlag="deleteMenuDialog=flag"/>
                </v-card>
            </v-dialog>
            <v-dialog class="dialog delete-section" v-model="deleteSectionDialog" persistent fullscreen>
                <v-card>
                    <DeleteSectionDialog :section="passSection" :menu="menu" @getDialogFlag="deleteSectionDialog=flag"/>
                </v-card>
            </v-dialog>
            <v-dialog class="dialog delete-item" v-model="deleteItemDialog" persistent fullscreen>
                <v-card>
                    <DeleteItemDialog :item="passItem"  :section="passSection" :menu="menu" @getDialogFlag="deleteItemDialog=flag"/>
                </v-card>
            </v-dialog>
            <v-dialog class="dialog edit-menu" v-model="editMenuDialog" persistent fullscreen>
                <v-card>
                    <EditMenuDialog :menu="menu" @getDialogFlag="editMenuDialog=flag"/>
                </v-card>
            </v-dialog>
            <v-dialog class="dialog edit-section" v-model="editSectionDialog" persistent fullscreen>
                <EditSectionDialog class="component edit-section-dialog" :section="passSection" :menu="menu" @getDialogFlag="editSectionDialog=flag"/>
            </v-dialog>
            <v-dialog class="dialog edit-item" v-model="editItemDialog" persistent fullscreen>
                <v-card>
                    <EditItemDialog :item="passItem" :section="passSection" :menu="menu" @getDialogFlag="editItemDialog=flag"/>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>
<style scoped>

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

.title-text{
    position: absolute;
    left: 50%;
    font-size: 23px;
}
.item-price{
    margin-left: 20px;
}
</style>