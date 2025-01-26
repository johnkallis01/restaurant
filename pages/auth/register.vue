<script setup>
const authStore = useAuthStore();

const buttonRef=ref(null);
const user= reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
})
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
const inputs = ref([
  { name: 'firstName', placeholder: 'first name', req: true, rule: 'name'  , password: false,},
  { name: 'lastName', placeholder: 'last name',  req: true, rule: 'name', password: false,},
  { name: 'phone', placeholder: 'phone', req: true, rule: 'phone', password: false,},
  { name: 'email', placeholder: 'email', req: true, rule: 'email', password: false,},
  { name: 'password', placeholder: 'password', req: true,rule: 'password', password: true,},
  { name: 'confirmPassword', placeholder: 'confirm password', req: true, rule: 'password', password: true,},
]);
const isDisabled = computed(()=>{
  for(const val in validationStatus){
    if(!!validationStatus[val]);
    else return false;
  }
  return true;
})

const validateInput = (rule, value, inputVar) =>{
  // console.log('val input', rule)
  if(inputVar==='confirmPassword') {
    validationStatus['confirmPassword'] = user['password'] === value;
    validationStatus['password']=validationStatus['confirmPassword'];
    if(!validationStatus['confirmPassword']) validationStatus['password']=false;
  }
  if(rules[rule] && value.length){
    // console.log(rules[rule])
    validationStatus[inputVar] = rules[rule].test(value); //test input
    if(validationStatus[inputVar]) user[inputVar] = value; //if good assign to user
  }
}
const tabToSubmit = (event) =>{
  event.preventDefault();
  nextTick(() => {
      if (buttonRef.value) {
        buttonRef.value.focus();
        buttonRef.value.click();
      }}); 
}
const register = async () => {
    try {
      await authStore.register({
        firstName: user['firstName'],
        lastName: user['lastName'],
        phone: user['phone'],
        email: user['email'],
        password: user['password'],
      })
    } catch (error) {
      console.log('errrror: ', error['statusCode'])
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
          <TextField class="input-field"
            v-for="input in inputs" :key="input.name"
            :place-holder="input.placeholder" :req="input.req" 
            :is-valid="validationStatus[input.name]"
            @send-input="(value) => validateInput(input.rule, value, input.name)"
            :password="input.password"
            @keydown.enter="tabToSubmit($event)" 
           />
        </form>
        <div class="form-actions">
          <button class="btn register" ref="buttonRef"
            :disabled="!isDisabled" @click="register">Register</button>
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
.input-field.invalid{
  border: 2px solid red;
  background-color: red;
  color: red;
  border-color: red;
}
</style>
  