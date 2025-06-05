import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { GrupoItem } from "../../types/grupos/grupo-item";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  gruposItens: GrupoItem[];
}

export const useGrupoItemStore = defineStore("grupoItem", {
  state: (): stateInterface => ({
    gruposItens: [] as GrupoItem[],
  }),

  getters: {
    getBy: (state) => {
      return (search: number | string) =>
        state.gruposItens.find(
          (grupoItem: GrupoItem) =>
            grupoItem.id === search || grupoItem.nome === search
        );
    },
  },

  actions: {
    async setGruposItens() {
      const { baseURL } = useRuntimeConfig().public;
      const res: GrupoItem[] = await $fetch(`${baseURL}/grupos-itens`);
      this.gruposItens = res;
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
