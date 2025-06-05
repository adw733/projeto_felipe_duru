import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Status } from "../../types/status/status";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  status: Status[];
}

export const useStatusStore = defineStore("status", {
  state: (): stateInterface => ({
    status: [] as Status[],
  }),

  getters: {
    getBy: (state) => {
      return (search: number | string) =>
        state.status.find(
          (status: Status) =>
            status.id === search || status.nome === search
        );
    },
    getAll: (state) => {
      return state.status
    }
  },

  actions: {
    async setStatus() {
      const { baseURL } = useRuntimeConfig().public;
      const res: Status[] = await $fetch(`${baseURL}/status`);
      this.status = res;
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
