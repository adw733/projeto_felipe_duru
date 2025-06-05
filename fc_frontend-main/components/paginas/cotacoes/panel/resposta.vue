<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <v-row>
        <v-col align="start">
          <span class="text-h6 font-weight-medium"> Codições Gerais </span>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="mx-n4">
      <v-expansion-panels v-model="panelsOpen" multiple :key="componentKey">
        <v-expansion-panel
          v-for="(frete, i) in model.filter((frete) => !frete.deletedAt)"
          :key="`frete_${i}`"
        >
          <v-expansion-panel-title>
            <v-row>
              <v-col align="start" cols="4">
                <span class="text-body-1 font-weight-medium"> Frete </span>
              </v-col>
              <v-col v-if="frete.valorFrete" align="end" cols="8">
                <span class="text-body-2 font-weight-medium">Valor: </span>
                <span class="text-body-2 mr-4">
                  {{
                    numberFormat(frete.valorFrete, {
                      style: "currency",
                    })
                  }}
                </span>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div v-if="pageModeView">
              <v-row>
                <v-col v-if="frete.freteId">
                  <span class="text-body-2 font-weight-medium">Tipo: </span>
                  <span class="text-body-2">
                    {{ tipoItemStore.getBy(frete.freteId)?.codigo }}
                  </span>
                </v-col>
              </v-row>
            </div>
            <div v-else class="mx-n5">
              <v-row>
                <v-col align="start" cols="12">
                  <v-select
                    v-model="frete.freteId"
                    :items="fretes"
                    label="Tipo"
                    item-title="text"
                    item-value="value"
                    :rules="rules.freteId"
                    @update:modelValue="changeFrete(frete)"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row class="mt-n7">
                <v-col
                  v-if="
                    frete.freteId &&
                    tipoItemStore.getBy('freteCIF')?.id === frete.freteId
                  "
                  align="start"
                  cols="12"
                >
                  <ui-text-money
                    v-model.number="frete.valorFrete"
                    clearable
                    label="valor"
                    variant="filled"
                    :options="{
                      locale: 'pt-BR',
                      prefix: 'R$',
                      suffix: '',
                      length: 12,
                      precision: 2,
                    }"
                    :rules="rules.valorFrete"
                    @change="numeroParcelas(frete)"
                  ></ui-text-money>
                </v-col>
              </v-row>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel
          v-for="(pagamento, i) in model.filter((frete) => !frete.deletedAt)"
          :key="`frete_${i}`"
        >
          <v-expansion-panel-title>
            <v-row>
              <v-col align="start" cols="5">
                <span class="text-body-1 font-weight-medium"> Pagamento </span>
              </v-col>
              <v-col
                v-if="valorTotal(pagamento) && valorTotal(pagamento) >= 0"
                align="end"
                cols="7"
              >
                <span class="text-body-2 font-weight-medium"
                  >Total com frete:
                </span>
                <span class="text-body-2 mr-4">
                  {{
                    numberFormat(valorTotal(pagamento), { style: "currency" })
                  }}
                </span>
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="mx-n4">
            <div v-if="pageModeView">
              <v-row v-if="pagamento.formaPagamentoId">
                <v-col>
                  <span class="text-body-2 font-weight-medium"
                    >Forma de pagamento:
                  </span>
                  <span class="text-body-2">
                    {{
                      tipoItemStore.getBy(pagamento.formaPagamentoId)?.codigo
                    }}
                  </span>
                </v-col>
              </v-row>
              <v-row class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-medium"
                    >Nº parcelas:
                  </span>
                  <span class="text-body-2">
                    {{ pagamento.numeroParcelas }}
                  </span>
                </v-col>
              </v-row>
              <v-row class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-medium"
                    >Prazo Entrada:
                  </span>
                  <span class="text-body-2"> {{ pagamento.prazo0 }} dias </span>
                </v-col>
              </v-row>

              <v-row class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-medium"
                    >Intervalo Prazos:
                  </span>
                  <span class="text-body-2"> {{ pagamento.prazoN }} dias </span>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="2">
                  <span class="text-caption">Nº</span>
                </v-col>
                <v-col cols="4">
                  <span class="text-caption">Prazo (d)</span>
                </v-col>
                <v-col cols="6">
                  <span class="text-caption">Valor</span>
                </v-col>
              </v-row>
              <div
                v-for="(parcela, i) of pagamento.cotacoesRespostasParcelas"
                :key="i"
              >
              <v-row>
                <v-divider v-if="i > 0" class="mx-2 mb-n2"></v-divider>
                <v-col cols="2"  align-self="center">
                  <span class="text-body-1">{{ i + 1 }}</span>
                </v-col>
                <v-col cols="4" >
                  <span class="text-body-1"> {{ parcela.prazo }}</span>
                </v-col>
                <v-col cols="6" >
                  <span class="text-body-1">
                    {{
                      numberFormat(parcela.valor, { style: "currency" })
                    }}</span
                  >
                </v-col>
              </v-row>
            </div>
            </div>
            <div v-else>
              <v-row>
                <v-col>
                  <v-select
                    v-model="pagamento.formaPagamentoId"
                    :items="formaspagamentos"
                    label="Forma de pagamento"
                    item-title="text"
                    item-value="value"
                    :rules="rules.formaPagamentoId"
                  >
                  </v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4" class="mt-n6">
                  <v-select
                    v-model="pagamento.numeroParcelas"
                    :items="numerosParcerlas"
                    label="Nº de parcelas"
                    required
                    :rules="rules.numeroParcelas"
                    @update:modelValue="numeroParcelas(pagamento)"
                  ></v-select>
                </v-col>

                <v-col cols="6" sm="6" md="4" class="mt-n6">
                  <ui-text-money
                    v-model.number="pagamento.prazo0"
                    clearable
                    label="Prazo entrada"
                    variant="filled"
                    :options="{
                      locale: 'pt-BR',
                      prefix: '',
                      suffix: 'dias',
                      length: 3,
                      precision: 0,
                    }"
                    :rules="rules.prazo0"
                    @change="numeroParcelas(pagamento)"
                  ></ui-text-money>
                </v-col>

                <v-col cols="6" sm="6" md="4" class="mt-n6">
                  <ui-text-money
                    v-model.number="pagamento.prazoN"
                    clearable
                    label="Intervalo prazos"
                    variant="filled"
                    :options="{
                      locale: 'pt-BR',
                      prefix: '',
                      suffix: 'dias',
                      length: 3,
                      precision: 0,
                    }"
                    :rules="rules.prazo0"
                    @change="numeroParcelas(pagamento)"
                  ></ui-text-money>
                </v-col>
              </v-row>
              <div
                v-if="pagamento.numeroParcelas && pagamento.numeroParcelas > 0"
              >
                <v-row>
                  <v-col cols="2">
                    <span class="text-caption">Nº</span>
                  </v-col>
                  <v-col cols="4">
                    <span class="text-caption">Prazo (d)</span>
                  </v-col>
                  <v-col cols="6">
                    <span class="text-caption">Valor</span>
                  </v-col>
                </v-row>
                <v-row
                  v-for="(parcela, i) of pagamento.cotacoesRespostasParcelas"
                  :class="i > 0 ? 'mt-n6' : ''"
                  :key="i"
                >
                  <v-col cols="2" class="mt-n6" align-self="center">
                    <span class="text-body-1">{{ i + 1 }}</span>
                  </v-col>
                  <v-col cols="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="parcela.prazo"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: '',
                        length: 4,
                        precision: 0,
                      }"
                      :rules="rules.prazo0"
                      @change="numeroParcelas(pagamento)"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="6" class="mt-n6">
                    <ui-text-money
                      v-model.number="parcela.valor"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: 'R$',
                        suffix: '',
                        length: 12,
                        precision: 2,
                      }"
                      :rules="rules.prazo0"
                    ></ui-text-money>
                    <!-- @change="valorFrete(pagamento)" -->
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { useControleStore } from "../../../../stores/variaveis/controle";
import { useTipoItemStore } from "../../../../stores/tipos/tipo-item";
import { useTipoStore } from "../../../../stores/tipos/tipo";
import { useStatusStore } from "../../../../stores/status/status";
import { CotacaoItem } from "../../../../types/cotacoes/cotacao-item";
import { Cotacao } from "../../../../types/cotacoes/cotacao";
import { Produto } from "types/produtos/produto";
import { TipoItem } from "../../../../types/tipos/tipo-item";
import { CotacaoResposta } from "../../../../types/cotacoes/cotacao-resposta";
import { useUserStore } from "../../../../stores/users/user";
import { CotacaoRespostaParcela } from "../../../../types/cotacoes/cotacao-resposta-parcela";
import { CotacaoItemResposta } from "../../../../types/cotacoes/cotacao-item-resposta";

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<CotacaoResposta>>,
    default: [],
  },
  cotacao: {
    type: Object as PropType<Cotacao>,
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

/// USER
const userStore = useUserStore();

/// Status
const statusStore = useStatusStore();

/// TIPO
const tipoStore = useTipoStore();

/// TIPO ITEM
const tipoItemStore = useTipoItemStore();

/// CONTROLE
const controleStore = useControleStore();

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

///PANELS
const panelsOpen = ref<Array<number>>([0]);

/// frete
const fretes = computed(() => {
  return tipoItemStore
    .getByTipoId(tipoStore.getBy("frete")?.id || 0)
    ?.map((tipo: TipoItem) => {
      return {
        value: tipo.id,
        text: tipo.codigo,
      };
    });
});

const changeFrete = (frete: CotacaoResposta) => {
  frete.valorFrete = 0;
};

/// FORMAPAGAMENTO
const formaspagamentos = computed(() => {
  return tipoItemStore
    .getByTipoId(tipoStore.getBy("formaPagamento")?.id || 0)
    ?.map((tipo: TipoItem) => {
      return {
        value: tipo.id,
        text: tipo.codigo,
      };
    });
});

/// VALOR
const valorTotal = (cotacaoResposta: CotacaoResposta) => {
  let valorBruto = cotacaoResposta.valorFrete;

  props.cotacao.cotacoesItens?.forEach((cotacaoItem: CotacaoItem) => {
    const itemResposta = cotacaoItem.CotacaoItemResposta?.find(
      (cotacaoItemResposta: CotacaoItemResposta) =>
        cotacaoItemResposta.itemId === cotacaoItem.id
    );

    valorBruto +=
      parseFloat((itemResposta?.valorBruto || 0).toString()) *
      parseFloat((cotacaoItem?.quantidade || 1).toString());
  });

  return valorBruto;
};

/// PARCELAS
const numerosParcerlas = computed(() => {
  return Array.from(Array(36), (_, i) => i + 1);
});

const numeroParcelas = (frete: CotacaoResposta) => {
  // frete.cotacoesRespostasParcelas = [];

  setTimeout(() => {
    const arrayParcelas = Array.from(
      Array(frete.numeroParcelas),
      (_, i) => i + 1
    );

    const valorBruto = valorTotal(frete);
    const parcelas: Array<CotacaoRespostaParcela> = [];

    arrayParcelas?.forEach((_, i: number) => {
      parcelas?.push({
        prazo:
          i === 0
            ? frete.prazo0 || 0
            : parseInt((frete.prazo0 || 0).toString()) +
              parseInt((frete.prazoN || 0).toString()) * i,
        valor: valorBruto / (arrayParcelas?.length || 1),
        respostaId: frete.id || null,
      });
    });

    frete.cotacoesRespostasParcelas = parcelas;
  }, 10);
};

/// RULES
const rules = ref({
  freteId: [(v: number) => !!v || "Tipo obrigatório"],
  valorFrete: [
    (v: number) => parseFloat(v.toString()) >= 0 || "valor obrigatório",
  ],
  formaPagamentoId: [(v: number) => !!v || "Tipo obrigatório"],
  numeroParcelas: [(v: number) => v > 0 || "Nº de parcelas obrigatório"],
  prazo0: [
    (v: number) => parseFloat(v.toString()) >= 0 || "Prazo entrada obrigatório",
  ],
});

onMounted(() => {
  model.value = props.modelValue.length
    ? props.modelValue
    : [
        {
          cotacaoId: props.cotacao.id,
          vendedorId: userStore.getPessoa.id,
          fornecedorId: userStore.getEmpresa.id,
          freteId: null,
          formaPagamentoId: null,
          valorFrete: 0,
          numeroParcelas: null,
          prazo0: 0,
          prazoN: 0,
        } as CotacaoResposta,
      ];
});
</script>

<style scoped></style>
