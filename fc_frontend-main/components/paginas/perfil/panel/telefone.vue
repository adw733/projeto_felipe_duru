<template>
  <v-expansion-panel :key="componentKey">
    <v-expansion-panel-title>
      <v-row>
        <v-col align="start" cols="10">
          <span class="text-h6 font-weight-medium"> Telefones </span>
        </v-col>
        <v-col v-if="model.length <= 0" cols="2">
          <v-icon large color="red"> mdi-circle-small </v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row v-if="!pageModeView" justify="end">
        <v-col cols="12" class="text-right">
          <v-btn
            color="green"
            density="compact"
            size="small"
            icon="mdi-plus"
            :disabled="model.length >= maxRegistro"
            @click="addTelefone"
          />
        </v-col>
      </v-row>
      <div class="my-1" v-for="(telefone, i) in model" :key="`telefone${i}`">
        <div v-if="pageModeView">
          <v-row justify="center">
            <v-col align="center">
              <span class="text-body-1 font-weight-medium">
                {{ tipoItemStore.getBy(telefone.tipoId || 0)?.codigo }}:
              </span>
              <span>
                {{
                  mask(telefone.numero, [
                    "+55 (##) ####-####",
                    "+55 (##) # ####-####",
                  ])
                }}
              </span>
              <v-divider v-if="i < model.length - 1" class="mt-2"></v-divider>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-row justify="center">
            <v-col cols="4" md="3" align="center">
              <v-select
                v-model="telefone.tipoId"
                :items="telefones"
                label="Tipo"
                density="compact"
                item-title="codigo"
                item-value="id"
                variant="underlined"
              />
            </v-col>
            <v-col class="mt-n2" cols="7" md="8">
              <v-text-field
                v-model="telefone.numero"
                v-maska:[maskConfig(telefone)]
                label="Número"
                variant="underlined"
                type="tel"
              />
            </v-col>
            <v-col v-if="!pageModeView" cols="1">
              <v-btn
                color="red"
                density="compact"
                size="small"
                icon="mdi-minus"
                @click="deletaTelefone(i)"
              />
            </v-col>
          </v-row>
        </div>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { useTipoItemStore } from "../../../../stores/tipos/tipo-item";
import { useTipoStore } from "../../../../stores/tipos/tipo";
import { useStatusStore } from "../../../../stores/status/status";
import { PessoaTelefone } from "../../../../types/pessoas/pessoa-telefone";
import { Pessoa } from "../../../../types/pessoas/pessoa";

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<PessoaTelefone>>,
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

/// MASK
const maskConfig = (telefone: PessoaTelefone) => {
  const options = {
    mask:
      tipoItemStore.getBy("telefoneCelular")?.id == telefone.tipoId
        ? "+55 (##) # ####-####"
        : "+55 (##) ####-####",
  };

  return options;
};
const maxRegistro = ref<number>(4);

/// Status
const statusStore = useStatusStore();

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

/// DOCUMENTO
const telefones = computed(() => {
  return tipoItemStore.getByTipoId(tipoStore.getBy("telefone")?.id || 0);
});

const addTelefone = () => {
  model.value.push({
    id: null,
    numero: "",
    statusId: statusStore.getBy("Ativo")?.id || 0,
    tipoId: null,
    pessoaId: props.pessoa.id as number,
  });

  updateComponent();
};

const deletaTelefone = (index: number) => {
  model.value.splice(index, 1);
  updateComponent();
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
