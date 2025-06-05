<template>
  <BasesList
    titulo="Convites"
    rota="convites"
    rotaFrontend="convites"
    layout="list"
  >
    <template v-slot="{ dataset: convite }">
      <NuxtLink class="nuxtLink" :to="`/convites/${convite.uuid}`">
        <v-row align="center" class="ma-1">
          <v-col>
            <v-row>
              <v-col>
                <span class="text-h6 font-weight-bold">{{
                  convite.nomeEmpresa
                }}</span>
              </v-col>
            </v-row>
            <v-row class="mt-n7">
              <v-col>
                <span class="text-body-1">{{ convite.nomeContato }}</span>
              </v-col>
            </v-row>
            <v-row class="mt-n7">
              <v-col>
                <span v-if="convite.emailContato" class="text-caption"
                  >{{ convite.emailContato }} /
                  <span v-if="convite.celularContato" class="text-caption"
                    >{{ mask(convite.celularContato, ["(##) # ####-####"]) }}
                  </span></span
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </NuxtLink>
    </template>
  </BasesList>
  <PaginasBottomNavigation
    pagina="convites"
    :pageModeView="true"
    :extra-buttons="{ hasBack: true, hasIncluir: true }"
  ></PaginasBottomNavigation>
</template>

<script setup lang="ts">
/// PAGINA
definePageMeta({
  layout: "menu",
});

/// HEAD
useHead({
  title: "Portal Fecom | Convites",
  meta: [{ name: "Convites", content: "Convites, cursos, treinamentos" }],
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
  height: 110px;
}
</style>
