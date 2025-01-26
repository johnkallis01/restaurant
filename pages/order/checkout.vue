<script setup>
definePageMeta({middleware: 'auth'});
useHead({
  title: "John's Restaurant - Checkout"
});
const cartStore = useCartStore();
// const config=useRunTimeConfig();
// const Stripe = require('stripe');
// const stripe = Stripe(config.stripPublic);
// var charge = await stripe.charges.retrieve(
//   'ch_3LiiC52eZvKYlo2C1da66ZSQ',
//   {
//     apiKey: config.stripPublic
//   }
// );
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
// const inputs = ref([
//   {},{},{},{},{},
// ]);

</script>
<template>
  <div class="container">
    <div class="form-title">Registration</div>
      <div class="form-subtitle">password must contain at least one uppercase letter, one number and one symbol !@#$%^&*?</div>
        <form>
          <TextField class="input-field"
            v-for="input in inputs" :key="input.placeholder"
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
.container{
  height: 100%;
  width: 100%;
}
</style>