<script setup>
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const loginRef=ref(null);
const login = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    });
  } catch (err) {
   console.error('login faield')
  }
};
const getEmail = (em) =>{ email.value=em;}
const getPassword = (p) =>{password.value=p;}
const tabToLogin = (event) =>{
  event.preventDefault();
  nextTick(() => {
        if (loginRef.value) {
            loginRef.value.focus();
            loginRef.value.click();
        }});
}
</script>
<template>
  <div class="container">
    <div class="form-title">Login</div>
    <form class="form-container" @submit.prevent="login">
      <div class="form-field">
        <TextField class="input-field email" place-holder="email" :req="true" @send-input="getEmail"/>
        <TextField class="input-field password" place-holder="password" 
          :req="true" :password="true"
          @send-input="getPassword"
          @keydown.enter="tabToLogin"
          />
      </div>
      
    </form>
    <div class="form-actions">
      <button class="btn login" ref="loginRef" @click="login">Login</button>
      <nuxt-link to="/auth/register/" >
        <button class="btn register" style="margin-right: 10px;">Register</button>
      </nuxt-link>
    </div>
  </div>
</template>
<style scoped>
.input-field{
  width: 80%;
}
.input-field.email{
  margin-bottom: 10px;
}
.btn.login{
  padding: 0px 10px;
  border: 2px solid black;
}
</style>