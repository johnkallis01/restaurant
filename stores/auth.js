import { defineStore } from 'pinia';
import { decodeJwt, isTokenExpired } from '~/utils/jwt';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        // token: null,
        // name: null,
        // isAuthenticated: false,
        // isAdmin: false,
    }),
    getters: {
        // getUser: (state) => state.user,
        // getName: (state)=>state.name,
        // getToken: (state) => state.token,
        // getLoggedIn: (state) => state.isAuthenticated,
        // getIsAdmin: (state) => state.isAdmin,
    },
    actions: {
        async login(credentials) {
            // console.log('authstore.login')
            try {
                const response = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: credentials,
                });

                // this.token = response.token;
                // console.log(this.token)
                const tokenCookie=useCookie('token');
                // console.log(cookie)
                tokenCookie.value=response.token;
                // console.log(tokenCookie.value);
                const userCookie=useCookie('user');
                
                userCookie.value=response.user.firstName;
                
                // console.log(userCookie.value)
                this.user= response.user;
                // this.isAuthenticated = true;
                // localStorage.setItem('authToken', this.token);
                if(this.user){ 
                    // localStorage.setItem('userName', this.user.firstName);
                    if(this.user.isAdmin){
                        const isAdminCookie=useCookie('isAdmin');
                        isAdminCookie.value=true;
                        // console.log('is admin true')
                        // this.isAdmin=true;
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
            }
        },
       

    //     clearAuth() {
    //         this.user = null;
    //         this.token = null;
    //         this.name = null;
    //         this.isAuthenticated = false;
    //         this.isAdmin = false;
    //         if(process.client){
    //             localStorage.removeItem('authToken');
    //             localStorage.removeItem('authUser');
    //             localStorage.removeItem('userName');
    //             localStorage.removeItem('isAdmin');
    //         }
    //     },
    //     initialize(){
    //         if( process.client ){
    //             // console.log('client init')
    //             const token=localStorage.getItem('authToken');
    //             if( token && !isTokenExpired(token)){
    //                 this.token=token;
    //                 this.user=decodeJwt(token);
    //                 this.isAuthenticated = true;
    //                 // console.log(this.user)
    //             }else {
    //                 console.log('no token')
    //                 this.isAuthenticated=false;
    //             }
    //         }
    //     },
    //     async fetchUser() {
    //         // console.log(this.token)
    //         if(this.token){
    //             const decodedToken=decodeJwt(this.token);
    //             if(isTokenExpired(this.token)){
    //                 console.log('expired token'); return;
    //             }
    //              try {
    //                 const response = await $fetch('/api/auth/user', {
    //                     headers: {
    //                         Authorization: `Bearer ${this.token}`,
    //                     },
    //                 });
    //                 this.user = response;
    //                 if(this.user) {
    //                     // console.log(this.user.firstName)
    //                     if(this.user.isAdmin) {
    //                         this.isAdmin=true;
    //                         localStorage.setItem('isAdmin', true);
    //                     }
    //                     localStorage.setItem('userName', this.user.firstName);
    //                     const name = localStorage.getItem('userName');
    //                     // console.log(name)
    //                 }
                    
    //             } catch (error) {
    //                 console.error('Failed to fetch user: ', error)
    //                 this.logout();
    //             }
    //         }else console.log('no token data', this.token)
           
    //     },
    //     loadNameFromLocalStorage(){
    //         this.loadTokenFromLocalStorage();
    //         if(this.token){
    //             const name = localStorage.getItem('userName');
    //             if(name){
    //                 // console.log(name)
    //                 this.name=name;
    //             }else{
    //                 this.clearAuth();
    //             }
    //         }
    //     },
    //     loadTokenFromLocalStorage(){
    //         const token = localStorage.getItem('authToken');
    //         if(token && !isTokenExpired(token)){
    //             this.token=token;
    //             localStorage.setItem('authToken', token);
    //             console.log('isadmin',this.isAdmin)
    //             // console.log(localStorage.getItem('isAdmin'))
    //             if(localStorage.getItem('isAdmin')){
    //                 this.isAdmin=true;
    //             }
    //         }else{
    //             this.clearAuth();
    //         }
    //     }
    },
});