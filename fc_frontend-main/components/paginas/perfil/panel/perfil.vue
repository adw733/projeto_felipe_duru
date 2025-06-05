<template>
  <v-expansion-panel :key="componentKey">
    <v-expansion-panel-title>
      <v-row>
        <v-col align="start" cols="10">
          <span class="text-h6 font-weight-medium"> Perfis </span>
        </v-col>
        <v-col v-if="model.length <= 0" cols="2">
          <v-icon large color="red"> mdi-circle-small </v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        <v-row justify="center">
          <v-col align="center">
            <v-chip
              v-for="(perfil, i) in model"
              :key="i"
              class="ma-1"
              color="cyan"
              label
              text-color="white"
              size="small"
            >
              <v-icon start icon="mdi-label"></v-icon>
              {{ perfilStore.getBy(perfil.perfilId)?.nome }}
            </v-chip>
          </v-col>
        </v-row>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { usePerfilStore } from "../../../../stores/perfis/perfil";
import { PessoaPerfil } from "../../../../types/pessoas/pessoa-perfil";
import { Pessoa } from "../../../../types/pessoas/pessoa";

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<PessoaPerfil>>,
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

/// PERFIL
const perfilStore = usePerfilStore();

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
