import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Perfil } from "../../types/perfis/perfil";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  perfis: Perfil[];
}

export const usePerfilStore = defineStore("perfil", {
  state: (): stateInterface => ({
    perfis: [] as Perfil[],
  }),

  getters: {
    getAll: (state) => {
      return state.perfis
    },

    getBy: (state) => {
      return (search: number | string) =>
        state.perfis.find(
          (perfil: Perfil) =>
            perfil.id === search || perfil.nome === search
        );
    },
  },

  actions: {
    async setPerfis() {
      const { baseURL } = useRuntimeConfig().public;
      const res: Perfil[] = await $fetch(`${baseURL}/perfis`);
      this.perfis = res;
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
