import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  intervalTime: number;
  extraTimeOut: number;
  take: number;
}

export const useConstantesStore = defineStore("constantes", {
  state: (): stateInterface => ({
    intervalTime: 100 as number,
    extraTimeOut: 400 as number,
    take: 4 as number,    
  }),

  getters: {
    get(): any {
      return {
        intervalTime: this.intervalTime,
        extraTimeOut: this.extraTimeOut,
        take: this.take,
      };
    },
  },

  persist: false,
});
