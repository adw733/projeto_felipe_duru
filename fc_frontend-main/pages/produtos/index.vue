<template>
  <BasesList titulo="Produtos" rota="produtos">
    <template v-slot="{ dataset: produto }">
      <NuxtLink class="nuxtLink" :to="`/produtos/${produto.uuid}`">
        <v-card max-width="500">
          <v-img
            v-if="produto.anexo"
            class="align-end text-white"
            height="200"
            :src="produto.anexo.url"
            cover
          />
          <v-img
          v-else
            class="align-end text-white"
            height="200"
            src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            cover
          />
          <v-card-text class="spaceCardTextAction">
            <div class="three-lines">
              <v-row class="mb-n6">
                <v-col align="start">
                  <v-chip
                    :color="statusStore.getBy(produto.statusId)?.options.cor"
                    text-color="white"
                    size="small"
                  >
                    {{ statusStore.getBy(produto.statusId)?.nome }}
                  </v-chip>
                </v-col>
                <v-col align="end">
                  <v-chip
                    :color="tipoItemStore.getBy(produto.tipoId)?.options?.cor"
                    text-color="white"
                    size="small"
                  >
                    {{ tipoItemStore.getBy(produto.tipoId)?.codigo }}
                  </v-chip>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <span class="text-body-1 font-weight-medium">
                    {{
                      `${produto.produto} ${
                        produto.marca ? produto.marca : ""
                      } ${produto.modelo ? ` (${produto.modelo})` : ""}${
                        produto.fabricante ? ` - ${produto.fabricante}` : ""
                      } `
                    }}
                  </span>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <span class="text-body-2 font-weight-medium">
                    {{ `${produto.caracteristicas} ` }}
                  </span>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </NuxtLink>
    </template>
  </BasesList>
  <PaginasBottomNavigation
    pagina="produtos"
    :pageModeView="true"
    :extra-buttons="{ hasIncluir: true }"
  ></PaginasBottomNavigation>
</template>
<script setup lang="ts">
import { useStatusStore } from "../../stores/status/status";
import { useTipoItemStore } from "../../stores/tipos/tipo-item";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const statusStore = useStatusStore();
const tipoItemStore = useTipoItemStore();

/// HEAD
useHead({
  title: "Portal Fecom | Produtos",
  meta: [{ name: "Produtos", content: "Produtos" }],
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
