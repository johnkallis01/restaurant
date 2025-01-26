import { navigateTo } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token');
  if (!token.value) {
    console.log('no token')
    return navigateTo('/auth/login/');

  }
   
    
  
});