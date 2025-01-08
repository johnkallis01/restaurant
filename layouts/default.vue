<script setup>
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
      <div class="right-btns">
        <client-only>
          <!-- Menu Button with Dropdown -->
          <div v-if="loggedIn">
            <button class="btn-link" @click="logout">Logout</button>
            <nuxt-link to="/edit/menus">
              <button class="btn-link">Edit Menu</button>
            </nuxt-link>
          </div>
          <div v-else>
            <nuxt-link to="/auth/login">
              <button class="btn-link" ref="loginButton">Login</button>
            </nuxt-link>
          </div>
        </client-only>
      </div>
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
  display: flex;  /* Make sure the links are laid out in a row */
  justify-content: flex-start;  /* Align to the left */
  gap: 20px;
}
.header {
  position: relative;
  display: flex;
  justify-content: space-between;  /* Ensure the links are spaced evenly */
  align-items: center;  /* Vertically center the content */
  height: 10vh;
  background-color: rgb(208, 236, 243);
  padding: 0 20px;  /* Add some padding for the header */
  box-sizing: border-box;;
  overflow-x: visible;
}
.right-btns{
  display: flex;
  justify-content: flex-end;  /* Align the buttons to the right */
  gap: 10px;
}
.btn-link{
  color: black;
  padding: 10px;
  margin: 10px;
  width: 10vw;
  height: 3vw;
  text-overflow: hidden;
  white-space: nowrap;
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
@media (max-width: 740px) {
  .btn-link{
  color: black;
  width: 8vw;
  height: 3vw;
  text-overflow: hidden;
  white-space: nowrap;
}
}
</style>