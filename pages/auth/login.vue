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
const focusLoginButton = inject('focusLoginButton');
onMounted(()=>{
  if(focusLoginButton){
    focusLoginButton();
  }
})
</script>
<template>
  <v-card  style="width: 400px">
    <v-card-title class="title">Login</v-card-title>
    <v-form class="form">
      <v-card-item>
        <v-text-field v-model="email" label="E-mail" variant="underlined" :rules="[rules.required]"/>
        <v-text-field
          v-model="password"
          label="Password"
          variant="underlined"
          :rules="[rules.required]"
          :type="showpassword ? 'text' : 'password'"
          :append-inner-icon="showpassword ? eye[0]:eye[1]"
          @click:append-inner="togglepassword"
        />
      </v-card-item>
      <v-card-actions class="d-flex justify-center">
        <v-btn @click="login">Sign In</v-btn>
        <v-btn href="/auth/register/">Register</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>