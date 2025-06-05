<template>
  <div v-if="cotacao">
    <PaginasTitulos title="Cotação"></PaginasTitulos>
    <PaginasCotacoesView :cotacaoProp="cotacao" :uuid="uuid" :is-view="true" />

    <PaginasBottomNavigation
      pagina="cotacoes"
      :rota="uuid"
      :pageModeView="true"
      :extraButtons="{ hasBack: true, hasEdit: true }"
    ></PaginasBottomNavigation>
  </div>
</template>
<script setup lang="ts">
import { useStatusStore } from "../../../stores/status/status";
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { useControleStore } from "../../../stores/variaveis/controle";
import { useRegiaoStore } from "../../../stores/regioes/regiao";
import { Cotacao } from "../../../types/cotacoes/cotacao";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const statusStore = useStatusStore();
const tipoItemStore = useTipoItemStore();
const controleStore = useControleStore();
const regiaoStore = useRegiaoStore();

const { uuid } = useRoute().params;
const cotacao = ref<Cotacao>(
  (await getId<Cotacao>(
    `cotacoes/${uuid}?modalidadeId=${controleStore.getModalidade}`
  )) || ({} as Cotacao)
);

const isModoCompras = computed(() => {
  return (
    tipoItemStore.getBy("modalidadeCompras")?.id === controleStore.getModalidade
  );
});

const regioes = computed(() => {
  return regiaoStore.getRegioes;
});

const panels = ref<Array<any>>([]);

/// HEAD
setTimeout(() => {
  useHead({
    title: `Cotação | ${cotacao.value?.nome || ""}`,
    meta: [
      {
        name: cotacao.value?.nome || "",
        content: cotacao.value?.nome || "",
      },
    ],
  });
}, 150);

// onMounted(async () => {
//   cotacao.value = (await getId<Cotacao>(`cotacoes/${uuid}`)) || {} as Cotacao
// })
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
