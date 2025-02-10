<script setup>
import { onMounted } from 'vue';

const {menu,order} = defineProps({
    menu: {type: Object, required: true},
    order: {type: Boolean, required: true}});

const localMenu=reactive(menu);

const { formatPrice } = usePriceFormatter();
const modalFlag=ref(false);
const modalItem = ref();
const sectionItemsRef=ref([]);
const itemRef=ref([]);
const itemDescRef=ref([]);
const newHeight=ref([])
const { detachObject } = useDetachObject();
const displayModal=(item,ops)=>{
    // console.log(item.options)
    const detachItem=detachObject(item);
    modalItem.value={...detachItem, options: [...detachItem.options.map((op)=> ({...op, choice: []})).concat(ops.map((op)=>({...op, choice: []})))]};
    // console.log(modalItem.value)
    modalFlag.value=true;
}
const fixItemHeights=() => { 
    //item max-height: 80px;
    //item name height: 20px;
    //item desc lin height: ~15px


    // if(!itemDescRef.value || itemDescRef.value.length===0) return;
    newHeight.value=[];
        if(order){
            // let screenWidth=window.innerWidth;
            // //full width -> 3x 280px
            // //  840px -> 2x 300px
            // // 740px -> 1x 400px
            // let rowLength;
            // if(screenWidth<741) rowLength=1;
            // else if(screenWidth<841) rowLength=2;
            // else rowLength=3;
            // let itemIndex=0;
            // for(let i=0; i<menu.sections.length;i++){//sections i
            //     for(let j=0; j< Math.ceil(menu.sections[i].items.length/rowLength); j++){ //j number of rows
            //         let tallest=0;
            //         let remainder=menu.sections[i].items.length%rowLength;
            //         if(Math.ceil(menu.sections[i].items.length/rowLength)-1===j && remainder!==0){
            //             for(let k=0;k<remainder;k++){
            //                 console.log(itemDescRef.value[itemIndex].offsetHeight)
            //                 itemIndex+=1;
            //             }
            //         }else{
            //             for(let k=0;k<rowLength; k++){ //row 0,1,2
            //                 console.log(itemDescRef.value[itemIndex].offsetHeight)
            //                 // if(tallest < itemDescRef[itemIndex].offsetHeight){
            //                 //      tallest=itemDescRef[itemIndex].offsetHeight;
            //                 // }
            //                 itemIndex+=1;
            //             }
            //         }
            //         //set all heights to tallest
            //         if (tallest === 0) {
            //             // console.log("push 20");
            //             for(let k=0;k<rowLength;k++){
            //                 newHeight.value.push(20);
            //             } 
            //         } else if (tallest < 20) {
            //             // console.log("push 38");
            //             for(let k=0;k<rowLength;k++){
            //                 newHeight.value.push(40);
            //             } 
            //         } else if (tallest < 28) {
            //             // console.log("push 50");
            //             for(let k=0;k<rowLength;k++){
            //                 newHeight.value.push(52);
            //             } 
            //         } else if (tallest < 42) {
            //             // console.log("push 65");
            //             for(let k=0;k<rowLength;k++){
            //                 newHeight.value.push(67);
            //             } 
            //         } else {
            //             // console.log("push 80");
            //             for(let k=0;k<rowLength;k++){
            //                 newHeight.value.push(80);
            //             } 
            //         }
            //     } 
            // };
        }else{
            // menu.sections.forEach(section=>{
            //     section.items.forEach(item=>{
            itemDescRef.value.forEach(item=>{

            // })
                    let height = item.offsetHeight;
                    console.log(height)
                    //set all heights to tallest
                    if (height === 0) {
                        // console.log("push 20");
                        newHeight.value.push(20);
                    } else if (height < 20) {
                        // console.log("push 38");
                        newHeight.value.push(40);
                    } else if (height < 28) {
                        // console.log("push 50");
                        newHeight.value.push(52);
                    } else if (height < 42) {
                        // console.log("push 65");
                        newHeight.value.push(67);
                    } else {
                        // console.log("push 80");
                        newHeight.value.push(80);
                    }
            //     })
            })
            
            
                 
        } 
        // console.log(newHeight.value)
}
    
    
const findIndex=(secIn,itIn) => { //find length of all sections before item index;add item index to sections;
    return menu.sections.slice(0,secIn).reduce((index, section)=>index + section.items.length,0)+itIn;
}
onMounted(async () => {
    await nextTick();
    requestAnimationFrame(() => {
        fixItemHeights();
    });
});
</script>
<template>
    <div class="menu-container">
        <div class="schedule">
            <DisplaySchedule :menuDays="menu.days" v-if="!order && menu"/>
        </div>
        <div class="section-container"
            v-for="(section,i) in menu.sections" :key="section._id"
            v-if="menu">
            <div class="section-name">{{ section.name }}</div>
            <div class="section-description">{{ section?.description }}</div>
            <div class="section-items" :class="{'disabled': !order}" ref="sectionItemsRef">
                <button  class="item-container" :disabled="!order" ref="itemRef"
                    v-for="(item,j) in section.items" :key="item._id"
                    :style="{ height: newHeight[findIndex(i,j)] + 'px' }"
                    @click="displayModal(item, section?.options)"
                    >
                    <div class="item-title" :class="{'disabled': !order}">
                        <span class="item-name" :class="{'disabled': !order}">{{ item.name }}</span>
                        <span class="item-price" :class="{'disabled': !order}">{{ formatPrice(item.price) }}</span>
                    </div>
                    <div class="item-description" ref="itemDescRef">{{ item.description }}</div>
                </button>
            </div>
        </div>
        <div v-else>{{ "Loading..." }}</div>
        <div class="modalWrapper" v-if="modalFlag">
            <div class="modal" >
                <ModalSelectItem :item="modalItem" :menu="menu" @close-modal="()=>modalFlag=false"/> 
            </div>
        </div>
    </div>
</template>
<style scoped>
.item-container:focus{
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.5);
}
.section-container{
    cursor: default;
}
.section-items button{
  cursor: pointer;
}
.disabled button{
    cursor: default;
    border: none;
}
.item-name.disabled{
    font-weight: 600;
    width: 60%;
    margin-left: 10px;
}
.schedule{
    display: flex;
    justify-content: center;
    width: 100%;
}
@media (max-width: 600px){
    .item-container{
        height: 60px;
        /* overflow: hidden; */
    }
    .item-description{
        height: 30px;
        overflow: scroll;
    }
}
</style>