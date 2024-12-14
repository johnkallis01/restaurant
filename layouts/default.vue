<template>
    <v-layout id="app">
        <v-app-bar app id="app-bar">
            <template>
                <div id="header">
                    <v-btn to="/">Home</v-btn>
                    <v-btn to="/createOrder">Order</v-btn>
                    <v-btn to="/menu">Menu</v-btn>
                </div>
            </template>
                <template v-slot:append>
                    <v-btn to="/editMenu">Edit Menu</v-btn>
                </template>
        </v-app-bar>
        <v-main app id="main">
            <NuxtPage/>
        </v-main>
        <v-footer app id="footer">
            <span id="footer-text">John Kallis websites jtkallis@gmail.com</span>
        </v-footer> 
    </v-layout>
</template>
<style>
/* Ensure the entire app layout uses flexbox for full height */
#app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height of the viewport */
}
#app-bar {
    background-color: azure;
}
#header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1; /* Fills the available space in the app-bar */
}
#header > .v-btn {
  margin: 0 10px; /* Adds spacing between buttons */
}
#main {
    display: flex; /* Ensure flexbox for alignment */
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-grow: 1; /* Allows #main to grow and fill the space between app-bar and footer */
    box-sizing: border-box; /* Include border in dimensions */
}
#footer {
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center; /* Vertical center alignment */
    background-color: lightgray;
}
#footer-text {
    overflow: auto;
    font-size: small;
}
</style>