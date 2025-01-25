<script setup>
const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const cartButtonRef=ref(null);
const dropdownRef=ref(null);
const dropdown = ref(false);
const isAdmin = ref(false);
defineExpose({cartButtonRef});
const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.$el?.contains(event.target)) dropdown.value=false;
}
const logout = () => {
  authStore.logout();
  name.value="";
  router.push('/auth/login');
};
const loggedIn = computed(() => {
  authStore.loadTokenFromLocalStorage;
  isAdmin.value=false;
  return !!authStore.getToken;
});
const loginButton = ref(null);
const focusLoginButton = ()=>{
    loginButton?.value.focus();
}
provide('focusLoginButton', focusLoginButton);

const toggleCart = ()=>{cartStore.toggleCart();}

const focusLogin = () =>{
  if(!loggedIn.value) loginButton.value.focus();
  
}
const name = ref('');
watch(
  ()=>loggedIn.value,
  () => {
    if(loggedIn.value){
      if(!name.value) {
        authStore.loadNameFromLocalStorage();
        name.value=authStore.getName;
        if(authStore.getIsAdmin) isAdmin.value=authStore.getIsAdmin;
    }
  }
});

const toggleDropdown = () => {dropdown.value = !dropdown.value;}
onBeforeMount(async () => {
  // console.log('obm',authStore.getName)
  await authStore.fetchUser();
  authStore.loadNameFromLocalStorage();
  isAdmin.value=authStore.getIsAdmin; 
  // console.log(authStore.getName)
  name.value=authStore.getName;
});
onMounted(()=>{
    document.addEventListener('click', closeDropdown);
});
onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});
</script>
<template>
    <header class="header">
      <div class="left-btns">
        <ClientOnly>
      
          <button @click="toggleCart" ref="cartButtonRef" class="btn cart-btn" v-if="loggedIn">
            <i class="mdi mdi-cart"/>
            <span class="tooltip" v-if="!cartStore.items.length">add to order to open cart</span>
          </button>
          <div class="welcome" v-if="loggedIn">{{"Welcome, " + name}}</div>
        </ClientOnly>
        <span>{{  }}</span>
        <nuxt-link to="/">
          <button class="btn-link">Home</button>
        </nuxt-link>
        <nuxt-link to="/menus">
          <button class="btn-link">Menus</button>
        </nuxt-link>
        <nuxt-link to="/order">
          <button class="btn-link" @click="focusLogin">Order</button>
        </nuxt-link>
        <nuxt-link to="/test">
          <button class="btn-link" @click="focusLogin">Test</button>
        </nuxt-link>
      </div>
      <div class="right-btns">
        <ClientOnly>
          <template v-if="loggedIn">
            <template v-if="isAdmin">
              <nuxt-link ref="dropdownRef">
                <button class="btn-link" @click="toggleDropdown">Edit Menu</button>
              </nuxt-link>
            </template>
            <template v-if="dropdown">
              <MenuDropDown/>
            </template>
            <nuxt-link>
              <button class="btn-link" @click="logout">Logout</button>
            </nuxt-link>
          </template>
          <nuxt-link to="/auth/login" v-else>
            <button class="btn-link" ref="loginButton">Login</button>
          </nuxt-link>
        </ClientOnly>
      </div>
    </header>
</template>
<style scoped>
.welcome{
  text-wrap: nowrap;
}
.cart-btn{
  padding: 2px 7px;
  border-radius: 15px;
}
.tooltip{
  position: absolute;
  left: 100px;
  top: 35px;
}
</style>