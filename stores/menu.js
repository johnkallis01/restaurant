import { defineStore } from 'pinia';
export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [],
  }),
  getters:{
    getMenus: (state)=>state.menus,
  },
  actions: {
    async fetchMenus(){
      const response = await fetch('/api/menus',{method: 'GET'})
      if(!response.ok) throw new Error('error from api/orders');
      const data= await response.json();
      this.menus=data;
    },
    async postMenu(menu){
      const token=useCookie('token');
      if(token.value){
        try{
          const response = await $fetch('/api/menus/',{
            method: 'POST',
            headers: {authorization: `Bearer ${token.value}`},
            body: menu,
          })
          return response.res._id;
        }catch{
          console.log('error')
          useAuthStore().logout();
        }
        
      }
    },
    async updateMenu(menu){
     const token=useCookie('token');
      if(token.value){
        try{
          await $fetch('/api/menus/'+menu._id,{
            method: 'PUT',
            headers: {authorization: `Bearer ${token.value}`},
            body: menu,
          });
        }catch{
          console.log('error')
          useAuthStore().logout();
        }
       
      }
    },
    async deleteMenu(id){
     const token=useCookie('token');
      if(token.value){
         try{
          await $fetch('/api/menus/'+id,{
            method: 'DELETE',
            headers: {authorization: `Bearer ${token.value}`},
          })
        }catch{
          console.log('error')
          useAuthStore().logout();
        }
      }
    }
  },
});