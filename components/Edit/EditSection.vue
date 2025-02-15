<script setup>
// import { v4 as uuidv4 } from 'uuid';
const emit = defineEmits(['send-new-section-flag']);
const {section, menu} = defineProps({
    section: { type:Object, required: true},
    menu: { type:Object, required: true},
});
const menuStore = useMenuStore();
const localMenu = reactive(menu);
const localSection = reactive(section);
// const deleteModalFlag=ref(false); const addOptionsModalFlag=ref(false);
const nameInputRef=ref(null); const descriptionInputRef = ref(null);
const editName=ref(false); const editDescription = ref(false);
// const isNew = ref(false); const addItem = ref(false);
// const newItem = ref({
//         new: true,
//         name: "",
//         price: "000.00",
//         description: "",
//         addOns: [],
//         removes: [],
//         options: [],
//         position: 0,
//         _id: uuidv4(),
// });
// function updateMenu(){
//     const sectionIndex = menu.sections.findIndex(sec => sec._id === section._id);
//     localMenu.sections[sectionIndex]=localSection;
//     menuStore.updateMenu(localMenu);
// }
// function postSectionEdit(str){
//     switch(str){
//         case 'name':
//             editName.value=false;
//             break;
//         case 'description':
//             editDescription.value=false;
//             break;
//     }
//     if(!isNew.value){
//         updateMenu();
//     }
    
// }
// const getDelete=()=>{
//     deleteModalFlag.value=false;
//     deleteSection();
// }
// function deleteSection(){
//     const sectionIndex = menu.sections.findIndex(sec => sec._id === section._id);
//     localMenu.sections.splice(sectionIndex, 1);
//     menuStore.updateMenu(localMenu);
// }
function postNewSection(){
    if(localSection.name){
        localMenu.sections.push(localSection);
        menuStore.updateMenu(localMenu);
        emit('send-new-section-flag');  
    }
}
// function addNewItem(){
//     addItem.value=!addItem.value;
//     newItem.value = {
//         name: "",
//         price: "000.00",
//         description: "",
//         addOns: [],
//         removes: [],
//         options: [],
//         _id: uuidv4(),
//     }
// }
// const draggedEl=ref(null);
// const onItemDrag=(event, index, section_id,flag)=>{
//     event.stopPropagation();
//     console.log(flag)
//     event.dataTransfer.setData('itemData',JSON.stringify({index: index, sec_id: section_id}))
//     draggedEl.value={index:index, section_id:section_id};
    
//     // document.addEventListener('drop', onItemDrop, true)
    
//     // event.dataTransfer.dropEffect='move';
//     // event.dataTransfer.setData('index',index)
    
//     console.log('item ev',event)
//     console.log('oidrag',event,draggedEl.value)
// }
// const draggedEl=ref(null);
// const onItemDrop=(event, newIndex)=>{
//     event.stopPropagation();
    
//     console.log('onDrop',draggedEl.value)
//     // if(!draggedEl.value?.index && draggedEl.value?.sectionId) return;
//     // if(!draggedEl.value?.index) return;
//     // if(draggedEl.value?.section_id===sectionId){
//     const draggedItem = section.items[draggedEl.value];
//     localSection.items.splice(draggedEl.value, 1);
//     localSection.items.splice(newIndex,0,draggedItem);
//     localSection.items.forEach((item, i)=> item.position=i)
//     // }
//     // updateMenu();
//     draggedEl.value=null;
// }
// // const onItemDrop=(event, newIndex, sectionId, flag)=>{
// //     event.stopPropagation();
// //     console.log(flag)
// //     console.log('onDrop' ,draggedEl.value, newIndex, sectionId)
// //     const data=event.dataTransfer.getData('itemData');
// //     console.log(event)
// //     const parsedData=JSON.parse(data);
// //     const index = parsedData.index;
// //     console.log(parsedData.index, newIndex)
// //     console.log(parsedData.sec_id, sectionId)
// //     console.log(event)
// //     if(!parsedData?.index && parsedData?.sectionId) return;
// //     console.log('3')
// //     if(String(parsedData?.sec_id)==sectionId){
// //         console.log('1')
// //         const draggedItem = section.items[parsedData.index];
// //         console.log('5')
// //         localSection.items.splice(parsedData?.index, 1);
// //         console.log('8')
// //         localSection.items.splice(newIndex,0,draggedItem);
// //         console.log('9')
// //         localSection.items.forEach((item, i)=> item.position=i)
// //         console.log('done')
// //     }
// //     // updateMenu();
// //     // document.removeEventListener('drop', onItemDrop, true)
// //     draggedEl.value=null;
// // }

// const onTouchStart=(index, section_id)=>{
//     draggedEl.value={index,section_id };
//     console.log(draggedEl.value)
// }
// const droppedOnEl=ref(null);
// const onTouchMove = (event) => {
//     event.preventDefault(); // Prevent scrolling while dragging
//     const touch = event.touches[0];
//     let target = document.elementFromPoint(touch.clientX, touch.clientY);
//     // console.log('move',target)
//     droppedOnEl.value=target;
// };
// const onTouchEnd=()=>{
//     console.log(droppedOnEl)
//     if(droppedOnEl.value?.className){
//         let stop=0;
//         while(droppedOnEl.value?.className!=='item-container'){
//             droppedOnEl.value=droppedOnEl.value.parentElement;
//             console.log(droppedOnEl.value)
//             stop++;
//         }
//         let droppedOnIndex=Number(droppedOnEl.value.dataset.index);
//         let droppedOnSection=droppedOnEl.value.dataset.id;
//         console.log(droppedOnSection, droppedOnIndex)
//         if(droppedOnSection===draggedEl.value.section_id){
//             console.log(true)
//             const draggedItem = section.items[draggedEl.value.index];
//             localSection.items.splice(draggedEl.value.index, 1);
//             localSection.items.splice(droppedOnIndex,0,draggedItem);
//             localSection.items.forEach((item, i)=> item.position=i);
//         }      
//         // updateMenu();
//         draggedEl.value=null;
//         droppedOnEl.value=null;
//     }
// }
const focusDescriptionInput = useFocusInput(descriptionInputRef,editDescription);
const focusNameInput = useFocusInput(nameInputRef, editName);
const tabToDescription = useTabToInput(focusDescriptionInput);
// onMounted(()=>{if(!localSection.name){isNew.value = true;focusNameInput();}})
onMounted(()=>{focusNameInput();})

// watch([addOptionsModalFlag,deleteModalFlag], (o) => {
//      if(o) {
//         document.addEventListener('dragstart', stopDrag, true);
//         document.addEventListener('touchstart', stopDrag, true);
//         document.addEventListener('touchmove', stopDrag, true);
//      }
//      else{ 
//         document.removeEventListener('dragstart', stopDrag, true);
//         document.removeEventListener('touchstart', stopDrag, true);
//         document.removeEventListener('touchmove', stopDrag, true);
//     }
//  })
// const stopDrag=(event)=>{
//      event.preventDefault();
// }
</script>
<template>
    <div class="section-container">
        <div class="section-name">
            <span class="left-btns">
                <!-- <button class="btn delete" @click="postNewSection()" v-if="isNew"> -->
                <button class="btn delete" @click="postNewSection()">
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add section</span>
                </button>
                <!-- <button class="btn delete" @click="deleteModalFlag=true" v-else>
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete section</span>
                </button> -->
                <template v-if="editName">
                    <div class="text-field name">
                        <input
                            type="text"
                            ref="nameInputRef"
                            v-model="localSection.name"
                            @blur="editName=false"
                            @keydown.enter="postNewSection()"
                            @keydown="tabToDescription"
                        /><!--
                        @blur="isNew ? editName=false : postSectionEdit('name')"
                        @keydown.enter="isNew ? postNewSection() : postSectionEdit('name')"
                        -->
                    </div>
                </template>
                <template v-else>
                    <span @click="focusNameInput" v-if="localSection.name">{{ localSection.name }}</span>
                    <span class="placeholder-color" @click="focusNameInput" v-else>name</span>
                </template>
            </span>
            <!-- <div class="right-btns">
                <button class="btn" @click="addOptionsModalFlag=true" v-if="!isNew">
                    <span>options</span>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add options to all items</span>
                </button> 
                <button class="btn" @click="addNewItem()" v-if="!isNew">
                    <span>item</span>
                    <i class="mdi mdi-plus"/>
                    <span class="tooltip">add item</span>
                </button>
            </div> -->
        </div>
        <div class="section-description">
            <template v-if="editDescription">
                <div class="text-field description">
                    <input
                        type="text"
                        ref="descriptionInputRef"
                        v-model="localSection.description"
                        @blur="editDesciption=false"
                        @keydown.enter="localSection.name ? postNewSection() : editDesciption=false;focusNameInput();"
                    /> <!--
                    @blur="isNew ?  editDesciption=false : postSectionEdit('description')"
                        @keydown.enter="isNew ? (localSection.name ? postNewSection() : editDesciption=false) : postSectionEdit('description')"
                    -->
                </div>
            </template>
            <template v-else>
                <span @click="focusDescriptionInput" v-if="localSection.description">{{ localSection.description }}</span>
                <span  class="placeholder-color" @click="focusDescriptionInput" v-else>description</span>
            </template>
        </div>
        <!-- <div class="section-items">
            <EditItem
                v-if="addItem"
                :item="newItem"
                :section_id="localSection._id"
                :menu="localMenu"
                @send-new-item-flag="addItem=false"/>
            <EditItem
                ref="item"
                v-for="(item,i) in localSection.items"
                :key="item._id"
                :item="item"
                :section_id="localSection._id"
                :menu="localMenu"
                :data-index="i"
                :data-id="localSection._id"
                @touchstart="onTouchStart(i, localSection._id)"
                @touchmove="onTouchMove($event)"
                @touchend="onTouchEnd($event)"
                draggable="true"
                
            />
    @dragstart="draggedEl=i"
                @dragover.prevent
                @drop="onDrop($event, i)"             
            onItemDrag($event, i, localSection._id)    
                 -->
  <!--      </div> 
        <div class="modalWrapper" v-if="addOptionsModalFlag">
            <ModalAddOptions class="modal options" :menu="localMenu" :item="localSection" @close-modal="addOptionsModalFlag=false"/>
        </div>
        <div class="modalWrapper" v-if="deleteModalFlag">
            <ModalDelete class="modal delete" :item="localSection" itemType="Section" @close-modal="deleteModalFlag=false" @delete-item="getDelete"/>
        </div>-->
    </div>
</template>
<style scoped>
.btn.delete{
    padding: 3px;
    margin: 0px 4px;
}
.modal{
    position: relative;
    width: 70%;
    height: 300px;
    left: 15%;
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
.modal.delete{
    height: 35vh;
    width: 40vw;
    left: 30vw;
    top: 40vh;
}
@media(max-width: 600px){
    .modal.options{
        width: 100vw;
        left: 0;
    }
}
</style>