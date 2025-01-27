export default defineNuxtRouteMiddleware(async () => {
  const isAdmin = useCookie('isAdmin');
  if (!isAdmin.value){
    console.log('isadmin false');
    return navigateTo('/');
  }    
});