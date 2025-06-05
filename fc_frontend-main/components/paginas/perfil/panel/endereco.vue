<template>
  <v-expansion-panel :key="componentKey">
    <v-expansion-panel-title>
      <v-row>
        <v-col align="start" cols="10">
          <span class="text-h6 font-weight-medium"> Endereco </span>
        </v-col>
        <v-col v-if="!model.id" cols="2">
          <v-icon large color="red"> mdi-circle-small </v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div v-if="pageModeView">
        <v-row>
          <v-col align="center">
            <span class="text-body-2"
              >{{ model.logradouro }}, {{ model.numero }}</span
            >
          </v-col>
        </v-row>
        <v-row class="mt-n5">
          <v-col align="center">
            <span class="text-body-2">{{ model.bairro }}</span>
          </v-col>
        </v-row>
        <v-row class="mt-n5">
          <v-col align="center">
            <span class="text-body-2"
              >{{ cidadeStore.getBy(model.cidadeId)?.nome }} -
              {{ estadoStore.getBy(model.estadoId)?.nome }}</span
            >
          </v-col>
        </v-row>
        <v-row class="mt-n5">
          <v-col align="center">
            <span class="text-body-2">{{ model.complemento }}</span>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row>
          <v-col align="start" cols="12" md="4">
            <v-text-field
              v-model="model.cep"
              v-maska:[maskConfig()]
              label="CEP"
              variant="underlined"
              type="tel"
              @blur="buscaCep()"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col align="start" cols="12" md="6">
            <v-text-field
              v-model="model.logradouro"
              label="Rua"
              variant="underlined"
              type="text"
              disabled
            />
          </v-col>
          <v-col align="start" cols="5" md="2">
            <v-text-field
              v-model="model.numero"
              label="Número"
              variant="underlined"
              type="tel"
            />
          </v-col>
          <v-col align="start" cols="12" md="4">
            <v-text-field
              v-model="model.complemento"
              label="Complemento"
              variant="underlined"
              type="text"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col align="start" cols="12" md="4">
            <v-text-field
              v-model="cidade"
              label="Cidade"
              variant="underlined"
              type="text"
              disabled
            />
          </v-col>
          <v-col align="start" cols="5" md="4">
            <v-text-field
              v-model="estado"
              label="Estado"
              variant="underlined"
              type="tel"
              disabled
            />
          </v-col>
          <v-col align="start" cols="12" md="4">
            <v-text-field
              v-model="model.bairro"
              label="Bairro"
              variant="underlined"
              type="text"
            />
          </v-col>
        </v-row>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import cep from "cep-promise";
import { useTipoItemStore } from "../../../../stores/tipos/tipo-item";
import { PessoaEndereco } from "../../../../types/pessoas/pessoa-endereco";
import { Pessoa } from "../../../../types/pessoas/pessoa";
import { useCidadeStore } from "../../../../stores/cidades/cidade";
import { useEstadoStore } from "../../../../stores/estados/estado";
import { useTipoStore } from "../../../../stores/tipos/tipo";

const props = defineProps({
  modelValue: {
    type: Object as PropType<PessoaEndereco>,
    default: [],
  },
  pessoa: {
    type: Object as PropType<Pessoa>,
    required: true,
  },
  pageModeView: {
    type: Boolean,
    required: true,
  },
});

/// COMPONENTKEY
const componentKey = ref<number>(0);

const updateComponent = () => {
  componentKey.value += componentKey.value + 1;
};

/// TIPO
const tipoStore = useTipoStore();

/// TIPO ITEM
const tipoItemStore = useTipoItemStore();

// EMIT
const emit = defineEmits(["update:modelValue"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

/// CIDADE
const cidadeStore = useCidadeStore();
const cidade = ref(cidadeStore.getBy(model.value.cidadeId)?.nome);

/// ESTADO
const estadoStore = useEstadoStore();
const estado = ref(estadoStore.getBy(model.value.estadoId)?.nome);

/// MASK
const maskConfig = () => {
  const options = {
    mask: "#####-###",
  };
  return options;
};

/// CEP
const buscaCep = async () => {
  const endereco = await cep(model.value.cep);

  if (endereco.state) {
    const estadoCep = estadoStore.getBy(endereco.state);
    if (estadoCep?.id) {
      const cidadeCep = cidadeStore.getByEstado(
        estadoCep?.id | 0,
        endereco.city
      );
      if(cidadeCep) {
        model.value.logradouro = endereco.street;
        model.value.bairro = endereco.neighborhood;
        model.value.cidadeId = cidadeCep.id;
        model.value.estadoId = estadoCep.id;
        cidade.value = cidadeCep.nome;
        estado.value = estadoCep.nome;
        updateComponent()
      }
    }
  }
};

/// RULES
const rules = ref({
  CNPJ: [
    (value: string | null) => !!value || "CNPJ é obrigatório",
    (value: string) => (value && value.length <= 18) || "CNPJ inválido",
  ],

  IE: [(value: string | null) => !!value || "IE é obrigatório"],
});
</script>

<style scoped></style>
