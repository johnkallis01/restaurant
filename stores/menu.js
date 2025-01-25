import { defineStore } from 'pinia';
import { useAuthStore } from './auth.js'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [],
    menu: { _id: '', name: '', days: [], sections: [] },
  }),
  getters:{
    getMenu: (state) => state.menu,
  },
  actions: {
    async fetchMenus(){
      await fetch('/api/menus')
      .then(response => response.json())
      .then(data => this.menus = data);
    },
    setMenu(menu) {
      this.menu = menu;
    },
    setName(name){
      this.menu.name=name;
    },
    setSections(sections) {
      this.menu.sections=sections;
    },
    setDays(days) {
      this.menu.days = days;
    },
    resetMenu() {
      this.menu = { _id: '', name: '', days: [], sections: [] };
    },
    async postMenu(menu){
      const token = localStorage.getItem('authToken');
      if(token){
        console.log('post menu')
        try{
          const response = await $fetch('/api/menus/',{
            method: 'POST',
            headers: {authorization: `Bearer ${token}`},
            body: menu,
          })
          return response;
        }catch{
          console.log('error')
          useAuthStore().logout();
        }
        
      }
    },
    async updateMenu(menu){
      // console.log('update')
      const token = localStorage.getItem('authToken');
      if(token){
        try{
          const response = await $fetch('/api/menus/'+menu._id,{
            method: 'PUT',
            headers: {authorization: `Bearer ${token}`},
            body: menu,
          });
        }catch{
          console.log('error')
          useAuthStore().logout();
        }
       
      }
    },
    async deleteMenu(id){
      // console.log('delete menu');
      const token = localStorage.getItem('authToken');
      try{
        const response = await $fetch('/api/menus/'+id,{
          method: 'DELETE',
          headers: {authorization: `Bearer ${token}`},
        })
      }catch{
        console.log('error')
        useAuthStore().logout();
      }
      
    }
  },
});