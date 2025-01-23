<script setup>
const cartStore = useCartStore();
const authStore = useAuthStore();

const rules = {
    name: /^[a-zA-Z]{2,30}$/,
    zip: /^\d{5}$/,
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
const validateInput = (rule, value, inputVar) =>{
  if(rules[rule] && value.length){
    validationStatus[inputVar] = rules[rule].test(value);
    if(validationStatus[inputVar]) user[inputVar] = value;
  }
  if(inputVar==='confirmPassword') {
    validationStatus['confirmPassword'] = user['password'] === value;
    validationStatus['password']=validationStatus['confirmPassword'];
    if(!validationStatus['confirmPassword']) validationStatus['password']=false;
  }
}
// {
//         firstName: user['firstName'],
//         lastName: user['lastName'],
//         phone: user['phone'],
//         email: user['email'],
//         password: user['password'],
//        }

</script>
<template>
    <div class="container">
    <div class="form-title">{{  ", here is your CheckOut"}}</div>
      <div class="form-subtitle">Enter Payment Info below</div>
        <!-- <form>
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
            place-holder="zip code"/>

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
        </form> -->
        <div class="form-actions">
          <button class="btn register" :disabled="!isDisabled" @click="register">Register</button>
        </div>
  </div>
</template>
<style scoped>

</style>