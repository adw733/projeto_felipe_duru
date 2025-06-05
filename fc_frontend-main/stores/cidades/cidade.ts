import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Cidade } from "../../types/cidades/cidade";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  cidades: Cidade[];
}

export const useCidadeStore = defineStore("cidade", {
  state: (): stateInterface => ({
    cidades: [] as Cidade[],
  }),

  getters: {
    getBy: (state) => {
      return (search: number) =>
        state.cidades.find((cidade: Cidade) => cidade.id === search);
    },
    getByEstado: (state) => {
      return (estadoId: number, search: string | number) =>
        state.cidades.find(
          (cidade: Cidade) =>
            cidade.estadoId === estadoId &&
            (cidade.id === search || cidade.nome === search)
        );
    },
  },

  actions: {
    async setCidades() {
      const { baseURL } = useRuntimeConfig().public;
      const res: Cidade[] = await $fetch(`${baseURL}/cidades`);
      this.cidades = res;
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
