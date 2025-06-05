<template>
  <div>
    <PaginasTitulos title="Artigo"></PaginasTitulos>
    <PaginasArtigosEditInsert
      :artigoProp="artigo"
      :uuid="uuid"
      @salvar="clickSalvar"
    />
  </div>
</template>

<script setup lang="ts">
import { Artigo } from "../../../types/artigos/artigo";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const { uuid } = useRoute().params;
const artigo = ref(await getId(`artigos/${uuid}`));

const clickSalvar = async (body: Artigo) => {
  try {
    await put(`artigos/${uuid}`, body);
    useRouter().push(`/artigos/${uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
useHead({
  title: `Artigo | ${artigo?.value?.titulo || ""}`,
  meta: [
    {
      name: artigo?.value?.titulo || "",
      content: artigo?.value?.descricao || "",
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
