<script setup>
import { rules } from '~/utils/rules';
definePageMeta({middleware: ['auth', 'has-order']});
useHead({
  title: "John's Restaurant - Checkout"
});
const cartStore = useCartStore();
const buttonRef=ref(null);
const { tabToButton } = useTabToButton(buttonRef);
const order= reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
});
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
  if(rules[rule]){
    // console.log(rules[rule])
    validationStatus[inputVar] = rules[rule].test(value); //test input
    if(validationStatus[inputVar]) order[inputVar] = value; //if good assign to user
  }
}
async function submitOrder(){
  // console.log(order)
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
  <div class="page-container">
    <div class="form-container">
      <div class="form-title checkout">
        <span class="text">{{'Checkout Total:  $'+cartStore.getTotal}}</span>
      </div>
      <div class="form-subtitle checkout">Please enter your contact information to complete the order</div>
      <form class="checkout-form">
        <div class="form-inputs">
          <TextField class="input-field"
            v-for="input in inputs" :key="input.placeholder"
            :place-holder="input.placeholder" :req="input.req" 
            :is-valid="validationStatus[input.name]" bgColor="azure"
            @send-input="(value) => validateInput(input.rule, value, input.name)"
            @keydown.enter="tabToButton" 
          />
        </div>
        <div class="checkout-actions">
          <button class="btn submit" ref="buttonRef"
            :disabled="!isDisabled" @click="submitOrder()">Order</button>
        </div>
      </form>
    </div>        
  </div>
</template>
<style scoped>
.page-container{
  background-color: transparent;
}
.form-container{
  width: 300px;
  min-width: 300px;
  border: 3px solid black;
}
form{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.form-title.checkout{
  width: 100%;
  border-radius: 2px 2px 0px 0px;
  padding: 0;
  height: 40px;
}
.form-subtitle{
  padding: 6px;
  font-size: 14px;
}
.text{
  margin-left: 20px;
  padding: 4px;
  text-wrap: nowrap;
}
.form-inputs{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.checkout-actions{
  width: 100%;
  margin: 5px;
}
</style>