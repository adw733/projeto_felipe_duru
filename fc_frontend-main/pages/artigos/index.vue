<template>
  <BasesList titulo="Artigos" rota="artigos">
    <template v-slot="{ dataset: artigo }">
      <NuxtLink class="nuxtLink" :to="`/artigos/${artigo.uuid}`">
        <v-card max-width="500" height="400">
          <v-img
            v-if="artigo.anexo"
            class="align-end text-white"
            height="200"
            :src="artigo.anexo.url"
            cover
          >
            <v-card-title>{{ artigo.titulo }}</v-card-title>
          </v-img>
          <v-img
          v-else
            class="align-end text-white"
            height="200"
            src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            cover
          >
            <v-card-title>{{ artigo.titulo }}</v-card-title>
          </v-img>        

          <v-card-subtitle class="pt-4">
            {{ artigo.autor }}
          </v-card-subtitle>

          <v-card-text class="spaceCardTextAction">
            <div class="three-lines">{{ artigo.resumo }}</div>
          </v-card-text>

          <v-card-actions>
            <v-row>
              <v-col align="end">
                <v-btn @click.prevent="share(artigo)" icon="mdi-share"> </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </NuxtLink>
    </template>
  </BasesList>
  <PaginasBottomNavigation
    pagina="artigos"
    :pageModeView="true"
    :extra-buttons="{ hasBack: true, hasIncluir: isLoggedIn }"
  ></PaginasBottomNavigation>
</template>
<script setup lang="ts">
import { Artigo } from "../../types/artigos/artigo";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const share = (artigo: Artigo) => {
  const shareData = {
    title: artigo.titulo,
    text: artigo.resumo,
    url: `${window.location.href}/${artigo.uuid}`,
  };
  navigator.share(shareData);
};

/// HEAD
useHead({
  title: "Portal Fecom | Artigos",
  meta: [{ name: "Artigos", content: "Artigos, cursos, treinamentos" }],
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
