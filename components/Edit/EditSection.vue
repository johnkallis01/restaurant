<script setup>
const props = defineProps({
    section: { type:Object, required: true},
    menu: { type:Object, required: true},
});
const menuStore = useMenuStore();
const postSectionEdit = (section) => {
    const sectionIndex = props.menu.sections.findIndex(sec => sec._id === section._id);
    props.menu.sections[sectionIndex]=section;
    menuStore.updateMenu(props.menu);
}
/************************
**edit section name logic
*************************/
const sectionNameRef = ref(null);
const editName = ref(false);
const editSectionName = (section) => {
    editName.value = true;
    nextTick(()=> sectionNameRef.value.focus())
}
const submitEditSectionName = (section) => {
    editName.value = false;
    postSectionEdit(section);
};
/************************
**edit section description logic
*************************/
const sectionDescriptionRef = ref(null);
const editDescription = ref(false);
const editSectionDescription = (section) => {
    editDescription.value = true;
    nextTick(()=> sectionDescriptionRef.value.focus())
}
const submitEditSectionDescription = (section) => {
    editDescription.value = false;
    postSectionEdit(section);
};
//delete section
const deleteSection = (section)=>{
    const sectionIndex = props.menu.sections.findIndex(sec => sec._id === section._id);
    props.menu.sections.splice(sectionIndex, 1);
    menuStore.updateMenu(props.menu);
}
//add item
const addItem = (section)=>{
    console.log('add item')
}
</script>
<template>
    <div>
       <div class="section-name">
            <button class="btn delete" @click="deleteSection(section)">
                <i class="mdi mdi-close"/>
                <span class="tooltip">delete section</span>
            </button>
            <template v-if="editName">
                <div class="text-field name">
                    <input
                        type="text"
                        ref="sectionNameRef" 
                        v-model="section.name"
                        @blur="submitEditSectionName(section)"
                    />
                </div>
            </template>
            <template v-else>
                <span @click="editSectionName(section)">{{ section.name }}</span>
            </template>
            <button class="btn add-item" @click="addItem(section)">
                <span class="btn-text">item</span>
                <i class="mdi mdi-plus"/>
                <span class="tooltip">add item</span>
            </button> 
        </div>
        <div class="section-description">
            <template v-if="editDescription">
                <div class="text-field description">
                    <input
                        type="text"
                        class="input-description"
                        ref="sectionDescriptionRef"
                        v-model="section.description"
                        @blur="submitEditSectionDescription(section)"
                    />
                </div>
            </template>
            <template v-else>
                <span @click="editSectionDescription(section)">{{ section.description }}</span>
            </template>
        </div>
        <div class="section-items">
            <div v-for="(item, i) in section.items" :key="i">
                <div class="section-items">
                    <EditItem :item="item" :section="section" :menu="menu" />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.btn.add-item{
    position: absolute;
    right: 0;
}
</style>