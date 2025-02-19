<script setup>
const {menu,order} = defineProps({
    menu: {type: Object, required: true},
    order: {type: Boolean, required: true}});
const { formatPrice } = usePriceFormatter();
const modalFlag=ref(false);
const modalItem = ref();
const sectionItemsRef=ref([]);
const itemDescRef=ref([]);
const itemHeight=ref([]);
const { detachObject } = useDetachObject();
const displayModal=(item,ops)=>{
    // console.log(item.options)
    const detachItem=detachObject(item);
    modalItem.value={...detachItem, options: [...detachItem.options.map((op)=> ({...op, choice: []})).concat(ops.map((op)=>({...op, choice: []})))]};
    // console.log(modalItem.value)
    modalFlag.value=true;
}
const setItemHeights=() => { 
    if(!itemDescRef.value.length) return;
    // console.log(itemDescRef.value)
    //item max-height: 80px;
    //item name height: 20px;
    //item desc lin height: ~15px
    let screenWidth=window?.innerWidth;
    itemHeight.value=[];
    if(order && screenWidth>=600){
        //full width -> 3x >800px
        //  840px -> 2x <800px
        // 740px -> 1x <600px
        let rowLength;
        let itemIndex=0;
        for(let i=0; i<menu.sections.length;i++){//sections i
            if(sectionItemsRef.value){
                let sectionElStyle=window.getComputedStyle(sectionItemsRef.value[i]);
                let gridTemplate = sectionElStyle.getPropertyValue('grid-template-columns')
                gridTemplate=gridTemplate.split(' ');
                rowLength=gridTemplate.length;
            }
            let numberOfRows=Math.ceil(menu.sections[i].items.length/rowLength);
            for(let j=0; j< numberOfRows; j++){ //j number of rows
                let tallest=0;
                let remainder=menu.sections[i].items.length%rowLength;
                Math.ceil(menu.sections[i].items.length/rowLength)-1===j && remainder!==0 ? rowLength=remainder : null;
                for(let k=0;k<rowLength; k++){ //row 0,1,2
                    (tallest < itemDescRef.value[itemIndex].offsetHeight)?  tallest=itemDescRef.value[itemIndex].offsetHeight : null;
                    itemIndex+=1;
                }
                for(let k=0;k<rowLength; k++){ 
                    if (tallest < 20) itemHeight.value.push(40); //0-1 lines
                    else if (tallest < 28) itemHeight.value.push(52); //2lines
                    else if (tallest < 42) itemHeight.value.push(67);//3 lines
                    else itemHeight.value.push(80);//4+ lines
                }
            } 
        }
    }else{
        itemDescRef.value.forEach(item=>{
            let height = item.offsetHeight;
            // console.log(height)
            //set all heights to tallest
            if (height === 0)itemHeight.value.push(30);
            else if (height < 20) itemHeight.value.push(40);
            else if (height < 28) itemHeight.value.push(52);
            else if (height < 42) itemHeight.value.push(67);
            else itemHeight.value.push(76);
        })                
    } 
}    
const findIndex=(secIn,itIn) => { //find length of all sections before item index;add item index to sections;
    return menu.sections.slice(0,secIn).reduce((index, section)=>index + section.items.length,0)+itIn;
}
onBeforeMount(() => {
    itemDescRef.value.length=0;
});
const windowWidth = ref(window?.innerWidth);
const updateWidth = () => { windowWidth.value = window?.innerWidth;};
onMounted(() => { 
    nextTick(setItemHeights);
    window.addEventListener("resize", updateWidth);
    window.addEventListener("orientationchange", updateWidth);
    window.addEventListener("change", updateWidth);

});
onUnmounted(() => {
    window.removeEventListener("resize", updateWidth);
    window.removeEventListener("orientationchange", updateWidth);
    window.removeEventListener("change", updateWidth);
});
watch(windowWidth, () => {
    nextTick(setItemHeights);
});
const { sortByPosition } = useSortByPosition();
</script>
<template>
    <div class="menu-container">
        <div class="schedule">
            <DisplaySchedule :menuDays="menu.days" v-if="!order && menu"/>
        </div>
        <div class="section-container"
            v-for="(section,i) in sortByPosition(menu.sections)" :key="section._id"
            v-if="menu">
            <div class="section-name">{{ section.name }}</div>
            <div class="section-description" :class="{'add-margin': order && !section.description.length}">{{ section?.description}}</div>
            <div class="section-items" :class="{'disabled': !order}" ref="sectionItemsRef">
                <button  class="item-container" :disabled="!order"
                    v-for="(item,j) in sortByPosition(section.items)" :key="item._id"
                    @click="displayModal(item, section.options)"
                    :style="{ height: `${itemHeight[findIndex(i,j)]}px` }"
                    >
                    <div class="item-title">
                        <span class="item-name" :class="{'disabled': !order}">{{ item.name}}</span>
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
.add-margin{
    margin-top: 5px;
}
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
    color: black;
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
</style>