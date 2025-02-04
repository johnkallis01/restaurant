<script setup>
useHead({
  title: "John's Restaurant - Home"
});
const title=ref("John's Restaurant")
const info=ref(['Phone: 667-940-8868','johnkallis01@gmail.com'])
</script>
<template>
  <div class="restaurant-container">
      <div class="rest-info">
          <h1>{{ title }}</h1><br/>
          <p v-for="(val,i) in info">{{ val }}</p>
          <p></p>
      </div>
    </div>
</template>
<style>
.restaurant-container {
  background-image: url("https://thumbs.dreamstime.com/b/night-scene-empty-table-restaurant-background-ads-featuring-wooden-foreground-blurred-under-lights-setting-provides-337072366.jpg");
  background-size: cover;
  background-position: center;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width: 100%;
  height: 100%;
}
.rest-info {
  position: relative;
  top: 2vh;
  color: white;
  background-color: green; 
  padding: 50px;
  text-align: center;
  border-radius: 8px;  
  width: 40vw;
  height: 50vh;
}
</style>