<template>
  <BasesList
    titulo="Cotações"
    rota="cotacoes"
    :extraFilter="{
      dataInicio: true,
      dataFim: true,
      prioridade: true,
      status: true,
      resposta: true,
      busca: true,
    }"
    layout="list"
  >
    <template v-slot="{ dataset: cotacao }: { dataset: Cotacao }">
      <NuxtLink class="nuxtLink" :to="`/cotacoes/${cotacao.uuid}`">
        <div
          v-if="cotacao.prioridadeId"
          :style="`border-left: 5px solid ${
            tipoItemStore.getBy(cotacao.prioridadeId)?.options?.cor
          }`"
        >
          <v-container>
            <v-row>
              <v-col>
                <v-row>
                  <v-col cols="4">
                    <span class="text-body-1">#{{ cotacao.id }}</span>
                  </v-col>
                  <v-col align="center" cols="3">
                    <v-chip
                      variant="flat"
                      size="x-small"
                      :color="statusStore.getBy(cotacao.statusId)?.options.cor"
                    >
                      <span class="text-body-1">{{
                        statusStore.getBy(cotacao.statusId)?.nome
                      }}</span>
                    </v-chip>
                  </v-col>
                  <v-col align="end" cols="5">
                    <span class="text-body-1">
                      {{ dateFormat(cotacao.data, "dd/MM/yyyy") }}
                    </span>
                  </v-col>
                </v-row>
                <v-row class="mt-n3">
                  <v-col>
                    <span class="text-h6 font-weight-medium">{{
                      cotacao.nome
                    }}</span>
                  </v-col>
                </v-row>
                <div v-if="isModoCompras">
                  <v-row class="mt-n4">
                    <v-col
                      v-if="
                        cotacao.compradorId !== cotacao.solicitanteId &&
                        (cotacao.solicitante?.nomeAlternativo ||
                          cotacao.solicitante?.nome)
                      "
                    >
                      <span class="text-body-2 font-weight-bold">
                        solicitante:
                      </span>

                      <span class="text-body-1">
                        {{
                          cotacao.solicitante.nomeAlternativo ||
                          cotacao.solicitante.nome
                        }}
                      </span>
                    </v-col>
                  </v-row>
                  <v-row
                    :class="
                      cotacao.compradorId !== cotacao.solicitanteId
                        ? 'mt-n5'
                        : ''
                    "
                  >
                    <v-col
                      v-if="
                        cotacao.comprador?.nomeAlternativo ||
                        cotacao.comprador?.nome
                      "
                    >
                      <span class="text-body-2 font-weight-bold">
                        comprador:
                      </span>
                      <span class="text-body-1">
                        {{
                          cotacao.comprador.nomeAlternativo ||
                          cotacao.comprador.nome
                        }}
                      </span>
                    </v-col>
                  </v-row>
                </div>
                <div v-else>
                  <v-row class="mt-n4">
                    <v-col>
                      <span class="text-body-2 font-weight-bold">
                        empresa:
                      </span>
                      <span class="text-body-1">
                        {{
                          cotacao.empresa?.nomeAlternativo ||
                          cotacao.empresa?.nome
                        }}
                      </span>
                    </v-col>
                  </v-row>
                </div>
                <v-row v-if="isModoCompras">
                  <v-col>
                    <span class="text-body-2 font-weight-medium">
                      respostas:
                    </span>
                    <span class="text-body-2">
                      {{ respostasTotais(cotacao) }}
                    </span>
                  </v-col>
                </v-row>
                <v-row v-else class="mt-n4">
                  <v-col>
                    <span class="text-body-2 font-weight-medium">
                      Itens respondidos:
                    </span>
                    <span class="text-body-2">
                      {{ cotacao.quantidadeRespostas }}/{{
                        cotacao.cotacoesItens?.length
                      }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </NuxtLink>
    </template>
  </BasesList>
  <PaginasBottomNavigation
    pagina="cotacoes"
    :pageModeView="true"
    :extra-buttons="{ hasIncluir: isModoCompras }"
    :has-modalidade="true"
  ></PaginasBottomNavigation>
</template>
<script setup lang="ts">
import { Cotacao } from "../../types/cotacoes/cotacao";
import { useStatusStore } from "../../stores/status/status";
import { useTipoItemStore } from "../../stores/tipos/tipo-item";
import { useControleStore } from "../../stores/variaveis/controle";
import { CotacaoItem } from "../../types/cotacoes/cotacao-item";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const statusStore = useStatusStore();
const tipoItemStore = useTipoItemStore();
const controleStore = useControleStore();

const isModoCompras = computed(() => {
  return (
    tipoItemStore.getBy("modalidadeCompras")?.id === controleStore.getModalidade
  );
});

const respostasTotais = (cotacao: Cotacao) => {
  let quantidadeRespostas = 0;

  cotacao.cotacoesItens?.forEach((cotacaoItem: CotacaoItem) => {
    quantidadeRespostas += cotacaoItem.cotacaoItemResposta?.length || 0
  })

  return quantidadeRespostas
}

/// HEAD
useHead({
  title: "Portal Fecom | Cotações",
  meta: [{ name: "Cotações", content: "Cotações" }],
  // script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
});
</script>

<style lang="scss" scoped>
.three-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: normal;
}
.spaceCardTextAction {
  height: auto;
}
</style>
