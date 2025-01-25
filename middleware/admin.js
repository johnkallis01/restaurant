import { navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();
    authStore.loadTokenFromLocalStorage;
    if(process.client){
      if (!authStore.isAdmin){
        return navigateTo('/');
      }
    }else{
      if (!authStore.isAdmin){
        return navigateTo('/');
      }
    }
});