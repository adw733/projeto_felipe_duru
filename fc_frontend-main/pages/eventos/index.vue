<template>
  <BasesList
    titulo="Eventos"
    rota="eventos"
    :extraFilter="{ dataInicio: true, dataFim: true }"
  >
    <template v-slot="{ dataset: evento }">
      <NuxtLink class="nuxtLink" :to="`/eventos/${evento.uuid}`">
        <v-card max-width="500" height="400">
          <v-img
            v-if="evento.anexo"
            class="align-end text-white"
            height="200"
            :src="evento.anexo.url"
            cover
          >
            <v-card-title>{{ evento.titulo }}</v-card-title>
          </v-img>
          <v-img
          v-else
            class="align-end text-white"
            height="200"
            src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            cover
          >
            <v-card-title>{{ evento.titulo }}</v-card-title>
          </v-img>    

          <v-card-subtitle class="pt-4">
            {{ evento.palestrante }}
          </v-card-subtitle>

          <v-card-text class="spaceCardTextAction">
            <div class="three-lines">{{ evento.resumo }}</div>
          </v-card-text>

          <v-card-actions>
            <v-row>
              <v-col align="end">
                <v-btn @click.prevent="share(evento)" icon="mdi-share"> </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </NuxtLink>
    </template>
  </BasesList>
  <PaginasBottomNavigation
    pagina="eventos"
    :pageModeView="true"
    :extra-buttons="{ hasBack: true, hasIncluir: isLoggedIn }"
  ></PaginasBottomNavigation>
</template>
<script setup lang="ts">
import { Evento } from "../../types/eventos/evento";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const share = (evento: Evento) => {
  const shareData = {
    title: evento.titulo,
    text: evento.resumo,
    url: `${window.location.href}/${evento.uuid}`,
  };
  navigator.share(shareData);
};

/// HEAD
useHead({
  title: "Portal Fecom | Eventos",
  meta: [{ name: "Eventos", content: "Eventos, cursos, treinamentos" }],
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
