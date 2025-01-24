import { navigateTo } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(() => {
   if(process.client) {
      const authStore = useAuthStore();
      // authStore.loadTokenFromLocalStorage();
      if (!(!!authStore.getToken)){
        return navigateTo('/auth/login');
    }
  }
});