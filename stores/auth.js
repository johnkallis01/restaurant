import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        isAuthenticated: false,
    }),
    getters: {
        getUser: (state) => state.user,
        getToken: (state) => state.token,
    },
    actions: {
        initializeAuth(){
            if(process.client){
                const token = localStorage.getItem('authToken');
                const user = JSON.parse(localStorage.getItem('authUser'));
                if(token){
                    this.token = token;
                    this.user = user;
                    this.isAuthenticated = true;
                } else {
                    this.clearAuth();
                }
            }
        },
        async login(credentials) {
            try {
                const response = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: credentials,
                });
                this.user = response.user;
                this.token = response.token;
                this.isAuthenticated = true;
                if(process.client){
                    localStorage.setItem('authToken', this.token);
                    localStorage.setItem('authUser', JSON.stringify(this.user));
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
            this.clearAuth();
        },
        clearAuth() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
            if(process.client){
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
            }
        },
        async fetchUser() {
            if(!this.token) return;
            try {
                const response = await $fetch('/api/auth/user', {
                    headers: {
                        Authorization: `Beared ${this.token}`,
                    },
                });
                this.user = response.user;
            } catch (error) {
                console.error('Failed to fetch user: ', error)
                this.logout();
            }
        },
    },
});