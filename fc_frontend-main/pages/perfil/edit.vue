<template>
  <div v-if="pessoa">
    <PaginasTitulos title="Perfil"></PaginasTitulos>
    <PaginasPerfilEditInsert :pessoaProp="pessoa" @salvar="clickSalvar" />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-expansion-panels multiple v-model="panels">
          <PaginasPerfilPanelDocumento
            v-if="isPessoaJuridica"
            v-model="pessoa.pessoasDocumentos"
            :pessoa="pessoa"
            :pageModeView="false"
          />
          <PaginasPerfilPanelTelefone
            v-model="pessoa.pessoasTelefones"
            :pessoa="pessoa"
            :pageModeView="false"
          />
          <PaginasPerfilPanelEndereco
            v-if="isPessoaJuridica"
            v-model="pessoa.pessoasEnderecos[0]"
            :pessoa="pessoa"
            :pageModeView="false"
          />
          <PaginasPerfilPanelEmail
            v-model="pessoa.pessoasEmails[0]"
            :pessoa="pessoa"
            :pageModeView="false"
          />
          <PaginasPerfilPanelSite
            v-if="isPessoaJuridica"
            v-model="pessoa.pessoasSites"
            :pessoa="pessoa"
            :pageModeView="false"
          />
          <PaginasPerfilPanelPerfil
            v-model="pessoa.pessoasPerfis"
            :pessoa="pessoa"
            :pageModeView="false"
          />
          <PaginasPerfilPanelGrupoItem
            v-model="pessoa.pessoasGruposItens"
            :pessoa="pessoa"
            :pageModeView="false"
          />
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/users/user";
import { useTipoItemStore } from "../../stores/tipos/tipo-item";
import { Pessoa } from "../../types/pessoas/pessoa";
import { PessoaDocumento } from "../../types/pessoas/pessoa-documento";
import { PessoaTelefone } from "../../types/pessoas/pessoa-telefone";
import { PessoaEndereco } from "../../types/pessoas/pessoa-endereco";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const userStore = useUserStore();
const pessoa = ref(JSON.parse(JSON.stringify(userStore.getPessoa)));

const tipoItemStore = useTipoItemStore();

const panels = ref<Array<any>>([]);

const isPessoaJuridica = computed(() => {
  return pessoa.value.tipoId === tipoItemStore.getBy("pessoaJuridica")?.id;
});

const clickSalvar = async (body: Pessoa) => {
  try {
    body.pessoasDocumentos?.forEach((pessoaDocumento: PessoaDocumento) => {
      const mask =
        tipoItemStore.getBy("CNPJ")?.id == pessoaDocumento.tipoId
          ? "##.###.###/####-##"
          : tipoItemStore.getBy("inscricaoEstadual")?.id ==
            pessoaDocumento.tipoId
          ? "###.###.###.###"
          : "##############";

      pessoaDocumento.numero = unMask(pessoaDocumento.numero, mask);
    });
    body.pessoasTelefones?.forEach((pessoaTelefone: PessoaTelefone) => {
      const mask =
        tipoItemStore.getBy("telefoneCelular")?.id == pessoaTelefone.tipoId
          ? "+55 (##) # ####-####"
          : "+55 (##) ####-####";

      pessoaTelefone.numero = unMask(pessoaTelefone.numero, mask);
    });
    body.pessoasEnderecos?.forEach((pessoaEndereco: PessoaEndereco) => {
      const mask = "#####-###";

      pessoaEndereco.cep = unMask(pessoaEndereco.cep, mask);
    });

    const res = await put(`pessoas`, body);
    userStore.updatePessoa(res);
    useRouter().push(`/perfil`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
setTimeout(() => {
  useHead({
    title: "Portal Fecom | Perfil",
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
