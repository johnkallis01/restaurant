<script setup>
import { v4 as uuidv4 } from 'uuid';
const {menu, menus} = defineProps({
     menu: { type: Object, required: true},
    menus: {type: Array, required: true}
});
const router=useRouter();
const menuStore = useMenuStore();
const localMenu = reactive(menu);
const localMenus = reactive(menus);
const { detachObject } = useDetachObject();
const modalFlag=ref(false);
const showTimes = ref(false);
const addSection = ref(false);
const newSection = ref({
    name: "",
    description: "",
    _id: uuidv4(),
    items: [],
    options: [],
});
const getDeleteMenu=()=>{
    // console.log('get delete')
    modalFlag.value=false;
    const menuIndex = localMenus.findIndex(m => localMenu._id === m._id);
    localMenus.slice(menuIndex, 1);
    menuStore.deleteMenu(menu._id);
    router.push('/');
}
function addNewSection(){
    addSection.value=!addSection.value;
    newSection.value = {
    name: "",
    description: "",
    _id: uuidv4(),
    items: [],
    options: [],
  };
}
const getNewSectionFlag = () => {addSection.value=false;}
const getCloseTimes = (name) => {
    localMenu.name=name;
    showTimes.value=false;
}
const draggedSectionIndex=ref(null);

/*section data*/
const deleteModalFlag=ref([]); const addOptionsModalFlag=ref([]);
const nameInputRef=ref(null); const descriptionInputRef = ref(null);
const editName=ref(false); const editDescription = ref(false);
const addItem = ref([]);
const newItem = ref({
        new: true,
        name: "",
        price: "000.00",
        description: "",
        addOns: [],
        removes: [],
        options: [],
        position: 0,
        _id: uuidv4(),
});
function updateMenu(section){
    console.log('update')
    const sectionIndex = localMenu.sections.findIndex(sec => sec._id === section._id);
    localMenu.sections[sectionIndex]=section;
    menuStore.updateMenu(localMenu);
}
function postSectionEdit(section,str){
    switch(str){
        case 'name':
            editName.value=false;
            break;
        case 'description':
            editDescription.value=false;
            break;
    }
    updateMenu(section);
}
const getDeleteSection=(section)=>{
    const sectionIndex = menu.sections.findIndex(sec => sec._id === section._id);
    deleteModalFlag.value[sectionIndex]=false;
    localMenu.sections.splice(sectionIndex, 1);
    menuStore.updateMenu(localMenu);
}
function addNewItem(index){
    addItem.value[index]=!addItem.value[index];
    newItem.value = {
        name: "",
        price: "000.00",
        description: "",
        addOns: [],
        removes: [],
        options: [],
        _id: uuidv4(),
    }
}
const onSectionDrop=(newIndex, sec_id)=>{
    console.log('section drop')
    console.log(draggedSectionIndex.value, newIndex, sec_id);
    if(!draggedSectionIndex.value) return
    if(sec_id!==draggedSectionIndex.value.section){
        const draggedSection = localMenu.sections[draggedSectionIndex.value.index];
        let newMenu=detachObject(menu);
        localMenu.sections.splice(draggedSectionIndex.value.index, 1);
        localMenu.sections.splice(newIndex,0,draggedSection);
        localMenu.sections.forEach((sec, i)=> sec.position=i);
        menuStore.updateMenu(localMenu);
    }
    
    draggedSectionIndex.value=null;
}
const draggedEl=ref(null);
const onDragItemStart=(event, index, section)=>{
    console.log('item pick up')
    event.stopPropagation();
    console.log(index, section)
    draggedEl.value={index, section}
}
const onDragItemOver = (event) => {
    console.log('item drag')
    event.stopPropagation();
    event.preventDefault();
}
const onItemDrop=(event, newIndex, section)=>{
    event.stopPropagation(); 
    // console.log(event)
    // console.log('item onDrop',draggedEl.value, section)
    // console.log(newIndex, section)
    if(!draggedEl.value) return;
    if(draggedEl.value.section === section._id){
        const newItems = [...section.items];
        const draggedItem = newItems[draggedEl.value.index]
        newItems.splice(draggedEl.value.index, 1);
        newItems.splice(newIndex,0,draggedItem);
        newItems.forEach((item, i)=> item.position=i);
        const sortedSections=localMenu.sections.sort((a,b)=>a.position - b.position);
        // let newMenu=detachObject(localMenu)
        
        const sectionIndex=sortedSections.findIndex(sec => sec._id === section._id);
        // localMenu.sections=sortedSections;
        // localMenu.sections[sectionIndex]=section;
        // console.log(newMenu.sections[sectionIndex])
        localMenu.sections[sectionIndex].items=newItems;
        menuStore.updateMenu(localMenu);
        // updateMenu(section);
    }
    draggedEl.value=null;
}
const onTouchStart=(index, section_id)=>{
    draggedEl.value={index,section_id };
    // console.log(draggedEl.value)
}
const droppedOnEl=ref(null);
const onTouchMove = (event) => {
    event.preventDefault(); // Prevent scrolling while dragging
    const touch = event.touches[0];
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    // console.log('move',target)
    droppedOnEl.value=target;
};
const onTouchEnd=(section)=>{
    // console.log(droppedOnEl)
    if(droppedOnEl.value?.className){
        // let stop=0;
        while(droppedOnEl.value?.className!=='item-container'){
            droppedOnEl.value=droppedOnEl.value.parentElement;
            // console.log(droppedOnEl.value)
            // stop++;
        }
        let droppedOnIndex=Number(droppedOnEl.value.dataset.index);
        let droppedOnSection=droppedOnEl.value.dataset.id;
        // console.log(droppedOnSection, droppedOnIndex)
        if(droppedOnSection===draggedEl.value.section_id){
            // console.log(true)
            const draggedItem = section.items[draggedEl.value.index];
            section.items.splice(draggedEl.value.index, 1);
            section.items.splice(droppedOnIndex,0,draggedItem);
            section.items.forEach((item, i)=> item.position=i);
        }      
        updateMenu(section);
        draggedEl.value=null;
        droppedOnEl.value=null;
    }
}
const focusDescriptionInput = useFocusInput(descriptionInputRef,editDescription);
const focusNameInput = useFocusInput(nameInputRef, editName);
const tabToDescription = useTabToInput(focusDescriptionInput);

const stopDrag=(event)=>{
     event.preventDefault();
}
onMounted(() => {
    localMenu.sections.forEach(()=>{
        addOptionsModalFlag.value.push(false);
        deleteModalFlag.value.push(false);
        addItem.value.push(false);
    }) 
    // console.log(deleteModalFlag.value)
    // console.log(addOptionsModalFlag.value)
})
const eventListenersAdded=ref(false)
watchEffect(() => {
    console.log('watch em')
    // console.log(o)
    // [addOptionsModalFlag, deleteModalFlag, modalFlag],
    // var eventListenersAdded=false;
     if(addOptionsModalFlag.value.includes(true)||deleteModalFlag.value.includes(true)||modalFlag.value) {
        console.log('if')
        
        document.addEventListener('dragstart', stopDrag, true);
        document.addEventListener('touchstart', stopDrag, true);
        document.addEventListener('touchmove', stopDrag, true);
        eventListenersAdded.value=true;
     }
     else{ 
        console.log('else')
        if(eventListenersAdded.value){
            console.log('removing evl')
            document.removeEventListener('dragstart', stopDrag, true);
            document.removeEventListener('touchstart', stopDrag, true);
            document.removeEventListener('touchmove', stopDrag, true);
            eventListenersAdded.value=false;
        }
        
    }
 })
</script>
<template>
    <div class="menu-container">
        <div class="container-title">
            <span class="left-btns">
                <button class="btn delete" @click="modalFlag=true">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
            </span>
            <span class="title-text">{{ localMenu.name }}</span>
            <span class="right-btns">
                <button class="btn" @click="addNewSection">
                    <i class="mdi mdi-plus"/>
                    <span>section</span>
                    <span class="tooltip">add section</span>
                </button>
                <button class="btn times" @click="showTimes=!showTimes">
                    <i class="mdi mdi-calendar-edit"/>
                    <span>edit</span>
                    <span class="tooltip">edit menu times</span>
                </button>
            </span>
        </div>
        <div class="section-container-holder">
            <div class="section-container">
                <span class="menu-schedule" v-if="showTimes">
                    <EditMenuTimes :menu="localMenu" @close-window="getCloseTimes"/>
                </span>
                <div class="section-container" v-if="addSection">
                    <EditSection :section="newSection" :menu="localMenu" @send-new-section-flag="getNewSectionFlag"/>
                </div>
                <div class="section-container"
                    v-for="(sec,i) in localMenu.sections" :key="sec._id">
                    <div class="section-container"
                        @dragstart="draggedSectionIndex={index: i, section: sec._id}"
                        @dragover.prevent
                        @drop="onSectionDrop(i, sec._id)"
                        draggable="true">
                        <div class="section-name">
                            <span class="left-btns">
                                <button class="btn delete" @click="deleteModalFlag[i]=true">
                                    <i class="mdi mdi-close"/>
                                    <span class="tooltip">delete section</span>
                                </button>
                                <template v-if="editName">
                                    <div class="text-field name">
                                        <input
                                            type="text"
                                            ref="nameInputRef"
                                            v-model="sec.name"
                                            @blur="postSectionEdit(sec,'name')"
                                            @keydown.enter="postSectionEdit(sec,'name')"
                                            @keydown="tabToDescription"
                                        />
                                    </div>
                                </template>
                                <template v-else>
                                    <span @click="focusNameInput" v-if="sec.name">{{ sec.name }}</span>
                                    <span class="placeholder-color" @click="focusNameInput" v-else>name</span>
                                </template>
                            </span>
                            <div class="right-btns">
                                <button class="btn" @click="addOptionsModalFlag[i]=true">
                                    <span>options</span>
                                    <i class="mdi mdi-plus"/>
                                    <span class="tooltip">add options to all items</span>
                                </button> 
                                <button class="btn" @click="addNewItem(i)">
                                    <span>item</span>
                                    <i class="mdi mdi-plus"/>
                                    <span class="tooltip">add item</span>
                                </button>
                            </div>
                        </div>
                        <div class="section-description">
                            <template v-if="editDescription">
                                <div class="text-field description">
                                    <input
                                        type="text"
                                        ref="descriptionInputRef"
                                        v-model="sec.description"
                                        @blur="postSectionEdit(sec,'description')"
                                        @keydown.enter="postSectionEdit(sec,'description')"
                                    />
                                </div>
                            </template>
                            <template v-else>
                                <span @click="focusDescriptionInput" v-if="sec.description">{{ sec.description }}</span>
                                <span  class="placeholder-color" @click="focusDescriptionInput" v-else>description</span>
                            </template>
                        </div>
                        <div class="section-items">
                            <EditItem
                                v-if="addItem[i]"
                                :item="newItem"
                                :section_id="sec._id"
                                :menu="localMenu"
                                @send-new-item-flag="addItem[i]=false"/>
                            <EditItem
                                ref="item"
                                v-for="(item,j) in sec.items"
                                :key="item._id"
                                :item="item"
                                :section_id="sec._id"
                                :menu="localMenu"
                                :data-index="j"
                                :data-id="sec._id"
                                @touchstart="onTouchStart(j, sec._id)"
                                @touchmove="onTouchMove($event)"
                                @touchend="onTouchEnd(sec)"
                                draggable="true"
                                @dragstart.stop="onDragItemStart($event, j, sec._id)"
                                @dragover.stop="onDragItemOver($event)"
                                @drop.stop="onItemDrop($event, j,sec)"             
                            />
                        </div>
                        
                    </div>
                    <div class="modalWrapper" v-if="addOptionsModalFlag[i]">
                        <ModalAddOptions class="modal options" :key="sec._id" :menu="localMenu" :item="sec" @close-modal="addOptionsModalFlag[i]=false"/>
                    </div>
                    <div class="modalWrapper" v-if="deleteModalFlag[i]">
                        <ModalDelete class="modal delete" :key="sec._id" :item="localMenu.sections[i]" itemType="Section" @close-modal="deleteModalFlag[i]=false" @delete-item="getDeleteSection"/>
                    </div>
                    <!-- <EditSection 
                        :section="sec" 
                        :menu="localMenu"
                        @dragstart="draggedSectionIndex=i"
                        @dragover.prevent
                        @drop="onDrop(i)"
                        draggable="true"
                    />     -->
                </div>
            </div>
        </div>
        <div class="modalWrapper" v-if="modalFlag">
            <ModalDelete class="modal delete" :item="localMenu" itemType="Menu" @close-modal="modalFlag=false" @delete-item="getDeleteMenu"/>
        </div>
    </div>
</template>
<style scoped>
.section-container-holder{
    display: flex;
    flex-direction: column;
    position: relative;
    top: 30px;
    /* border: 1px solid blue; */
    margin-bottom: 70px;
}
.menu-schedule{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    gap: 5px;
}
.menu-container{
    overflow: hidden;
    top: 30px;
}
.menu-container button{
    margin: 0 3px;
}
.container-title{
    justify-content: space-between;
    height: 30px;
    color: black;
    border-bottom: 2px solid #333;
    background-color: rgb(184, 175, 175);
}
.container-title button{
    color: black;
}

.title-text{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.btn.delete{
    padding: 3px;
    margin: 0px 4px;
}
.right-btns{
    font-size:20px;
    margin-right: 15px;
    padding: 5px;
    gap: 10px;
}
.right-btns button{
    padding: 7px 3px;
}
.text-field.name{
    position: absolute;
    left: 25px;
    top: 7px;    
    height: 35px;
    width: 200px;
}
.text-field.name input{
    height: 30px;
    font-size: 25px;
    width: inherit;
}
.text-field.description input{
    width: 500px;
    font-size: 12px;
}
@media(max-width: 550px){
    .text-field.description input{
        width: 400px;
        font-size: 12px;
    }
}
@media(max-width: 420px){
    .text-field.description input{
        width: 380px;
        font-size: 12px;
    }
}
@media(max-width: 370px){
    .text-field.description input{
        width: 300px;
        font-size: 12px;
    }
}
</style>