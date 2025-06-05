<template>
  <div v-if="integrante">
    <PaginasTitulos title="Integrante"></PaginasTitulos>
    <PaginasIntegrantesEditInsert
      :integranteProp="integrante"
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
import { useTipoItemStore } from "../../stores/tipos/tipo-item";
import { useStatusStore } from "../../stores/status/status";
import { useUserStore } from "../../stores/users/user";
import { Pessoa } from "../../types/pessoas/pessoa";
import { PessoaTelefone } from "../../types/pessoas/pessoa-telefone";
import { PessoaPerfil } from "../../types/pessoas/pessoa-perfil";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const panelOpen = ref([0, 1, 2]);

const userStore = useUserStore();
const empresa = userStore.getEmpresa;

const statusStore = useStatusStore();

const tipoItemStore = useTipoItemStore();

const integrante = ref<Pessoa>({
  statusId: statusStore.getBy("Cadastro")?.id || 0,
  tipoId: tipoItemStore.getBy("pessoaFisica")?.id || 0,
  nome: "",
  nomeAlternativo: "",
  dataNascimento: "",
  pessoasEmails: [
    {
      email: "",
      isAtivo: false,
      pessoaId: null,
    },
  ],
  pessoasPerfis: new Array<PessoaPerfil>(),
  pessoasTelefones: new Array<PessoaTelefone>(),
  pessoasEmpresas: [
    {
      statusId: statusStore.getBy("Ativo")?.id || 0,
      empresaId: empresa.id,
      pessoaId: null,
    },
  ],
});

const clickSalvar = async (body: Pessoa) => {
  try {
    body.pessoasTelefones?.forEach((pessoaTelefone: PessoaTelefone) => {
      const mask =
        tipoItemStore.getBy("telefoneCelular")?.id == pessoaTelefone.tipoId
          ? "+55 (##) # ####-####"
          : "+55 (##) ####-####";

      pessoaTelefone.numero = unMask(pessoaTelefone.numero, mask);
    });

    const response = await post(`pessoas/integrantes`, body);
    useRouter().push(`/integrantes/${response.uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
setTimeout(() => {
  useHead({
    title: `Integrante`,
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
