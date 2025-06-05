import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { MenuPerfil } from "../../types/menus/menu-perfil";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  menusPerfis: MenuPerfil[];
}

export const useMenuPerfilStore = defineStore("menuPerfil", {
  state: (): stateInterface => ({
    menusPerfis: [] as MenuPerfil[],
  }),

  getters: {
    getBy: (state) => {
      return (search: number | string) =>
        state.menusPerfis.find(
          (menuPerfil: MenuPerfil) =>
            menuPerfil.id === search
        );
    },
  },

  actions: {
    async setMenusPerfis() {
      const { baseURL } = useRuntimeConfig().public;
      const res: MenuPerfil[] = await $fetch(
        `${baseURL}/menus-perfis`
      );
      this.menusPerfis = res;
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
