<script setup>
const authStore = useAuthStore();

// Initialize the router and links
const router = useRouter();
const menuLinks = ref([
  { to: "/edit/menus", title: "Edit Menus" },
  { to: "/edit/sections", title: "Edit Sections" },
  { to: "/edit/items", title: "Edit Items" },
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

// State for menu visibility
const menuVisible = ref(false);
</script>

<template>
  <v-app class="app">
    <!-- App Bar with Navigation Buttons -->
    <v-app-bar app class="app-bar">
      <div class="header">
        <v-btn to="/">Home</v-btn>
        <v-btn to="/createOrder">Order</v-btn>
        <v-btn to="/menu">Menu</v-btn>
        <v-btn @click="navigate('/test')">test</v-btn>
      </div>
      
      <!-- Right-side Menu with Dropdown -->
      <span class="right-btns">
        <client-only>
          
          <!-- Menu Button with Dropdown -->
          <v-btn v-if="loggedIn">
            edit menu
            <v-menu activator="parent">
              <!-- Dropdown List -->
              <v-list>
                <v-list-item 
                  v-for="(link, i) in menuLinks"
                  :key="i"
                  @click="navigate(link.to)"
                >
                  <v-list-item-title>{{ link.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
          <v-btn text="login" flat to="/auth/login" v-if="!loggedIn"/>
          <v-btn text="log out" v-else @click="logout"/>
        </client-only>
      </span>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main app class="main">
      <NuxtPage />
    </v-main>

    <!-- Footer -->
    <v-footer app class="footer">
      <span class="footer-text">John Kallis websites johnkallis01@gmail.com</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.app-bar {
  background-color: azure;
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
.footer {
  max-height: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
}

.footer-text {
  font-size: 12px;
}
</style>