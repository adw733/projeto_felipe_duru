<template>
  <v-pagination
    v-model="page"
    class="my-8"
    :length="paginationLenght"
    rounded="circle"
  ></v-pagination>
</template>

<script setup lang="ts">
import { useConstantesStore } from "../../stores/variaveis/constantes";
import { useControleStore } from "../../stores/variaveis/controle";

/// CONTEUDO
const constantesStore = useConstantesStore();
const constantes = constantesStore;

const controleStore = useControleStore();
const controle = controleStore;

const page = ref(controle.page);

const paginationLenght = computed(() => {
  return Math.ceil(controle.totalRecord / constantes.take);
});

watch(page, () => {
  controle.setPage(page.value);
  controle.setSkip(constantes.take * (controle.page - 1));
});
</script>

<style scoped></style>
