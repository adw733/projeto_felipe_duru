<template>
  <div v-if="produto">
    <PaginasTitulos title="Produto"></PaginasTitulos>
    <PaginasProdutosEditInsert
      :produtoProp="produto"
      :uuid="uuid"
      @salvar="clickSalvar"
    />
  </div>
</template>

<script setup lang="ts">
import { Produto } from "../../../types/produtos/produto";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const { uuid } = useRoute().params;
const produto = ref<any>(await getId(`produtos/${uuid}`));

const clickSalvar = async (body: Produto) => {
  try {
    await put(`produtos/${uuid}`, body);
    useRouter().replace(`/produtos/${uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
useHead({
  title: `Produto | ${produto?.value?.produto || ""}`,
  meta: [
    {
      name: produto?.value?.produto || "",
      content: produto?.value?.caracteristicas || "",
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
