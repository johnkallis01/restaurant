<script setup>
const { items, title, weekly } = defineProps({items: {type: Map, required: true},
    title: {type: String, required: true}, weekly:{type:Boolean, required: false, default: false}});
const heightRatio=computed(() => {
    if(weekly) return 3.5;
    else return 1.2;
})
const bars=ref([]);
const beforeEnter=(el) => {
    el.style.height='0px';
    el.style.transition = "height 0.8s ease-in-out";
}
const enter = async (el, done) => {
    await nextTick();
    let index = Array.from(bars.value).indexOf(el);
    if(index===-1) return;
    let newHeight = Math.floor(bars.value[index].firstChild.innerHTML/heightRatio.value);
    requestAnimationFrame(() => {
        el.style.height=`${newHeight}px`; 
    });
    // el.style.height=`${newHeight}px`;
    // done();
}
</script>
<template>
    <div class="outside-graph">
    <div class="title">{{title}}</div>
    <div class="graph-container">
        <div class="left-axis-title">Number of Items Sold</div>
        <div class="graph-body">
            <div class="bottom-border"></div>
            <div v-for="([item, count], i) in items" :key="i" class="graphs">
                <div>
                    <ClientOnly>
                        <Transition @before-enter="beforeEnter" @enter="enter" appear>
                            <div class="bars" ref="bars">
                                <div class="count">{{ count }}</div>
                            </div>
                        </Transition>
                    </ClientOnly>
                    <div class="item-name">
                        <span class="name-text">{{ item }}</span>
                        <span class="tooltip">{{ item }}</span>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    <div class="bottom-axis-title">Item Names</div>
    </div>
</template>
<style scoped>
.bars{
    background-color: blue;
    margin: 5px;
    width: 20px;
    position: absolute;
    bottom: 76px;
    text-align: center;
    align-items: center;
}
.bottom-border{
    border: 1px solid black;
    position: absolute;
    bottom: 80px;
    left: 0;
    width: 100%;
}
.bottom-axis-title{
    position: absolute;
    bottom: 0;
}
.outside-graph{  
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    left: 0;
    top: 0;
    height: 430px;
    width: 1000px;
    font-size: 12px;
    background-color: rgb(247, 249, 252);
    overflow: auto;
}
.left-axis-title{
    position: absolute;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    right: 925px;
    top: 100px;
}
.graph-container{
    width: 950px;
    height: 390px;
    padding: 20px;
    border-radius: 0;
    position: absolute;
    left: 0;
    top:0;
}
.count{
    position: relative;
    top: -18px;
}
.title{
    position: absolute;
    top: 0;
    margin: 3px;
}
.graph-body{
    display: flex;
    align-content: center;
    flex-direction: row;
    padding: 0 20px 0 0px;
    height: 350px;
    position: absolute;
    bottom: 0;
}
.graphs{
    display: flex;
    align-items: center;
    width: 30px;
}
.name-text{
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
}
.item-name{
    display: flex;
    justify-content: flex-end;
    white-space: none;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    width: 30px;
    align-items: center;
    height: 80px;
    text-wrap: nowrap;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    cursor: default;
}
</style>