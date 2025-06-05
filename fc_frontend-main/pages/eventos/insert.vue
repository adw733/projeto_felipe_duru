<template>
  <div>
    <PaginasTitulos title="Evento"></PaginasTitulos>
    <PaginasEventosEditInsert :eventoProp="evento" @salvar="clickSalvar" />
  </div>
</template>

<script setup lang="ts">
import { Evento } from "../../types/eventos/evento";
import { useStatusStore } from "../../stores/status/status";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const statusStore = useStatusStore();

const evento = ref<Evento>({
  titulo: "",
  resumo: "",
  descricao: "",
  endereco: "",
  palestrante: "",
  duracao: "",
  data: null,
  hora: "",
  statusId: statusStore.getBy("Cadastro")?.id,
  tipoId: null,
});

const clickSalvar = async (body: Evento) => {
  try {
    const response = await post(`eventos`, body);
    useRouter().push(`/eventos/${response.uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
useHead({
  title: `Evento | Novo evento`,
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
