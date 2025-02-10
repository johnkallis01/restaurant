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
        <button class="btn-link"><nuxt-link to="/">Home</nuxt-link></button>
        <button class="btn-link"><nuxt-link to="/menus"> Menus</nuxt-link></button>
        <button class="btn-link" @click="!loggedIn ? loginButton.focus() : null"><nuxt-link to="/order">Order</nuxt-link></button>        
      </span>
      <span class="right-btns">
        <ClientOnly>
          <template v-if="loggedIn">
            <template v-if="isAdmin.value">
              <button class="btn-link"><nuxt-link to="/orders">All Orders</nuxt-link></button>
              <button class="btn-link" @click="dropdown=!dropdown"><nuxt-link ref="dropdownRef">Edit Menu</nuxt-link></button>
            </template>
            <Teleport to="body">
              <MenuDropDown v-if="dropdown"/>
            </Teleport>
            <button class="btn-link" @click="logout()"><nuxt-link>Logout</nuxt-link></button>
          </template>
          <button class="btn-link" ref="loginButton" v-else><nuxt-link to="/auth/login">Login</nuxt-link></button>
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
  padding: 2px 4px;
  border-radius: 15px;
  margin: 0px 8px;
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
  margin: 0 5px;
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