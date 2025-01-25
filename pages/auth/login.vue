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
const tabToLogin = (event) =>{
  event.preventDefault();
  nextTick(() => {
        if (loginRef.value) {
            loginRef.value.focus();
            loginRef.value.click();
        }});
}
const getEmail = (em) =>{ email.value=em;}
const getPassword = (p) =>{password.value=p;}
const inputs = ref([
  { placeholder: 'email', req: true, password: false, 
        sendInput: getEmail, callback: ()=>null },
  { placeholder: 'password', req: true, password: true,
        sendInput: getPassword, callback: tabToLogin}]);
</script>
<template>
  <div class="container">
    <div class="form-title">Login</div>
    <form class="form-container" @submit.prevent="login">
      <div class="form-field">
        <TextField class="input-field login" 
          v-for="input in inputs" :key="input.name"
          :place-holder="input['placeholder']"
          :req="input['req']"
          :password="input['password']"
          @send-input="input['sendInput']"
          @keydown.enter="input['callback']"/>
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
.input-field.login{
  margin-bottom: 10px;
}
.btn.login{
  padding: 0px 10px;
  border: 2px solid black;
}
</style>