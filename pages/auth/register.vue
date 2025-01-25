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
  if(inputVar==='confirmPassword') {
    validationStatus['confirmPassword'] = user['password'] === value;
    validationStatus['password']=validationStatus['confirmPassword'];
    if(!validationStatus['confirmPassword']) validationStatus['password']=false;
  }
  if(rules[rule] && value.length){
    validationStatus[inputVar] = rules[rule].test(value); //test input
    if(validationStatus[inputVar]) user[inputVar] = value; //if good assign to user
  }
  
}
const fNameRef=ref(null);
const pwRef=ref(null);
const cpwRef=ref(null);
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
const inputs = ref([
  { placeholder: 'first name', ref: 'fNameRef', req: true, isValid: validationStatus['firstName'],
      sendInput: validateInput('name', $event, 'firstName'), password: false
  },
  { placeholder: 'last name', ref: 'lNameRef', req: true, isValid: validationStatus['lastName'],
          sendInput: validateInput('name', $event, 'lastName'), password: false
  },
  { placeholder: 'phone', ref: 'phoneRef', req: true, isValid: validationStatus['phone'],
          sendInput: validateInput('phone', $event, 'phone'), password: false
  },
  { placeholder: 'email', ref: 'emailRef', req: true, isValid: validationStatus['email'],
          sendInput: validateInput('email', $event, 'email'), password: false
  },
  { placeholder: 'email', ref: 'emailRef', req: true, isValid: validationStatus['email'],
          sendInput: validateInput('email', $event, 'email'), password: false
  },
  { placeholder: 'password', ref: 'pwRef', req: true, isValid: validationStatus['password'],
          sendInput: validateInput('password', $event, 'password'), password: true
  },
  { placeholder: 'confirm password', ref: 'cpwRef', req: true, isValid: validationStatus['confirmPassword'],
          sendInput: validateInput('password', $event, 'confirmPassword'), password: true
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
            @send-input="input['sendInput']"
           :password="input['password']" />
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
  