import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Tipo } from "../../types/tipos/tipo";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  tipos: Tipo[];
}

export const useTipoStore = defineStore("tipo", {
  state: (): stateInterface => ({
    tipos: [] as Tipo[],
  }),

  getters: {
    getBy: (state) => {
      return (search: number | string) =>
        state.tipos.find(
          (tipo: Tipo) => tipo.id === search || tipo.nome === search
        );
    },
  },

  actions: {
    async setTipos() {
      const { baseURL } = useRuntimeConfig().public;
      const res: Tipo[] = await $fetch(`${baseURL}/tipos`);
      this.tipos = res;
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
