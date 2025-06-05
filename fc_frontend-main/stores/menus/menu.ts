import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Menu } from "../../types/menus/menu";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  menus: Menu[];
}

export const useMenuStore = defineStore("menu", {
  state: (): stateInterface => ({
    menus: [] as Menu[],
  }),

  getters: {
    getBy: (state) => {
      return (search: number | string) =>
        state.menus.find(
          (menu: Menu) =>
            menu.id === search || menu.nome === search || menu.rota === search
        );
    },
  },

  actions: {
    async setMenus() {
      const { baseURL } = useRuntimeConfig().public;
      const res: Menu[] = await $fetch(`${baseURL}/menus`);
      this.menus = res;
    },

    setMenu(menu: Menu) {
      const indiceMenu = this.menus.findIndex(
        (menuState: Menu) => menuState.id == menu.id
      );

      this.menus[indiceMenu] = menu;
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
