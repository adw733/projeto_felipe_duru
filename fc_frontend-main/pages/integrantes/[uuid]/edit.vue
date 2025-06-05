<template>
  <div v-if="integrante">
    <PaginasTitulos title="Integrante"></PaginasTitulos>
    <PaginasIntegrantesEditInsert
      :integranteProp="integrante"
      :uuid="uuid"
      @salvar="clickSalvar"
    />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-expansion-panels multiple v-model="panelOpen">
          <PaginasIntegrantesPanelTelefone
            :pessoa="integrante"
            :pageModeView="false"
          />
          <PaginasIntegrantesPanelEmail
            :pessoa="integrante"
            :pageModeView="false"
          />
          <PaginasIntegrantesPanelPerfil
            :pessoa="integrante"
            :pageModeView="false"
          />
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { Pessoa } from "../../../types/pessoas/pessoa";
import { PessoaTelefone } from "../../../types/pessoas/pessoa-telefone";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const tipoItemStore = useTipoItemStore();

const { uuid } = useRoute().params;
const integrante = ref(await getId(`pessoas/integrantes/${uuid}`));
const panelOpen = ref([0]);

const clickSalvar = async (body: Pessoa) => {
  try {
    body.pessoasTelefones?.forEach((pessoaTelefone: PessoaTelefone) => {
      const mask =
        tipoItemStore.getBy("telefoneCelular")?.id == pessoaTelefone.tipoId
          ? "+55 (##) # ####-####"
          : "+55 (##) ####-####";

      pessoaTelefone.numero = unMask(pessoaTelefone.numero, mask);
    });

    const response = await put(`pessoas/integrantes/${uuid}`, body);
    integrante.value = response;
    useRouter().push(`/integrantes/${uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
setTimeout(() => {
  useHead({
    title: `Integrante | ${integrante.value.nome || ""}`,
    meta: [
      {
        name: integrante.value.nome || "",
        content: integrante.value.nome || "",
      },
    ],
  });
}, 150);
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
