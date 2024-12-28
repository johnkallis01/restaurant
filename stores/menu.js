import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menu: { _id: '', name: '', days: [], sections: [] },
  }),
  getters:{
    getMenu: (state) => state.menu
  },
  actions: {
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
      console.log('post menu')
      const response = await $fetch('/api/menus/',{
        method: 'POST',
        body: menu,
      })
      console.log(response)
    },
    async updateMenu(menu){
      console.log('edit menu')
      console.log(menu)
      const response = await $fetch('/api/menus/'+menu._id,{
        method: 'PUT',
        body: menu
      })
      console.log(response)
    }
  },
});