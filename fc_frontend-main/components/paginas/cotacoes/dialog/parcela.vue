<template>
  <v-dialog
    v-model="model"
    max-width="800"
    min-width="350"
    transition="dialog-bottom-transition"
  >
    <v-toolbar
      color="portalColor"
      class="fixed-bar"
      density="compact"
      theme="dark"
    >
      <v-row align="center">
        <v-col cols="2"></v-col>
        <v-col align="center" cols="8">
          <v-toolbar-title>Parcelas</v-toolbar-title>
        </v-col>
        <v-col align="center" cols="2">
          <v-btn icon @click="model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-card rounded="0" class="hide-overflow">
      <v-card-text class="px-2">
        <v-container>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Nº Parcela</th>
                <th class="text-left">Prazo</th>
                <th class="text-left">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(parcela, i) in parcelas" :key="i">
                <td>{{ i + 1 }}</td>
                <td>
                  {{
                    numberFormat(parcela.prazo, {
                      style: "decimal",
                    })
                  }}
                  dias
                </td>
                <td>
                  {{
                    numberFormat(parcela.valor, {
                      style: "currency",
                    })
                  }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { CotacaoRespostaParcela } from "../../../../types/cotacoes/cotacao-resposta-parcela";
import { CotacaoItemRespostaImposto } from "../../../../types/cotacoes/cotacao-item-resposta";

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  parcelas: {
    type: Array as PropType<Array<CotacaoRespostaParcela>>,
    required: true,
  },
});

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
</script>

<style scoped></style>
