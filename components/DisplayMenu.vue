<script setup>
import { onActivated, onBeforeMount, onMounted } from 'vue';

const {menu,order} = defineProps({
    menu: {type: Object, required: true},
    order: {type: Boolean, required: true}});

const localMenu=reactive(menu);

const { formatPrice } = usePriceFormatter();
const modalFlag=ref(false);
const modalItem = ref();
const sectionItemsRef=ref([]);
const itemDescRef=ref([]);
const newHeight=ref([])
const { detachObject } = useDetachObject();
const displayModal=(item,ops)=>{
    console.log(item.options)
    const detachItem=detachObject(item);
    modalItem.value={...detachItem, options: [...detachItem.options.map((op)=> ({...op, choice: []})).concat(ops.map((op)=>({...op, choice: []})))]};
    // console.log(modalItem.value)
    modalFlag.value=true;
}

const fixItemHeights=() => { 
    console.log(itemDescRef.value)
    //item max-height: 80px;
    //item name height: 20px;
    //item desc lin height: ~15px
    let screenWidth=window?.innerWidth;
    newHeight.value=[];
    if(order && screenWidth>740){
        //full width -> 3x 280px
        //  840px -> 2x 300px
        // 740px -> 1x 400px
        let rowLength;
        let itemIndex=0;
        for(let i=0; i<menu.sections.length;i++){//sections i
            // console.log(itemDescRef.value[0])
            if(screenWidth<971) rowLength=2;
            else rowLength=3;
            // console.log('num of rows',rowLength)
            let numberOfRows=Math.ceil(menu.sections[i].items.length/rowLength);
            for(let j=0; j< numberOfRows; j++){ //j number of rows
                let tallest=0;
                let remainder=menu.sections[i].items.length%rowLength;
                if(Math.ceil(menu.sections[i].items.length/rowLength)-1===j && remainder!==0){
                    rowLength=remainder;
                    // console.log('rl=%', rowLength)
                }
                // console.log('rl',rowLength)
                for(let k=0;k<rowLength; k++){ //row 0,1,2
                    // console.log(itemDescRef.value[itemIndex],itemDescRef.value[itemIndex].offsetHeight)
                    if(tallest < itemDescRef.value[itemIndex].offsetHeight) tallest=itemDescRef.value[itemIndex].offsetHeight;
                    // console.log('itIndex',tallest)
                    itemIndex+=1;
                }
                for(let k=0;k<rowLength; k++){ 
                    if (tallest < 20) { //0-1 lines
                        // console.log("push 38");
                        newHeight.value.push(40);
                    } else if (tallest < 28) { //2 lines
                        // console.log("push 50");
                        newHeight.value.push(52);
                    } else if (tallest < 42) { //3 lines
                        // console.log("push 65");
                        newHeight.value.push(67);
                    } else { //4+ lines
                        // console.log("push 80");
                        newHeight.value.push(80);
                    }
                }
                //set all heights to tallest
            } 
        };
    }else{
        itemDescRef.value.forEach(item=>{
            let height = item.offsetHeight;
            // console.log(height)
            //set all heights to tallest
            if (height === 0) {
                // console.log("push 20");
                newHeight.value.push(30);
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
                newHeight.value.push(76);
            }
        })                
    } 
    // console.log(newHeight.value)
}    
const findIndex=(secIn,itIn) => { //find length of all sections before item index;add item index to sections;
    return menu.sections.slice(0,secIn).reduce((index, section)=>index + section.items.length,0)+itIn;
}
onMounted(async () => {
    await nextTick();
    fixItemHeights();
});
onBeforeMount(() => {
    itemDescRef.value.length=0;
})
onActivated(async() => {
    await nextTick();
    fixItemHeights();
})
const windowWidth = ref(window?.innerWidth);
const updateWidth = () => { windowWidth.value = window?.innerWidth;};
onMounted(() => { 
    window.addEventListener("resize", updateWidth);
    window.addEventListener("orientationchange", updateWidth);
    window.addEventListener("change", updateWidth);

});
onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
    window.removeEventListener("orientationchange", updateWidth);
    window.removeEventListener("change", updateWidth);
});
watch(windowWidth, () => {fixItemHeights();});
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
                <button  class="item-container" :disabled="!order"
                    v-for="(item,j) in section.items" :key="item._id"
                    @click="displayModal(item, section.options)"
                    :style="{ height: `${newHeight[findIndex(i,j)]}px` }"
                    >
                    <div class="item-title">
                        <span class="item-name" :class="{'disabled': !order}">{{ item.name }}</span>
                        <span class="item-price">{{ formatPrice(item.price) }}</span>
                    </div>
                    <div class="item-description" ref="itemDescRef">{{ item.description }}</div>
                </button>
            </div>
        </div>
        <div v-else>{{ "Loading..." }}</div>
        <div class="modalWrapper" v-if="modalFlag">
            <div class="modal select">
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
@media (max-width: 920px){
    .modal.select{
        width: 90vw;
        left: 5vw;
    }
}
@media (max-width: 800px){}
@media (max-width: 600px){
    .modal.select{
        width: 98vw;
        left: 3vw;
        right: 0;
    }
}
</style>