import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Regiao } from "../../types/regioes/regiao";
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


interface stateInterface {
  regioes: Regiao[];
}

export const useRegiaoStore = defineStore("regiao", {
  state: (): stateInterface => ({
    regioes: [] as Regiao[],
  }),
  
  getters: {
    getRegioes: (state) => {
      return state.regioes
    },
    
    getBy: (state) => {
      return (search: number | string) =>
        state.regioes.find(
          (regiao: Regiao) =>
            regiao.id === search || regiao.nome === search
        );
    },
  },

  actions: {
    async setRegioes() {
      const { baseURL } = useRuntimeConfig().public;
      const res: Regiao[] = await $fetch(
        `${baseURL}/regioes`
      );
      this.regioes = res;
    },
  },
  persist: process.client
  ? {
      storage: localStorage,
    }
  : true,
});
