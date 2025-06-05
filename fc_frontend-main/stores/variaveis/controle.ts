import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

interface stateInterface {
  loading: boolean;
  pageModeView: boolean;
  skip: number;
  page: number;
  totalRecord: number;
  contextoId: number | null;
  modalidadeId: number | null;
}

export const useControleStore = defineStore("controle", {
  state: (): stateInterface => ({
    loading: false as boolean,
    pageModeView: true as boolean,
    skip: 0 as number,
    page: 1 as number,
    totalRecord: 0 as number,
    contextoId: 501 as number | null,
    modalidadeId: 1201 as number | null,
  }),

  getters: {
    get(): any {
      return {
        loading: this.loading,
        pageModeView: this.pageModeView,
        skip: this.skip,
        page: this.page,
        totalRecord: this.totalRecord,
        contextoId: this.contextoId,
        modalidadeId: this.modalidadeId,
      };
    },

    getModalidade: (state) => {
      return state.modalidadeId;
    },

    getLoading: (state) => {
      return state.loading;
    },

    getContexto: (state) => {
      return state.contextoId;
    },
  },

  actions: {
    async setLoading(loading: boolean) {
      this.loading = loading;
    },

    async setPageModeView(pageModeView: boolean) {
      this.pageModeView = pageModeView;
    },

    async setSkip(skip: number) {
      this.skip = skip;
    },

    async setPage(page: number) {
      this.page = page;
    },

    async setTotalRecord(totalRecord: number) {
      this.totalRecord = totalRecord;
    },

    async setContextoId(contextoId: number | null) {
      this.contextoId = contextoId;
    },

    async setModalidadeId(modalidadeId: number | null) {
      this.modalidadeId = modalidadeId;
    },

    async resetPage() {
      this.skip = 0;
      this.page = 1;
      this.totalRecord = 0;
    },
  },
  persist: true,
});
