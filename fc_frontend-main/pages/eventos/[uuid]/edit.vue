<template>
  <div>
    <PaginasTitulos title="Evento"></PaginasTitulos>
    <PaginasEventosEditInsert
      :eventoProp="evento"
      :uuid="uuid"
      @salvar="clickSalvar"
    />
  </div>
</template>

<script setup lang="ts">
import { Evento } from "../../../types/eventos/evento";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const { uuid } = useRoute().params;
const evento = ref(await getId(`eventos/${uuid}`));

const clickSalvar = async (body: Evento) => {
  try {
    await put(`eventos/${uuid}`, body);
    useRouter().push(`/eventos/${uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
useHead({
  title: `Evento | ${evento?.value?.titulo || ""}`,
  meta: [
    {
      name: evento?.value?.titulo || "",
      content: evento?.value?.descricao || "",
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
