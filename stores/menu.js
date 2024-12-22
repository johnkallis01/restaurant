import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menu: { _id: '', name: '', days: [], categories: [] },
  }),
  actions: {
    setMenu(menu) {
      this.menu = menu;
    },
    setName(name){
      this.menu.name=name;
    },
    setCategories(categories) {
      this.menu.categories=categories;
    },
    setDays(days) {
      this.menu.days = days;
    },
    resetMenu() {
      this.menu = { _id: '', name: '', days: [], categories: [] };
    },
  },
});