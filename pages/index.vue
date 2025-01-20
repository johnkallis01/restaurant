<template>
  <div class="restaurant-container">
      <div class="rest-info">
          <h1>John's Restaurant</h1><br/>
          <p>Phone: 667-940-8868 </p>
          <p>johnkallis01@gmail.com</p>
      </div>
    </div>
</template>
<script>
export default {
data(){
    return{}
}
}
</script>
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
  color: white;
  background-color: green; 
  padding: 50px;
  text-align: center;
  border-radius: 8px; 
}
</style>