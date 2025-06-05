<template>
  <v-container>
    <v-row v-if="pessoa" justify="center">
      <v-col align="center" cols="12" md="8">
        <v-row>
          <v-col>
            <v-avatar class="overflow-hidden grey" size="70px">
              <v-img
                v-if="pessoa.anexo"
                aspect-ratio="1"
                :src="pessoa.anexo.url"
              />

              <v-icon v-else dark size="70px"> mdi-account </v-icon>
            </v-avatar>
          </v-col>
        </v-row>

        <v-row v-if="isPessoaJuridica">
          <v-col class="d-flex justify-center">
            <v-chip-group
              v-model="pessoa.isFornecedor"
              selected-class="text-blue"
              mandatory
              filter
            >
              <v-chip
                class="text-body-1"
                :variant="pessoa.isFornecedor ? 'outlined' : 'outlined'"
                size="x-small"
                :value="false"
                >Compradora</v-chip
              >
              <v-chip
                class="text-body-1"
                :variant="pessoa.isFornecedor ? 'outlined' : 'outlined'"
                size="x-small"
                :value="true"
                >Fornecedora</v-chip
              >
            </v-chip-group>
          </v-col>
        </v-row>

        <v-row :class="isPessoaJuridica ? 'mt-n5' : 'mt-12'">
          <v-col>
            <v-text-field
              v-model="pessoa.nome"
              clearable
              label="Nome"
              variant="underlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col align="start" class="mt-n5" cols="12" md="8">
            <v-text-field
              v-model="pessoa.nomeAlternativo"
              clearable
              label="Fantasia"
              variant="underlined"
            ></v-text-field>
          </v-col>
          <v-col align="start" class="mt-n5" cols="12" md="4">
            <span class="text-caption"
              >Data {{ isPessoaJuridica ? "abertura" : "nascimento" }}</span
            >
            <input
              v-model="pessoa.dataNascimento"
              class="v-field v-field--appended v-field--variant-underlined v-theme--light v-locale--is-ltr date"
              placeholder="DD/MM/AAAA"
              type="date"
            />
          </v-col>
        </v-row>

        <v-row v-if="isPessoaJuridica">
          <v-col align="start" class="mt-n5" cols="12" md="4">
            <v-select
              v-model="pessoa.formatoJuridicoId"
              :items="formatosJuridicos"
              label="Formato jurídico"
              density="compact"
              item-title="nomeAlternativo"
              item-value="id"
              variant="underlined"
            ></v-select>
          </v-col>
          <v-col align="start" class="mt-n5" cols="12" md="4">
            <v-select
              v-model="pessoa.regimeTributarioId"
              :items="regimesTributarios"
              label="Regime tributário"
              density="compact"
              item-title="nomeAlternativo"
              item-value="id"
              variant="underlined"
            ></v-select>
          </v-col>
          <v-col align="start" class="mt-n5" cols="12" md="4">
            <v-select
              v-model="pessoa.porteId"
              :items="portes"
              label="Regime tributário"
              density="compact"
              item-title="nomeAlternativo"
              item-value="id"
              variant="underlined"
            ></v-select>
          </v-col>
        </v-row>

        <v-row v-if="isPessoaJuridica" class="mt-n5">
          <v-col>
            <v-text-field
              v-model="pessoa.areaAtuacao"
              clearable
              label="Atuação principal"
              variant="underlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="isPessoaJuridica" class="mt-n5">
          <v-col>
            <ui-text-money
              v-model.number="pessoa.valorDiretorAprova"
              clearable
              label="Diretor aprovar a partir de"
              variant="underlined"
              :options="{
                locale: 'pt-BR',
                prefix: 'R$',
                suffix: '',
                length: 12,
                precision: 2,
              }"
            ></ui-text-money>
          </v-col>
        </v-row>        
      </v-col>
    </v-row>
  </v-container>
  <PaginasBottomNavigation
    pagina="perfil"
    :pageModeView="false"
    @salvar="clickSalvar"
  ></PaginasBottomNavigation>
</template>

<script setup lang="ts">
import { User } from "../../../types/user/user";
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { useTipoStore } from "../../../stores/tipos/tipo";

// PINIA
export interface Props {
  pessoaProp: User;
}

const props = defineProps<Props>();
const emit = defineEmits(["salvar"]);

/// TIPO
const tiposStore = useTipoStore();

/// TIPO ITEM
const tipoItemStore = useTipoItemStore();

/// PESSOA
const pessoa = ref<any>(props.pessoaProp);

const isPessoaJuridica = computed(() => {
  return pessoa.value.tipoId === tipoItemStore.getBy("pessoaJuridica")?.id;
});

/// FORMATO JURIDICO
const formatosJuridicos = computed(() => {
  const tipoId: number = tiposStore.getBy("formatoJuridico")?.id || 0;
  return tipoItemStore.getByTipoId(tipoId);
});

/// REGIME TRIBUTARIO
const regimesTributarios = computed(() => {
  const tipoId: number = tiposStore.getBy("regimeTributario")?.id || 0;
  return tipoItemStore.getByTipoId(tipoId);
});

/// PORTE
const portes = computed(() => {
  const tipoId: number = tiposStore.getBy("porteEmpresarial")?.id || 0;
  return tipoItemStore.getByTipoId(tipoId);
});

const clickSalvar = async () => {
  emit("salvar", pessoa.value);
};
</script>

<style scoped>
.date {
  margin-top: -3px;
  padding-top: -10px;
  padding-bottom: 0px;
  padding-left: 0px;
  width: 100%;
  border-bottom: 1px solid #7a7a7a7a !important;
}
</style>
