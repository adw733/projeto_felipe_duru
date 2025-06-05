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
          <v-toolbar-title>Impostos</v-toolbar-title>
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
                <th
                  v-for="(header, i) in headers"
                  :key="`header${i}`"
                  class="text-left"
                >
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="(header, i) in headers" :key="`imposto${i}`">
                  {{ items[header.value] }}
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
import { CotacaoItemRespostaImposto } from "../../../../types/cotacoes/cotacao-item-resposta";

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  imposto: {
    type: Object as PropType<CotacaoItemRespostaImposto>,
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

/// HEADER
const headers = computed(() => {
  return (
    Object.keys(props.imposto)
      .filter((key: any) => {
        const impostoTemp = props.imposto as any;
        return !!impostoTemp[key];
      })
      .map((key: any) => {
        return {
          value: key,
          title: key,
        };
      }) || []
  );
});

/// ITEMS
const items = computed((): any => {
  let itensImposto: CotacaoItemRespostaImposto =
    {} as CotacaoItemRespostaImposto;

  Object.keys(props.imposto)
    .filter((key: any) => {
      const impostoTemp = props.imposto as any;
      return !!impostoTemp[key];
    })
    .forEach((key: any) => {
      const impostoTemp = props.imposto as any;
      itensImposto = {
        ...itensImposto,
        [key]: numberFormat(impostoTemp[key] / 100, {
          style: "percent",
          minimumFractionDigits: 2,
        }),
      };
    });

  return itensImposto;
});
</script>

<style scoped></style>
