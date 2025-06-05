import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { snackbarInterface } from "../../types/variaveis/snackbar";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  snackbar: snackbarInterface;
}

export const useSnackbarStore = defineStore("snackbar", {
  state: (): stateInterface => ({
    snackbar: {} as snackbarInterface,
  }),

  getters: {
    get(): any {
      return this.snackbar;
    },
  },

  actions: {
    async set(snackbar: snackbarInterface | null) {
      if(snackbar) {
        this.snackbar = {
          ...snackbar,
        };
      } else {
        this.snackbar = {} as snackbarInterface
      }

      
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
