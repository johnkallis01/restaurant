export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token');
  const authstore=useAuthStore();
  if (!token.value) {
    console.log('no token')
    return navigateTo('/auth/login/');
  }else{
    console.log('v',authstore.verifyToken(token.value))

    if(!authstore.verifyToken(token.value)) {
      authstore.logout();
      return navigateTo('/auth/login/');
    }
  }
});