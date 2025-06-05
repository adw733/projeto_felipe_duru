import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { TipoItem } from "../../types/tipos/tipo-item";
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


interface stateInterface {
  tiposItens: TipoItem[];
}

export const useTipoItemStore = defineStore("tipoItem", {
  state: (): stateInterface => ({
    tiposItens: [] as TipoItem[],
  }),
  
  getters: {
    getBy: (state) => {
      return (search: number | string) =>
        state.tiposItens.find(
          (tipoItem: TipoItem) =>
            tipoItem.id === search || tipoItem.nome === search
        );
    },

    getByTipoId: (state) => {
      return (search: number) => state.tiposItens.filter((tipoItem: TipoItem) => tipoItem.tipoId == search)
    },   
  },

  actions: {
    async setTiposItens() {
      const { baseURL } = useRuntimeConfig().public;
      const res: TipoItem[] = await $fetch(`${baseURL}/tipos-itens`);
      this.tiposItens = res;
    },
  },
  persist: process.client
  ? {
      storage: localStorage,
    }
  : true,
});
