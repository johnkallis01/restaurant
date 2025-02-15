<script setup>
const { items, title, weekly } = defineProps({items: {type: Map, required: true},
    title: {type: String, required: true}, weekly:{type:Boolean, required: false, default: false}});
const heightRatio=computed(() => {
    if(weekly) return 2;
    else return 1;
})
const bars=ref([]);

const beforeEnter=(bar) => {
    bar.style.height='0px';
}
const enter=(bar) => {
    let index =bars.value.indexOf(bar);
    if(index===-1) return;
    let height = Math.floor(bars.value[index].firstChild.innerHTML/heightRatio.value);
    requestAnimationFrame(() => {
        bar.style.transition = `height ${Math.sqrt(height)/7}s ease-in-out`;
        bar.style.height=`${height}px`; 
    });
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
                
                        <Transition @before-enter="beforeEnter" @enter="enter" appear>
                            <div class="bars" ref="bars">
                                <div class="count">{{ count }}</div>
                            </div>
                        </Transition>
                        <div class="item-name">
                            <span class="name-text">{{ item }}</span>
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
    width: 15px;
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
    position: absolute;
    left: 0;
    top: 0;
    height: 94vh;
    width: 100%;
    padding: 5px;
    font-size: 12px;
    background-color: rgb(247, 249, 252);
    overflow: auto;
    /* border: 2px solid red;
    box-sizing: border-box; */
}
.left-axis-title{
    position: absolute;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    left: 16x;
    top: 100px;
    font-size: 16px;
    width: 20px;
    height: 170px;
}
.graph-container{
    width: 98vw;
    height: 95vh;
    padding: 20px;
    border-radius: 0;
    position: relative;
    left: 30px;
    top:0;
    overflow: auto;
    /* border: 1px solid green;
    box-sizing: border-box; */
}
.count{
    position: relative;
    top: -18px;
    font-size: 8px;
}
.title{
    position: absolute;
    top: 0;
    font-size: 16px;
}
.graph-body{
    display: flex;
    align-content: center;
    flex-direction: row;
    padding: 0 20px 0 0px;
    height: 80vh;
    width: 90vw;
    position: absolute;
    top: 15px;
    left: 40px;
}
.graphs{
    display: flex;
    justify-content: center;
    width: 20px;
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
@media(max-width: 700px){
    .item-name{
        bottom: 30px;
    }
    .graphs{
        width:10px;
    }
    .bars{
        bottom: 107px;
        width: 5px;
    }
    .bottom-border{
        bottom: 110px;
    }
    .count{
       opacity: 0;
    }
    .title{
        text-wrap: wrap;
        text-align: center;
        display: flex;
        justify-content: center;
        width: 200px;
    }
}
</style>