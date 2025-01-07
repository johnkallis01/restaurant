<script setup>
import { onMounted } from 'vue';

useHead({
  title: "John's Restaurant"
})
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const logout = () => {
  authStore.logout();
  router.push('/auth/login');
};
const loggedIn = computed(() => {
  return !!authStore.getToken;
});
const loginButton = ref(null);
const focusLoginButton = ()=>{
    loginButton?.value.focus();
}
provide('focusLoginButton', focusLoginButton);

const focusLogin = () =>{
  console.log('fL', loggedIn.value)
  if(!loggedIn.value) {
    console.log('not loggedIN')
    loginButton.value.focus();
  }
}
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
          <button class="btn-link" @click="focusLogin">Order</button>
        </nuxt-link>
        <nuxt-link to="/test">
          <button class="btn-link" @click="focusLogin">Test</button>
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
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: red;
}
.header-links{
  position: relative;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 10vh;
  background-color: rgb(208, 236, 243);
}
.right-btns{
  position: absolute;
  right: 0;
}
.btn-link{
  color: black;
  padding: 10px;
  margin: 10px;
  width: 10vw;
}
.btn-link:focus {
    border-bottom: 2px solid #166bad;
}
.btn-link:hover {
   box-shadow: 0 0 5px rgba(214, 227, 240, 0.5);
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  position: absolute;
  top: 10vh;
  left: 0;
  background-size: cover;
  background-position: top left;
  background-repeat: no-repeat;
  background-image: url("https://i.pinimg.com/736x/e6/7d/af/e67daf68a6e8f6d4a9283cb7d64b098c.jpg");
}
</style>