<script setup>
const authStore = useAuthStore();  const cartStore = useCartStore();
const router = useRouter();
const cartButtonRef=ref(null);  const dropdownRef=ref(null);
const loginButton = ref(null); const logoutTimer=ref(null);
const dropdown = ref(false);  const isAdmin = ref(false);
const userName = ref();
defineExpose({cartButtonRef});
function logout(){
  authStore.logout();
  router.push('/auth/login');
};
const loggedIn = computed(() => {
  const token = useCookie('token');
  isAdmin.value = useCookie('isAdmin');
  return !!token.value;
});
const closeDropdown = (event) => {(dropdownRef.value && !dropdownRef.value.$el?.contains(event.target))? dropdown.value=false:null}
useEventListener('click',closeDropdown);
onBeforeMount( () => {userName.value=useCookie('user'); isAdmin.value=useCookie('isAdmin')});
onMounted(()=>logoutTimer.value = setInterval(authStore.verifyToken, 30000)); //check that token isn't expired
onBeforeUnmount(() => logoutTimer.value ? clearInterval(logoutTimer.value):null); //remove eventListener
</script>
<template>
    <header class="header">
      <span class="left-btns">
        <ClientOnly>   
          <button @click="cartStore.toggleCart()" ref="cartButtonRef" class="btn cart-btn" v-if="loggedIn">
            <i class="mdi mdi-cart"/>
          </button>
          <button class="welcome" v-if="loggedIn">{{"Welcome, " + userName.value}}</button>
        </ClientOnly>
        <nuxt-link to="/"><button class="btn-link">Home</button></nuxt-link>
        <nuxt-link to="/menus"><button class="btn-link">Menus</button> </nuxt-link>
        <nuxt-link to="/order"><button class="btn-link" @click="!loggedIn ? loginButton.focus() : null">Order</button> </nuxt-link>      
      </span>
      <span class="right-btns">
        <ClientOnly>
          <template v-if="loggedIn">
            <template v-if="isAdmin.value">
              <nuxt-link to="/orders"><button class="btn-link">All Orders</button></nuxt-link>
              <nuxt-link ref="dropdownRef"><button class="btn-link" @click="dropdown=!dropdown">Edit Menu</button></nuxt-link>
            </template>
            <Teleport to="body">
              <MenuDropDown v-if="dropdown"/>
            </Teleport>
            <nuxt-link><button class="btn-link" @click="logout()">Logout</button></nuxt-link>
          </template>
          <nuxt-link to="/auth/login" v-else><button class="btn-link" ref="loginButton">Login</button></nuxt-link>
        </ClientOnly>
      </span>
    </header>
</template>
<style scoped>
.welcome{
  text-wrap: nowrap;
  background-color: transparent;
}
@media (max-width: 600px){
  .welcome{
    visibility: hidden;
    width: 0;
  }
  button{
    padding: 0;
    margin: 0;
    font-size: 12px;
  }
}
.cart-btn{
  padding: 5px 3vw;
  border-radius: 15px;
  background-color: transparent;
}
.cart-btn:hover{
  box-shadow: 0 0 5px rgba(9, 104, 199, 0.5);
}
.btn-link{
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: transparent;
  padding: 2px 5px;
  border: none;
  text-overflow: visible;
  white-space: nowrap;
}
.btn-link:hover {
  cursor: pointer;
  box-shadow: 0 0 5px rgba(214, 227, 240, 0.5);
}
.btn-link:focus {
  border-bottom: 2px solid #166bad;
}
</style>