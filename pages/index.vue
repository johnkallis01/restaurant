<template>
        <v-card image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/8b/88/31/fiddlers-green-restaurant.jpg?w=900&h=500&s=1" id="restaurant-container">
            <div id="rest-info">
                <v-card-title>John's Restaurant</v-card-title>
                <v-card-subtitle>Phone: 667-940-8868 </v-card-subtitle>  
            </div>
        </v-card>
</template>
<script>
export default {
data(){
    return{}
}
}
</script>
<style>
#restaurant-container {
  display: flex; /* Enable flexbox */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative; /* Required for absolute positioning inside */
}

#rest-info {
  color: white;
  background-color: green; /* Solid green background */
  padding: 20px; /* Adds space around the text */
  position: absolute; /* Position relative to the parent container */
  top: 20%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust for exact centering */
  z-index: 10; /* Ensure it's above the image */
  text-align: center; /* Center text inside the box */
  border-radius: 8px; /* Optional: Adds rounded corners */
}

#rest-info .v-card-title {
  font-size: 36px; /* Make title larger */
  margin-bottom: 10px; /* Space between title and subtitle */
}

.v-card__image {
  object-fit: cover; /* Ensures the image fills the card area */
}
</style>