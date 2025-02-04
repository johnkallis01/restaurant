<script setup>
useHead({
  title: "John's Restaurant - Edit Menu"
});
definePageMeta({middleware: ['admin','auth']});
// definePageMeta({middleware: ['auth']});
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
  <div class="new-menu-container">
    <div class="title"> Create Menu </div>
    <EditMenuTimes :menu="newMenu" :isNew="true"/>
  </div>
</template>
<style scoped>
.new-menu-container{
  background-color: azure;
  border-radius: 10px;
  width: 60vw;
}
.title{
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid black;
}
</style>