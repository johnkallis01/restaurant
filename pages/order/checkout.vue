<script setup>
definePageMeta({middleware: 'auth'});
useHead({
  title: "John's Restaurant - Checkout"
});
const cartStore = useCartStore();
const authStore = useAuthStore();



// const user= reactive({
//   firstName: null,
//   lastName: null,
//   phone: null,
//   email: null,
//   password: null,
//   confirmPassword: null,
// });
// {
//         firstName: user['firstName'],
//         lastName: user['lastName'],
//         phone: user['phone'],
//         email: user['email'],
//         password: user['password'],
//        }
const name = ref('');
const checkoutStr = ref('Checkout for ');
onBeforeMount(async () => {
  // console.log('obm',authStore.getName)
  await authStore.fetchUser();
  authStore.loadNameFromLocalStorage();
  console.log(authStore.getName)
  name.value=authStore.getName;
});
</script>
<template>
    <div class="container">
    <div class="form-title">{{ checkoutStr + name }}</div>
      <div class="form-subtitle">Enter Payment Info below</div>
        <form> <!--
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
            place-holder="confirm password"/> -->
        </form> 
        <div class="form-actions">
           <button class="btn register" @click="register">Register</button>
        </div>
  </div>
</template>
<style scoped>
.container{
  height: 100%;
  width: 100%;
}
</style>