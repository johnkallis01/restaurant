<script setup>
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const showpassword = ref(false);
const eye = ref(["mdi-eye-outline", "mdi-eye-off-outline"]);
const rules = {required: (v) => !!v || 'Required'};

const togglepassword = () => {
  showpassword.value = !showpassword.value;
};

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
const getEmail = (string) =>{
 // console.log('get email ' ,string)
  email.value=string;
}
const getPassword = (string) =>{
 // console.log('get password ' ,string)
  password.value=string;

}
</script>
<template>
  <div class="container">
    <div class="form-title">Login</div>
    <form class="form-container" @submit.prevent="login">
      <div class="form-field">
        <TextField class="input-field email" placeHolder="email" :req="true" @send-input="getEmail"/>
        <TextField class="input-field password" placeHolder="password" 
          :req="true" :password="true"
          @send-input="getPassword"
          />
      </div>
    </form>
    <div class="form-actions">
      <button class="btn login" type="submit" @click="login">Login</button>
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