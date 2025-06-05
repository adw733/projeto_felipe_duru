import { useControleStore } from "../stores/variaveis/controle";
import { useUserStore } from "../stores/users/user";
import { Produto } from "../types/produtos/produto";
import { useDisplay } from "vuetify";

/// DISPLAY
export const mdAndUp = computed(() => {
  const { mdAndUp } = useDisplay();

  return mdAndUp.value
})

export const isLoggedIn = computed(() => {
  const userStore = useUserStore();

  return userStore.user.isLoggedIn;
});

export const clickMenu = () => {
  // controle
  const controleStore = useControleStore();
  const controle = controleStore;

  controle.resetPage();
};

export const produtoFormata = (objProduto: Produto) => {
  const produto = objProduto.produto;
  const marca = objProduto.marca ? `, ${objProduto.marca}` : "";
  const modelo = objProduto.modelo ? ` (mod.: ${objProduto.modelo})` : "";
  const fabricante = objProduto.fabricante
    ? `, ${objProduto.fabricante}`
    : "";
  const caracteristicas = objProduto.caracteristicas
    ? `, ${objProduto.caracteristicas}`
    : "";

  return `${produto}${marca}${modelo}${fabricante}${caracteristicas}`;
};
