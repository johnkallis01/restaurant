export default defineNuxtRouteMiddleware((to) => {
    const {verifyToken, logout}=useAuthStore();
    const token = useCookie('token');
    // console.log('verify')
    // console.log(token.value)
    if(token.value && !verifyToken){
        console.log(verifyToken)
        console.log('token exp')
        logout();
        return navigateTo('/auth/login/');
    }
});