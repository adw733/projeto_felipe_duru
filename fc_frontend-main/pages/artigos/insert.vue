<template>
  <div>
    <PaginasTitulos title="Artigo"></PaginasTitulos>
    <PaginasArtigosEditInsert :artigoProp="artigo" @salvar="clickSalvar" />
  </div>
</template>

<script setup lang="ts">
import { Artigo } from "../../types/artigos/artigo";
import { useStatusStore } from "../../stores/status/status";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const statusStore = useStatusStore();

const artigo = ref<Artigo>({
  titulo: "",
  resumo: "",
  texto: "",
  autor: "",
  tags: "",
  dataPublicacao: null,
  statusId: statusStore.getBy("Ativo")?.id,
});

const clickSalvar = async (body: Artigo) => {
  try {
    const response = await post(`artigos`, body);
    useRouter().push(`/artigos/${response.uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
useHead({
  title: `Artigo | Novo artigo`,
  meta: [],
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
