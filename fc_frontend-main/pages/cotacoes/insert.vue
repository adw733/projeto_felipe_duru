<template>
  <div>
    <PaginasTitulos title="Cotação"></PaginasTitulos>
    <PaginasCotacoesEditInsert :cotacaoProp="cotacao" @salvar="clickSalvar" />
  </div>
</template>

<script setup lang="ts">
import { Produto } from "../../types/produtos/produto";
import { useStatusStore } from "../../stores/status/status";
import { useControleStore } from "../../stores/variaveis/controle";
import { Cotacao } from "../../types/cotacoes/cotacao";
import { useUserStore } from "../../stores/users/user";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const statusStore = useStatusStore();
const controleStore = useControleStore();
const userStore = useUserStore();

const cotacao = ref<Cotacao>({
  statusId: statusStore.getBy("Cadastro")?.id || 0,
  tipoId: controleStore.getContexto as number,
  data: new Date(),
  empresaId: userStore.getEmpresa.id as number,
  empresa: userStore.getEmpresa,
  nome: null,
  solicitanteId: userStore.getPessoa.id as number,
  solicitante: userStore.getPessoa,
  cotacoesItens: [],
  cotacoesRespostas: [],
});

const clickSalvar = async (body: Produto) => {
  try {
    const response = await post(`cotacoes`, body);
    useRouter().push(`/cotacoes/${response.uuid}`);
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
