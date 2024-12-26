import { addRouteMiddleware, defineNuxtPlugin, navigateTo } from "nuxt/app";
import { useAuthStore } from '../stores/auth';
export default defineNuxtPlugin((nuxtApp)=>{
   /* if(process.client){
        addRouteMiddleware('global-test', ()=>{
            const authStore = useAuthStore();
            const token = authStore.getToken;
            if(token){
                console.log('token')
            } else{
                console.log('no token')
               navigateTo('/auth/login')
            }
        }, {global: true})
    } */
        
        const route = useRoute();
        const router = nuxtApp.$router;
    const authStore=useAuthStore();
    authStore.loadTokenFromLocalStorage();

    router.beforeEach( (to, from, next ) => {
        if(!authStore.token && to.path !== '/auth/login'){
            if(to.path === '/' || to.path === '/menu'){}
            else{
                return (next('/auth/login'))
            } 
        }
        next();
    })
})