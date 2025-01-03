<template>
  <div class="restaurant-container">
      <v-card class="rest-info">
          <v-card-title>John's Restaurant</v-card-title>
          <v-card-subtitle>Phone: 667-940-8868 </v-card-subtitle>  
      </v-card>
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green; 
  padding: 100px;
  text-align: center;
  border-radius: 8px; 
}
</style>