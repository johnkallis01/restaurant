<script setup>
const authStore = useAuthStore();
const router = useRouter();

const dropdownRef=ref(null);
onMounted(()=>{
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.$el?.contains(event.target)) toggleDropdown();
}

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
const dropdown = ref(false);
const toggleDropdown = () => {
    dropdown.value = !dropdown.value;
}
</script>
<template>
    <header class="header">
      <div class="left-btns">
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
      <div class="right-btns">
        <ClientOnly>
          <template v-if="loggedIn">
            <nuxt-link>
              <button class="btn-link" @click="logout">Logout</button>
            </nuxt-link>
            <nuxt-link ref="dropdownRef">
              <button class="btn-link" @click="toggleDropdown">Edit Menu</button>
            </nuxt-link>
            <template v-if="dropdown">
              <MenuDropDown />
            </template>
            
          </template>
          <nuxt-link to="/auth/login" v-else>
            <button class="btn-link" ref="loginButton">Login</button>
          </nuxt-link>
        </ClientOnly>
      </div>
    </header>
</template>