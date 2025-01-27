<script setup>
definePageMeta({middleware: 'auth'});
useHead({
  title: "John's Restaurant - Checkout"
});
import { rules } from '~/utils/rules';
const cartStore = useCartStore();
const { buttonRef, tabToSubmit } = useTabToSubmit();
// const config=useRunTimeConfig();
// const Stripe = require('stripe');
// const stripe = Stripe(config.stripPublic);
// var charge = await stripe.charges.retrieve(
//   'ch_3LiiC52eZvKYlo2C1da66ZSQ',
//   {
//     apiKey: config.stripPublic
//   }
// );

const order= reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
})
const validationStatus= reactive({
  firstName: null,
  lastName: null,
  phone: null,
  email: null,
});
const inputs = ref([
  { name: 'firstName', placeholder: 'first name', req: true, rule: 'name',},
  { name: 'lastName', placeholder: 'last name',  req: true, rule: 'name',},
  { name: 'phone', placeholder: 'phone', req: true, rule: 'phone',},
  { name: 'email', placeholder: 'email', req: true, rule: 'email',},
]);
const isDisabled = computed(()=>{
  for(const val in validationStatus){
    if(!!validationStatus[val]);
    else return false;
  }
  return true;
});
const validateInput = (rule, value, inputVar) =>{
  if(rules[rule] && value.length){
    // console.log(rules[rule])
    validationStatus[inputVar] = rules[rule].test(value); //test input
    if(validationStatus[inputVar]) order[inputVar] = value; //if good assign to user
  }
}
const submitOrder = async ()=>{
  try {
      await cartStore.submitOrder({
        name: order.lastName+','+order.firstName,
        phone: order.phone,
        email: order.email,
        total: cartStore.getTotal,
        items: cartStore.getItems,
      })
    } catch (error) {
      console.log('errrror: ', error['statusCode'])
      if(error.response.status === 409){
        navigateTo('/')
      }
    }
}
</script>
<template>
  <div class="container">
    <div class="form-title checkout">
      <span class="text">{{'Checkout Total:  $'+cartStore.getTotal}}</span>
    </div>
      <div class="form-subtitle checkout">Please enter your contact information to complete the order</div>
        <form class="checkout-form">
          <div class="form-inputs">
            <TextField class="input-field"
            v-for="input in inputs" :key="input.placeholder"
            :place-holder="input.placeholder" :req="input.req" 
            :is-valid="validationStatus[input.name]"
            @send-input="(value) => validateInput(input.rule, value, input.name)"
            @keydown.enter="tabToSubmit($event)" 
           />
          </div>
          <div class="checkout-actions">
            <button class="btn submit" ref="buttonRef"
              :disabled="!isDisabled" @click="submitOrder">Order</button>
          </div>
        </form>
        
  </div>
</template>
<style scoped>
.container{
  height: 100%;
  width: 100%;
  border-radius: 0;
  align-items: center;
}
.form-title.checkout{
  width: 100%;
  border-radius: 0px;
}
.text{
  margin-left: 20px;
  text-wrap: nowrap;
}
.form-inputs{

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 40px;
}
.checkout-form{
  width: 60vw;

}
.checkout-actions{
  width: 100%;
  margin: 5px;
}
</style>