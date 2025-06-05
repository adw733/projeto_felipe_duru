import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Estado } from "../../types/estados/estado";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  estados: Estado[];
}

export const useEstadoStore = defineStore("estado", {
  state: (): stateInterface => ({
    estados: [] as Estado[],
  }),

  getters: {
    getBy: (state) => {
      return (search: number | string) =>
        state.estados.find(
          (estado: Estado) =>
            estado.id === search ||
            estado.nome === search ||
            estado.nomeAlternativo === search
        );
    },
  },

  actions: {
    async setEstados() {
      const { baseURL } = useRuntimeConfig().public;
      const res: Estado[] = await $fetch(`${baseURL}/estados`);
      this.estados = res;
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
