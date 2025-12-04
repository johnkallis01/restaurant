import { defineStore } from 'pinia';
import { isTokenExpired } from '~/utils/jwt';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: credentials,
                });
                const tokenCookie=useCookie('token');
                tokenCookie.value=response.token;
                const userCookie=useCookie('user');
                userCookie.value=response.user.firstName;
                this.user= response.user;
                if(this.user){ 
                    if(this.user.isAdmin){
                        const isAdminCookie=useCookie('isAdmin');
                        isAdminCookie.value=true;
                    }
                }
                navigateTo('/');
            } catch (error) {
                throw new Error('::Invalid Credentials::');
            }
        },
        async register(credentials){
            const response = await $fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(credentials),
            });
            navigateTo('/auth/login');
        },
        logout() {
            const cookie = useCookie('token');
            cookie.value=null;
            const user = useCookie('user');
            user.value=null;
            const isAdmin = useCookie('isAdmin');
            isAdmin.value=null;
        },
        verifyToken(){
            const token = useCookie('token');
            if(token.value){
                if(isTokenExpired(token.value)) this.logout();
            }else{
                 this.logout();
                 navigateTo('/auth/login');
                }
        },
    },
});