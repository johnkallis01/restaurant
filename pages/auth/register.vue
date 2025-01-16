<script setup>
const authStore = useAuthStore();

const confirmPassword = ref('');

const rules = {
  name: /^[a-zA-Z]{2,30}$/,
  phone: /^\d{10}$/,
  email: /.+@.+\..+/,
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/,
}
const validationStatus= reactive({
  firstName: null,
  lastName: null,
  phone: null,
  email: null,
  password: null,
  confirmPassword: null,
});
const isDisabled = computed(()=>{
  for(const val in validationStatus){
    console.log(validationStatus[val])
    if(!!validationStatus[val]);
    else return false;
  }
  return true;
})
const user= reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const validateInput = (rule, value, inputVar) =>{
  if(rules[rule] && value.length){
    validationStatus[inputVar] = rules[rule].test(value);
    if(validationStatus[inputVar]) user[inputVar] = value;
  }
  if(inputVar==='confirmPassword') {
    validationStatus.confirmPassword = user.password === value;
    validationStatus.password=validationStatus.confirmPassword;
    if(!validationStatus.confirmPassword) validationStatus.password=false;
  }
}
const fNameRef=ref(null);
const pwRef=ref(null);
const cpwRef=ref(null);
const getConfirmPassword = (p) =>{confirmPassword.value = p;}
const register = async () => {
    try {
      await authStore.register({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        password: user.password,
      })
    } catch (error) {
      console.log('errrror: ', error.statusCode)
      if(error.response.status === 409){
        navigateTo('/auth/login')
      }
    }
}
</script>
<template>
  <div class="container">
    <div class="form-title">Registration</div>
      <div class="form-subtitle">password must contain at least one uppercase letter, one number and one symbol !@#$%^&*?</div>
        <form>
          <TextField class="input-field" :req="true" ref="fNameRef"
            :is-valid="validationStatus['firstName']"
            @send-input="validateInput('name', $event, 'firstName')"
            place-holder="first name" />

          <TextField class="input-field" :req="true" ref="lNameRef"
            :is-valid="validationStatus['lastName']"
            @send-input="validateInput('name', $event, 'lastName')"
            place-holder="last name" />

          <TextField class="input-field" :req="true" ref="phoneRef"
            :is-valid="validationStatus['phone']"
            @send-input="validateInput('phone', $event, 'phone')"
            place-holder="phone"/>

          <TextField class="input-field" :req="true" ref="emailRef"
            :is-valid="validationStatus['email']"
            @send-input="validateInput('email', $event, 'email')"
            place-holder="email"/>

          <TextField class="input-field" :req="true" ref="pwRef" :password="true"
            :is-valid="validationStatus['password']"
            @send-input="validateInput('password', $event, 'password')"
            place-holder="password"/>

          <TextField class="input-field" :req="true" ref="cpwRef" :password="true"
            :is-valid="validationStatus['confirmPassword']"
            @send-input="validateInput('password', $event, 'confirmPassword')"
            place-holder="confirm password"/>
        </form>
        <div class="form-actions">
          <button class="btn register" :disabled="!isDisabled" @click="register">Register</button>
        </div>
  </div>
</template>
<style scoped>
.form-subtitle{
  padding: 3px 10px;
  font-size: 12px;
}
.container{
  min-width: 50vw;
}
form{
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
}
.input-field{
  width: 20vw;
}
.input-field {
  transition: border-color 0.3s;
}
.input-field.invalid {
  border-color: red;
}
</style>
  