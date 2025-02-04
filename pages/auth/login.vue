<script setup>
import { onMounted } from 'vue';

useHead({
  title: "John's Restaurant - Login"
});
const authStore = useAuthStore();
const loginRef=ref(null);
const buttonRef=ref(null);
const { tabToButton } = useTabToButton(buttonRef);
const email = ref('');
const password = ref('');


async function login(){
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
const inputs = ref([
  { placeholder: 'email', req: true, password: false, 
        sendInput: getEmail, callback: ()=>null },
  { placeholder: 'password', req: true, password: true,
        sendInput: getPassword, callback: tabToButton}]);
onMounted(() => {
  loginRef.value.querySelector('input').focus()
})
</script>
<template>
  <div class="container" ref="loginRef">
    <div class="form-title">Login</div>
    <form class="form-container" @submit.prevent="login">
      <div class="form-field">
        <TextField class="input-field login" 
          v-for="input in inputs" :key="input.name"
          :place-holder="input['placeholder']"
          :req="input['req']" bgColor="azure"
          :password="input['password']"
          @send-input="input['sendInput']"
          @keydown.enter="input['callback']"/>
      </div>
    </form>
    <div class="form-actions">
      <button class="btn login" ref="buttonRef" @click="login()" @touch="login()">Login</button>
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