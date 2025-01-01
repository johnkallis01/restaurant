import { addRouteMiddleware, defineNuxtPlugin, navigateTo } from "nuxt/app";
import { useAuthStore } from '../stores/auth';
export default defineNuxtPlugin((nuxtApp)=>{
        
    const router = nuxtApp.$router;
    const authStore=useAuthStore();
    authStore.loadTokenFromLocalStorage();

    router.beforeEach( (to, from, next ) => {
        if(!authStore.token && to.path !== '/auth/login'){
            if(to.path === '/' || to.path === '/menus' || to.path === '/auth/register/'){
                //do nothing
            }
            else{
                return (next('/auth/login'))
            } 
        }
        next();
    });
})