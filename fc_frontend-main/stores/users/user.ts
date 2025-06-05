import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { User } from "../../types/users/user";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  user: User;
}

export const useUserStore = defineStore("user", {
  state: (): stateInterface => ({
    user: {} as User,
  }),

  getters: {
    getPessoa(): any {
      return this.user.pessoa?.pessoa;
    },
    getEmpresa(): any {
      return this.user.pessoa?.empresa
       ? this.user.pessoa?.empresa
       : this.user.pessoa?.pessoa;
    },
    getIsLoggedIn(): boolean {
      return this.user.isLoggedIn;
    },
    getAccessToken(): string {
      return this.user.access_token;
    },
    getUser: (state) => {
      return () =>
        state.user;
    },
  },

  actions: {
    async setUser(usuario: User, isLoggedIn: boolean) {
      this.user = {
        ...usuario,
        isLoggedIn,
      };
    },
    async setLogout() {
      const user = {} as User;
      this.user = {
        ...user,
        isLoggedIn: false,
        access_token: "",
      };
    },

    async updatePessoa(pessoa: any) {
      this.user.pessoa = pessoa
    },
  },
  persist: process.client
    ? {
        storage: localStorage,
      }
    : true,
});
