<script setup>
const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const cartButtonRef=ref(null);
const dropdownRef=ref(null);
const logoutTimer=ref(null);
const loginButton = ref(null);
const dropdown = ref(false);
const isAdmin = ref(false);
const userName = ref();
defineExpose({cartButtonRef});
function toggleCart(){cartStore.toggleCart();}
function focusLogin(){if(!loggedIn.value) loginButton.value.focus();}
function toggleDropdown(){dropdown.value = !dropdown.value;}
function logout(){
  authStore.logout();
  router.push('/auth/login');
};
const loggedIn = computed(() => {
  const token = useCookie('token');
  isAdmin.value = useCookie('isAdmin');
  return !!token.value;
});
const focusLoginButton = ()=>{loginButton?.value.focus();}
const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.$el?.contains(event.target)) dropdown.value=false;
}
useEventListener('click',closeDropdown);
onBeforeMount( () => {userName.value=useCookie('user'); isAdmin.value=useCookie('isAdmin')});
onMounted(()=>{logoutTimer.value = setInterval(authStore.verifyToken, 30000);});
onBeforeUnmount(() => {if (logoutTimer.value) clearInterval(logoutTimer.value);});
</script>
<template>
    <header class="header">
      <div class="left-btns">
        <ClientOnly>   
          <button @click="toggleCart()" ref="cartButtonRef" class="btn cart-btn" v-if="loggedIn">
            <i class="mdi mdi-cart"/>
            <span class="tooltip" v-if="!cartStore.items.length">add to order to open cart</span>
          </button>
          <div class="welcome" v-if="loggedIn">{{"Welcome, " + userName.value}}</div>
        </ClientOnly>
        <nuxt-link to="/">
          <button class="btn-link">Home</button>
        </nuxt-link>
        <nuxt-link to="/menus">
          <button class="btn-link">Menus</button>
        </nuxt-link>
        <nuxt-link to="/order">
          <button class="btn-link" @click="focusLogin()">
            Order
            <span class="tooltip" v-if="!loggedIn">must be loggedin to order</span>
          </button>
        </nuxt-link>
      </div>
      <div class="right-btns">
        <ClientOnly>
          <template v-if="loggedIn">
            <template v-if="isAdmin.value">
              <nuxt-link to="/orders">
                <button class="btn-link">All Orders</button>
              </nuxt-link>
              <nuxt-link ref="dropdownRef">
                <button class="btn-link" @click="toggleDropdown()">Edit Menu</button>
              </nuxt-link>
            </template>
              <MenuDropDown v-if="dropdown"/>
            <nuxt-link>
              <button class="btn-link" @click="logout()">Logout</button>
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
.btn-link:hover .tooltip{
  opacity: 1;
  visibility: visible;
}
</style>