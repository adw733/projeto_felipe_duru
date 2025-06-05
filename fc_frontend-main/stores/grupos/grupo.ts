import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Grupo } from "../../types/grupos/grupo";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  grupos: Grupo[];
}

export const useGrupoStore = defineStore("grupo", {
  state: (): stateInterface => ({
    grupos: [] as Grupo[],
  }),

  getters: {
    getBy: (state) => {
      return (search: number | string) =>
        state.grupos.find(
          (grupo: Grupo) => grupo.id === search || grupo.nome === search
        );
    },
  },

  actions: {
    async setGrupos() {
      const { baseURL } = useRuntimeConfig().public;
      const res: Grupo[] = await $fetch(`${baseURL}/grupos`);
      this.grupos = res;
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
