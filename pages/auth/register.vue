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
  console.log('val input', rule)
  console.log(value, inputVar)
  if(inputVar==='confirmPassword') {
    validationStatus['confirmPassword'] = user['password'] === value;
    validationStatus['password']=validationStatus['confirmPassword'];
    if(!validationStatus['confirmPassword']) validationStatus['password']=false;
  }
  if(rules[rule] && value.length){
    console.log(rules[rule])
    validationStatus[inputVar] = rules[rule].test(value); //test input
    if(validationStatus[inputVar]) user[inputVar] = value; //if good assign to user
  }
  
}
const fNameRef=ref(null);
const lNameRef=ref(null);
const phoneRef=ref(null);
const emailRef=ref(null);
const pwRef=ref(null);
const cpwRef=ref(null);
const buttonRef=ref(null);
const getConfirmPassword = (p) =>{confirmPassword.value = p;}
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
const tabToSubmit = (event) =>{
  event.preventDefault();
  nextTick(() => {
        if (buttonRef.value) {
          buttonRef.value.focus();
          buttonRef.value.click();
        }});
}
const inputs = ref([
  { placeholder: 'first name', ref: fNameRef, req: true, isValid: validationStatus['firstName'],
    getInput: (value) => validateInput("name", value, "firstName") , password: false, nextRef: lNameRef, 
  },
  { placeholder: 'last name', ref: lNameRef, req: true, isValid: validationStatus['lastName'],
    getInput: (value) => validateInput("name", value, "lastName"), password: false, nextRef: phoneRef, 
  },
  { placeholder: 'phone', ref: phoneRef, req: true, isValid: validationStatus['phone'],
    getInput: (value) => validateInput("phone", value, "phone"), password: false, nextRef: emailRef, 
  },
  { placeholder: 'email', ref: emailRef, req: true, isValid: validationStatus['email'],
    getInput: (value) => validateInput("email", value, "email"), password: false, nextRef: pwRef, 
  },
  { placeholder: 'password', ref: pwRef, req: true, isValid: validationStatus['password'],
    getInput: (value) => validateInput("password", value, "password"), password: true, nextRef: cpwRef, 
  },
  { placeholder: 'confirm password', ref: cpwRef, req: true, isValid: validationStatus['confirmPassword'],
    getInput: (value) => validateInput("password", value, "confirmPassword"), password: true, nextRef: buttonRef, 
  },

]);

</script>
<template>
  <div class="container">
    <div class="form-title">Registration</div>
      <div class="form-subtitle">password must contain at least one uppercase letter, one number and one symbol !@#$%^&*?</div>
        <form>
          <TextField class="input-field"
            v-for="input in inputs" :key="input.placeholder"
            :place-holder="input['placeholder']" :ref="input['ref']" :req="input['req']" 
            :is-valid="input['isValid']"
            @send-input="input['getInput']"
            :password="input['password']"
         
           /> <!-- @keydown="tabToNext($event, input['nextRef'])" -->
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
.input-field.invalid {
  border-color: red;
}
</style>
  