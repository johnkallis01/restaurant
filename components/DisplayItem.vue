<script setup>
const {item,height}=defineProps({item: {type: Object, required: true}, height: {type: Number, required:false}});
const { formatPrice } = usePriceFormatter();
const containerRef=ref(null);
const titleRef=ref(null);
const contentRef=ref(null);
const getHeight=() => {
    if(containerRef.value?.offsetHeight<23) {
        if(titleRef.value) titleRef.value.style.borderRadius='5px';
        // console.log(height)
        // console.log(containerRef.value?.offsetHeight)
        // containerRef.value?.offsetHeight=height;
        // 
    }
}
// watch(()=>height,() => {
//     containerRef.value.offsetHeight=height;
// })
// watch(() => height, (newHeight) => {
//   if (contentRef.value) {
//     contentRef.value.style.height = `${newHeight}px`;
//   }
// });
// onMounted(() => {
//   if (contentRef.value && height) {
//     contentRef.value.style.height = `${height - 20}px`;
//   }
// });
onMounted(getHeight)
defineExpose({containerRef});
</script>
<template>
    <div class="item-container" ref="containerRef" :style="{height: height ? height + 'px' : 'auto'}">
       <div class="item-title" ref="titleRef">{{ height }}
            <div class="item-name">{{item.name+' x '+item.qty}}</div>
            <div class="item-price">{{formatPrice(item.price)}}</div>
       </div>
       <div class="content" ref="contentRef" >
            <div class="row" v-if="item.options.length">
                <div>{{ 'options: ' }}</div>
                <div v-for="op in item.options">
                    <span class="row-title">{{op.name + ": " }}</span>
                    <span>{{ op.choice.name }} {{ Number(op.choice.price) ? " "+formatPrice(op.choice.price): '' }}</span>
                </div>
            </div>
            <div class="row" v-if="item.addOns.length" >
                <h4>{{ 'addOns: ' }}</h4>
                <div v-for="ao in item.addOns">
                    <span class="row-title">{{ao.name}}</span>
                    <span>{{ Number(ao.price) ? " "+formatPrice(ao.price): '' }}</span>
                </div>
            </div>
            <div class="row" v-if="item.removes.length">
                <h4>{{ 'removes: ' }}</h4>
                <div v-for="r in item.removes">
                    <span class="row-title">{{r.name}}</span>
                </div>
            </div>
       </div>
    </div>
</template>
<style scoped>
.content{
    margin-left: 10px;
}
.item-container{
    width: 250px;
    height: fit-content;
    background-color: azure;
}
.item-title{
    padding: 0;
    border-radius: 5px 5px 0 0;
    background-color: rgb(202, 205, 205);
    width: 100%;
}
.item-name{
    margin: 0 0 0 8px;
    width: 200px;
    overflow: scroll;
    scrollbar-width: none;
}
.row-title{
    border-bottom: 1px solid black;
}

</style>