<script setup>
  const authStore = useAuthStore();

  const firstName = ref('');
  const lastName = ref('');
  const phone = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const valid = ref(false);
  const showpassword = ref(false);
  const showConfirmPassword = ref(false);
  const eye = ref(["mdi-eye-outline", "mdi-eye-off-outline"]);
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
  const rules = {
    required: (v) => !!v || 'Required',
    email: (v) => /.+@.+\..+/.test(v) || 'Invalid email',
    name: (v) =>  /^[A-Za-z\-]+$/.test(v) || 'Name must contain only letters and -',
    phone: (v) => /^\+?[1-9]\d{7,14}$/.test(v) || 'Phone Number must contain at least 10 numbers',
    password: (v) => passwordRegex.test(v) || 'Password',
  };
  
  const togglepassword = () => {
    showpassword.value = !showpassword.value;
  }
  const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
  const register = async () => {
    if(password?.value === confirmPassword?.value){
      try {
        await authStore.register({
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          email: email.value,
          password: password.value,
        })
      } catch (error) {
        console.log('errrror: ', error.statusCode)
        if(error.response.status === 409){
          navigateTo('/auth/login')
        }
      }
    }
   
  };
</script>
<template>
  <v-card>
    <v-card-title class="title">Registration</v-card-title>
    <v-card-subtitle class="subtitle">
      <div class="text">{{"password must contain at least one uppercase letter, one number and one symbol !@#$%^&*?"}}</div>
    </v-card-subtitle>
    <v-form v-model="valid" @submit.prevent="register" class="form">
      <v-card-item>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="firstName" label="First Name" :rules="[rules.required, rules.name]"/>
            <v-text-field v-model="lastName" label="Last Name" :rules="[rules.required, rules.name]"/>
            <v-text-field v-model="phone" label="Phone Number" :rules="[rules.required, rules.phone]"/>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="email" label="Email" :rules="[rules.required, rules.email]"/>
            <v-text-field 
              v-model="password"
              label="Password"
              :append-inner-icon="showpassword ? eye[0]:eye[1]"
              :rules="[rules.required, rules.password]"
              :type="showpassword ? 'text' : 'password'"
              @click:append-inner="togglepassword"
            />
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              :append-inner-icon="showConfirmPassword ? eye[0]:eye[1]"
              :rules="[rules.required , rules.password]"
              :type="showConfirmPassword ? 'text' : 'password'"
              @click:append-inner="toggleConfirmPassword"
            />
          </v-col>
        </v-row> 
      </v-card-item>
      <v-card-actions>
        <v-btn :disabled="!valid" @click="register">Signup</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<style scoped>
.subtitle{
  white-space: normal;
  overflow-wrap: break-word;
}
.text{
  padding: 2px;
}
.form{
  background-color: white;
}
</style>
  