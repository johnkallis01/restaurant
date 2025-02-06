<script setup>
const { items } = defineProps({items: {type: Map, required: true}});
</script>
<template>
    <div class="graph-container">
        <div class="names">
            <div v-for="([item, count], i) in items" :key="i" class="graphs">
                <div>
                    <div class="bars" :style="{'height': count +'px'}">
                        <div class="count">{{ count }}</div>
                    </div>
                    <div class="item-name">{{ item }}</div> 
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.graph-container{
    width: 900px;
    height: 80%;
    padding: 10px;
    border-radius: 0;
    border: 3px solid black;
    font-size: 12px;
    position: relative;
}
.count{
    position: relative;
    top: -18px;
}
.names{
    display: flex;
    align-content: center;
    flex-direction: row;
    gap: 5px;
    margin: 10px;
    position: relative;
    bottom: 0;
    height: 100%;
    border: 1px solid black;
}
.graphs{
    display: flex;
    align-items: center;
    gap: 10px;
    width: 50px;
    border: 1px solid black;
}
.bars{
    background-color: blue;
    gap: 5px;
    margin: 5px;
    width: 20px;
    position: absolute;
    bottom: 25%;
    text-align: center;
    align-items: center;
}
.item-name{
    display: flex;
    justify-content: flex-start;
    writing-mode: vertical-rl;
    width: 30px;
    align-items: center;
    text-align: center;
    height: 20%;
    overflow: hidden;
    position: absolute;
    border: 1px solid red;
    bottom: 0;
}
</style>