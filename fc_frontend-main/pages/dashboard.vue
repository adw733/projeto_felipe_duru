<template>
  <PaginasTitulos title="Dashboard"></PaginasTitulos>
  <v-row>
    <v-col align="start" cols="6">
      <span class="text-h6"> {{ pessoa.nomeAlternativo }} </span>
    </v-col>
    <v-col align="end" cols="6">
      <span class="text-h6"> {{ pessoa.nomeAlternativo }} </span>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useUserStore } from "../stores/users/user";

/// PAGINA
definePageMeta({
  layout: "menu",
  middleware: "auth",
});

// CONTEUDO
const userStore = useUserStore();
const pessoa = userStore.getPessoa;

/// HEAD
useHead({
  title: "Portal Fecom | Dashboard",
  meta: [{ name: "Eventos", content: "Dashboard" }],
});
</script>

<style lang="scss" scoped></style>
