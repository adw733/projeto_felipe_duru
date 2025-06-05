<template>
  <div>
    <PaginasTitulos title="Produto"></PaginasTitulos>
    <PaginasProdutosEditInsert :produtoProp="produto" @salvar="clickSalvar" />
  </div>
</template>

<script setup lang="ts">
import { Produto } from "../../types/produtos/produto";
import { useStatusStore } from "../../stores/status/status";
import { useControleStore } from "../../stores/variaveis/controle";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const statusStore = useStatusStore();
const controleStore = useControleStore();

const produto = ref<Produto>({
  statusId: statusStore.getBy("Cadastro")?.id || 0,
  tipoId: controleStore.contextoId || 0,
  empresaId: null,
  unidadeMedidaId: null,
  produto: null,
  marca: null,
  modelo: null,
  fabricante: null,
  partNumber: null,
  ncm: null,
  observacoes: null,
  caracteristicas: null,
  custoUltimaCompra: null,
  produtosGrupositens: [],
});

const clickSalvar = async (body: Produto) => {
  try {
    const response = await post(`produtos`, body);
    useRouter().replace(`/produtos/${response.uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
useHead({
  title: `Produto | Novo produto`,
  meta: [],
  // script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
});
</script>

<style scoped>
.date {
  color: #7a7a7a;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 20px;
  border-radius: 5px;
  width: 100%;
}
</style>
