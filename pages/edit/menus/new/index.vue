<script setup>
useHead({
  title: "John's Restaurant - Edit Menu"
});
definePageMeta({middleware: ['admin','auth']});
const newMenu = reactive({
  "name":"",
  "days":[
    {"day":{"name":"Sunday","position":0},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Monday","position":1},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Tuesday","position":2},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Wednesday","position":3},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Thursday","position":4},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Friday","position":5},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false},
    {"day":{"name":"Saturday","position":6},"open":false,"start":{"hour":0,"min":0,"pm":false},"end":{"hour":0,"min":0,"pm":false},"error":false}],
  "sections":[]
});
</script>
<template>
  <div class="new-menu-page">
    <div class="title"> Create Menu </div>
    <EditMenuTimes :menu="newMenu" :isNew="true"/>
  </div>
</template>
<style scoped>
.new-menu-page{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 10px;
  width: 60vw;
  background-color: azure;
}
.title{
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid black;
}
@media(max-width: 800px) {
  .new-menu-page{
    width: 90vw;
    left: 5vw;
    border-radius: 0px;
    overflow: auto;
    /* border: 1px solid red; */
  }
}

@media(max-width: 600px) {
  .new-menu-page{
    width: 100vw;
    border-radius: 0px;
    overflow: auto;
    /* border: 1px solid red; */
  }
}
</style>