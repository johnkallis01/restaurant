import { navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(() => {
  if(process.client) {
    const authStore = useAuthStore();
    if (!(!!authStore.getToken)){
      return navigateTo('/auth/login');
    }
    authStore.loadTokenFromLocalStorage; //in case of page reload
    if(!authStore.getToken) authStore.logout();
  }
});