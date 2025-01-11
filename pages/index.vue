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
  background-image: url("https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/8b/88/31/fiddlers-green-restaurant.jpg?w=900&h=500&s=1");
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