<template>
  <BasesList
    titulo="Integrantes"
    rota="pessoas/integrantes"
    rotaFrontend="integrantes"
    layout="list"
  >
    <template v-slot="{ dataset: integrante }">
      <NuxtLink class="nuxtLink" :to="`/integrantes/${integrante.uuid}`">
        <v-row align="center" class="my-1">
          <v-col cols="auto">
            <v-avatar size="50">
              <v-img
                v-if="integrante.anexo"
                :src="integrante.anexo.url"
                :alt="integrante.nome"
              />              
              <v-icon v-else size="50"> mdi-account </v-icon>
            </v-avatar>
          </v-col>

          <v-col cols="auto">
            <v-row>
              <v-col>
                <span class="text-body-1 font-weight-medium">{{
                  integrante.nomeAlternativo || integrante.nome
                }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </NuxtLink>
    </template>
  </BasesList>
  <PaginasBottomNavigation
    pagina="integrantes"
    :pageModeView="true"
    :extra-buttons="{ hasIncluir: true }"
  ></PaginasBottomNavigation>
</template>
<script setup lang="ts">
/// PAGINA
definePageMeta({
  layout: "menu",
});

/// HEAD
useHead({
  title: "Portal Fecom | Integrantes",
  meta: [{ name: "Integrantes", content: "Integrantes" }],
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
