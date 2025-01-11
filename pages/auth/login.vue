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
</script>
<template>
  <div class="login-form">
    <div class="title login-form">Login</div>
    <form class="form-container">
      <div class="form-field login-field">
        <div class="floating-text-field login">
          <input
            type="text"
            name="email"
            placeholder=" "
            required
            v-model="email"/>
          <label for="email">Email</label>
        </div>
        <div class="floating-text-field login">
          <input
            type="text"
            name="password"
            placeholder=" "
            required
            v-model="password"/>
          <label for="password">Password</label>
          </div>
          <div class="form-actions">
            <nuxt-link>
              <button class="btn login" type="submit" @click="login">Login</button>
            </nuxt-link>
            <nuxt-link to="/auth/register/" >
              <button class="btn login register" style="margin-right: 10px;">Register</button>
            </nuxt-link>
          </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
.login-form{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-content: center;
  background-color: azure;
  border-radius: 10px;
  width: 40vw;
}
.title{
  padding: 10px;
  background-color: white;
  height: 10vh;
  font-size: large;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 2px solid black;
}
.form-container{
    gap: 0px; 
    padding: 10px;
}
.btn.login{
  padding: 0px 10px;
  border: 2px solid rgb(123, 123, 207);
}
.btn.register{
  margin: 0 10px;
}
.form-field{
  padding: 2px;
  margin: 10px 0px;
  gap: 10px;
}
.floating-text-field.login input:focus + label,
.floating-text-field.login input:not(:placeholder-shown) + label {
  background: linear-gradient(to bottom, azure 55%, white 45%);
}
</style>