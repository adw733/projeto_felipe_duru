<template>
  <BasesList
    titulo="Fornecedores"
    rota="pessoas/fornecedores"
    rotaFrontend="fornecedores"
    layout="list"
    :extra-filter="{
      tipoGrupo: true,
      estado: true,
      cidade: true,
    }"
  >
    <template v-slot="{ dataset: fornecedor }">
      <v-list-item :value="fornecedor" @click="clickFornecedor(fornecedor)">
        <v-row align="center" class="my-1">
          <v-col cols="auto">
            <v-avatar size="50">
              <v-img
                v-if="fornecedor.anexo"
                :src="fornecedor.anexo.url"
                :alt="fornecedor.nome"
              />              
              <v-icon v-else size="50"> mdi-account </v-icon>
            </v-avatar>
          </v-col>

          <v-col cols="auto">
            <v-row>
              <v-col>
                <span class="text-body-1 font-weight-medium">{{
                  fornecedor.nomeAlternativo || fornecedor.nome
                }}</span>
              </v-col>
            </v-row>
            <v-row class="mt-n7">
              <v-col>
                <span class="text-body-2"> {{ fornecedor.areaAtuacao }}</span>
              </v-col>
            </v-row>

            <v-row class="mt-n7">
              <v-col>
                <span class="text-body-2">
                  {{ getEndereco(fornecedor) }}
                </span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-list-item>
      <v-row>
        <v-col>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </template>
  </BasesList>
  <PaginasFornecedoresView
    v-model="openDetalhe"
    :fornecedor="fornecedorDetalhe"
  />
  <PaginasBottomNavigation
    pagina="fornecedores"
    :extraButtons="{
      hasBack: true,
      hasEdit: false,
    }"
    :pageModeView="true"
  ></PaginasBottomNavigation>
</template>
<script setup lang="ts">
import { PessoaEndereco } from "../../types/pessoas/pessoa-endereco";
import { Pessoa } from "../../types/pessoas/pessoa";
import { useCidadeStore } from "../../stores/cidades/cidade";
import { useEstadoStore } from "../../stores/estados/estado";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const cidadeStore = useCidadeStore();
const estadoStore = useEstadoStore();
const openDetalhe = ref<boolean>(false);
const fornecedorDetalhe = ref<Pessoa>({} as Pessoa);

const clickFornecedor = (fornecedor: Pessoa) => {
  openDetalhe.value = true;
  fornecedorDetalhe.value = fornecedor;
};

const getEndereco = (fornecedor: Pessoa) => {
  const endereco: PessoaEndereco | null = fornecedor.pessoasEnderecos
    ? fornecedor?.pessoasEnderecos[0]
    : null;
  if (endereco) {
    const cidade = cidadeStore.getBy(endereco.cidadeId);
    const estado = estadoStore.getBy(endereco.estadoId);

    return `${cidade?.nome} - ${estado?.nomeAlternativo}`;
  }
};

/// HEAD
useHead({
  title: "Portal Fecom | Fornecedores",
  meta: [{ name: "Fornecedores", content: "Fornecedores" }],
  // script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
});
</script>

<style lang="scss" scoped>
.three-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: normal;
}
.spaceCardTextAction {
  height: auto;
}
</style>
