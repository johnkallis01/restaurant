import { navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(() => {

    const authStore = useAuthStore();
    authStore.loadTokenFromLocalStorage;
    if(process.client){
      if (!authStore.getToken){
        return navigateTo('/auth/login');
      }
    }else{
      if (!authStore.getToken){
        return navigateTo('/auth/login');
      }
    }
   
    
  
});