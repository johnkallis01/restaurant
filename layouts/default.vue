<script setup>
import { watchEffect } from 'vue';

useHead({
  title: "John's Restaurant"
})
const authStore = useAuthStore();

// Initialize the router and links
const router = useRouter();
const route = useRoute();
const menuLinks = ref([
  { to: "/edit/menus", title: "Edit Menus" },
  { to: "/orders", title: "List Orders" }
]);

// Function to navigate to a specific path
function navigate(path) {
  router.push(path);
};

const logout = () => {
  authStore.logout();
  navigateTo('/auth/login');
};
const loggedIn = computed(() => {
  return !!authStore.getToken;
})
const loginButton = ref(null);
const focusLoginButton = ()=>{
  if(loginButton.value) {
    loginButton.value.focus();
  }
}
provide('focusLoginButton', focusLoginButton);
</script>

<template>
  <div class="app">
    <!-- App Bar with Navigation Buttons -->
    <header class="header">
      <div class="header-links">
        <nuxt-link to="/">
          <button class="btn-link">Home</button>
        </nuxt-link>
        <nuxt-link to="/menus">
          <button class="btn-link">Menus</button>
        </nuxt-link>
        <nuxt-link to="/createOrder">
          <button class="btn-link">Order</button>
        </nuxt-link>
        <nuxt-link to="/test">
          <button class="btn-link">Test</button>
        </nuxt-link>
      </div>
      
      <!-- Right-side Menu with Dropdown -->
      <span class="right-btns">
        <client-only>
          <!-- Menu Button with Dropdown -->
          <span v-if="loggedIn">
            <button class="btn-link" @click="logout">Logout</button>
            <nuxt-link to="/edit/menus">
              <button class="btn-link">Edit Menu</button>
            </nuxt-link>
          </span>
          <span v-else>
            <nuxt-link to="/auth/login">
              <button class="btn-link" ref="loginButton">Login</button>
            </nuxt-link>
          </span>
        </client-only>
      </span>
    </header>

    <!-- Main Content Area -->
    <main class="main">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <span class="footer-text">John Kallis websites johnkallis01@gmail.com</span>
    </footer>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.app-bar {
  background-color: rgb(206, 240, 240);
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-btns{
  position: absolute;
  right: 0;
}

.v-card-title{
  background-color: green;
}

.main {
  background-image: url("https://i.pinimg.com/736x/e6/7d/af/e67daf68a6e8f6d4a9283cb7d64b098c.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
}
.name-label{
  background-color: red;
  padding-right: 5px;
}
.app {
  height: 100vh;
}
.btn-link{
  color: black;
  padding: 10px;
  margin: 10px;
  width: 8vw;
}
.btn-link:focus {
    border-bottom: 2px solid #166bad;
}
.btn-link:hover {
   box-shadow: 0 0 5px rgba(214, 227, 240, 0.5);
}
.right-btns{
  position: absolute;
  right: 0;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  background-color: rgb(208, 236, 243);
}
.main {
  background-image: url("https://t3.ftcdn.net/jpg/01/18/17/52/360_F_118175297_GZcJbKj0f4Jemq8EDIXIYbUFuTpoMwLT.jpg");
  background-size: cover;
  background-position: top left;
  background-repeat: repeat;
  height: 88vh;
}
.name-label{
  background-color: red;
  padding-right: 5px;
}
.footer {
  height: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
}
.footer-text {
  font-size: 12px;
}
</style>