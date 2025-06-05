<template>
  <div v-if="cotacao">
    <PaginasTitulos title="Cotação"></PaginasTitulos>
    <PaginasCotacoesEditInsert
      v-if="isModoCompras"
      :cotacaoProp="cotacao"
      :uuid="uuid"
      @salvar="clickSalvar"
    />

    <PaginasCotacoesView v-else :cotacaoProp="cotacao" :uuid="uuid" :is-view="false" @salvar="clickSalvar"/>

  </div>
</template>

<script setup lang="ts">
import { useControleStore } from "../../../stores/variaveis/controle";
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { Cotacao } from "../../../types/cotacoes/cotacao";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// TIPO ITEM
const tipoItemStore = useTipoItemStore();

/// CONTROLE
const controleStore = useControleStore();

/// CONTEUDO
const { uuid } = useRoute().params;
const cotacao = ref<any>(await getId(`cotacoes/${uuid}?modalidadeId=${controleStore.getModalidade}`));

const clickSalvar = async (body: Cotacao) => {
  try {
    await put(`cotacoes/${uuid}`, body);
    useRouter().push(`/cotacoes/${uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// MODO
const isModoCompras = computed(() => {
  return (
    tipoItemStore.getBy("modalidadeCompras")?.id === controleStore.getModalidade
  );
});


/// HEAD
useHead({
  title: `Cotação | ${cotacao?.value?.nome || ""}`,
  meta: [
    {
      name: cotacao?.value?.nome || "",
      content: cotacao?.value?.nome || "",
    },
  ],
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
