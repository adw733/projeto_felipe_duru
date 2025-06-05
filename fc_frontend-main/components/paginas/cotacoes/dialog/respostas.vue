<template>
  <v-dialog
    v-model="model"
    max-width="800"
    min-width="350"
    transition="dialog-bottom-transition"
    persistent
    scrollable
  >
    <v-toolbar
      color="portalColor"
      class="fixed-bar"
      density="compact"
      theme="dark"
    >
      <v-row align="center">
        <v-col cols="2"></v-col>
        <v-col v-if="cotacaoItem?.produtos" align="center" cols="8">
          <v-toolbar-title>{{
            produtoFormata(cotacaoItem?.produtos)
          }}</v-toolbar-title>
        </v-col>
        <v-col align="center" cols="2">
          <v-btn icon @click="model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-card rounded="0" class="hide-overflow" :key="componentKey">
      <v-card-text class="px-2">
        <v-container>
          <v-row v-if="cotacaoItem?.dataNecessidade" class="mt-n5">
            <v-col>
              <span class="text-body-1 font-weight-bold">Necessidade: </span>
              <span class="text-body-1">
                {{ dateFormat(cotacaoItem?.dataNecessidade, "dd/MM/yyyy") }}
              </span>
            </v-col>
          </v-row>

          <!-- :headers="headers" -->
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="15"
            class="elevation-1 mt-6"
            locale="pt-BR"
            :mobile-breakpoint="0"
            :single-expand="false"
            calculate-widths
          >
            <template v-slot:[`item.isEscolhida`]="{ item }">
              <v-checkbox
                v-model="item.isEscolhida"
                :disabled="cotacao?.statusId !== statusStore.getBy('Ativo')?.id"
                color="portalColor"
                @click="clickItem(item)"
              ></v-checkbox>
            </template>
            <template v-slot:[`item.fornecedor`]="{ item }">
              <v-row>
                <v-col>
                  <v-icon size="x-small" @click="clickFornecedor(item)">
                    mdi-eye
                  </v-icon>
                  <span class="text-caption ml-2">{{ item.fornecedor }}</span>
                </v-col>
              </v-row>
            </template>
            <template v-slot:[`item.valorBruto`]="{ item }">
              <span class="text-caption">{{ item.valorBruto }}</span>
            </template>
            <template v-slot:[`item.valorLiquido`]="{ item }">
              <span class="text-caption">{{ item.valorLiquido }}</span>
            </template>
            <template v-slot:[`item.impostos`]="{ item }">
              <v-row>
                <v-col>
                  <v-icon size="x-small" @click="verImpostos(item)">
                    mdi-eye
                  </v-icon>
                </v-col>
              </v-row>
            </template>
            <template v-slot:[`item.pagamento`]="{ item }">
              <span class="text-caption">{{ item.pagamento }}</span>
            </template>
            <template v-slot:[`item.parcelas`]="{ item }">
              <v-row>
                <v-col>
                  <v-icon size="x-small" @click="verParcelas(item)">
                    mdi-eye
                  </v-icon>
                  <span class="text-caption ml-2">{{ item.parcelas }}</span>
                </v-col>
              </v-row>
            </template>
            <template v-slot:[`item.frete`]="{ item }">
              <v-row>
                <v-col>
                  <v-icon size="x-small" @click="verFrete(item)">
                    mdi-eye
                  </v-icon>
                  <span class="text-caption ml-2">{{
                    tipoItemStore.getBy(item.frete.freteId)?.codigo
                  }}</span>
                </v-col>
              </v-row>
            </template>
            <template v-slot:[`item.garantia`]="{ item }">
              <span class="text-caption">{{ item.garantia }}</span>
            </template>
            <template v-slot:[`item.prazoentrega`]="{ item }">
              <span class="text-caption">{{ item.prazoentrega }}</span>
            </template>
            <template v-slot:[`item.observacoes`]="{ item }">
              <v-row v-if="item.observacoes">
                <v-col>
                  <v-icon size="x-small" @click="verObservacao(item)">
                    mdi-message-text
                  </v-icon>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-container>
      </v-card-text>
    </v-card>
    <PaginasFornecedoresView
      v-if="showDialogFornecedor"
      v-model="showDialogFornecedor"
      :fornecedor="pessoaFornecedor"
    />
    <PaginasCotacoesDialogImposto
      v-if="showDialogImposto"
      v-model="showDialogImposto"
      :imposto="imposto"
    />
    <PaginasCotacoesDialogParcela
      v-if="showDialogParcelas"
      v-model="showDialogParcelas"
      :parcelas="parcelas"
    />
    <PaginasCotacoesDialogFrete
      v-if="showDialogFrete"
      v-model="showDialogFrete"
      :frete="frete"
    />
    <PaginasCotacoesDialogObservacao
      v-if="showDialogObservacao"
      v-model="showDialogObservacao"
      :observacao="observacao"
    />

    <BasesSnackbar
      v-if="showSnackbar"
      @close="closeSnackBar()"
      @confirm="confirmSnackBar()"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { CotacaoResposta } from "../../../../types/cotacoes/cotacao-resposta";
import { useTipoItemStore } from "../../../../stores/tipos/tipo-item";
import { Cotacao } from "../../../../types/cotacoes/cotacao";
import { CotacaoItem } from "../../../../types/cotacoes/cotacao-item";
import {
  CotacaoItemResposta,
  CotacaoItemRespostaImposto,
} from "../../../../types/cotacoes/cotacao-item-resposta";
import { useStatusStore } from "../../../../stores/status/status";
import { Pessoa } from "types/pessoas/pessoa";
import { CotacaoRespostaParcela } from "../../../../types/cotacoes/cotacao-resposta-parcela";
import { useSnackbarStore } from "../../../../stores/variaveis/snackbar";
import { snackbarInterface } from "../../../../types/variaveis/snackbar";

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  cotacao: {
    type: Object as PropType<Cotacao>,
  },
  cotacaoItem: {
    type: Object as PropType<CotacaoItem>,
  },
  respostas: {
    type: Array as PropType<Array<CotacaoItemResposta>>,
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

/// TIPOITEM
const tipoItemStore = useTipoItemStore();

/// status
const statusStore = useStatusStore();

/// HEADER
const headers = ref<Array<any>>([
  { title: "", align: "center", value: "isEscolhida", minWidth: "70px" },
  {
    title: "Fornecedor",
    value: "fornecedor",
    minWidth: "150px",
    align: "start",
  },
  {
    title: "Valor bruto",
    value: "valorBruto",
    minWidth: "120px",
    align: "end",
  },
  {
    title: "Valor líquido",
    value: "valorLiquido",
    minWidth: "120px",
    align: "end",
  },
  { title: "Impostos", value: "impostos", align: "center" },
  {
    title: "Pagamento",
    value: "pagamento",
    minWidth: "120px",
    align: "center",
  },
  { title: "Parcelas ", value: "parcelas", minWidth: "80px", align: "center" },
  { title: "Frete", value: "frete", minWidth: "80px", align: "center" },
  { title: "Garantia", value: "garantia", minWidth: "120px", align: "start" },
  {
    title: "Prazo entrega",
    value: "prazoentrega",
    minWidth: "150px",
    align: "start",
  },
  { title: "OBS", value: "observacoes", align: "center" },
]);

/// ITEMS
const items = ref<Array<any>>([]);
onMounted(() => {
  items.value = props.respostas.map((resposta: CotacaoItemResposta) => {
    const respostacotacao = props.cotacao?.cotacoesRespostas?.find(
      (cotacaoResposta: CotacaoResposta) =>
        cotacaoResposta.fornecedorId === resposta.fornecedorId
    );

    return {
      ...resposta,
      isEscolhida: resposta.isEscolhida,
      fornecedor:
        resposta.fornecedor?.nomeAlternativo || resposta.fornecedor?.nome,
      valorBruto: numberFormat(resposta.valorBruto, { style: "currency" }),
      valorLiquido: numberFormat(resposta.valorLiquido, {
        style: "currency",
      }),
      impostos: resposta,
      pagamento: tipoItemStore.getBy(
        respostacotacao?.formaPagamentoId as number
      )?.codigo,
      parcelas: respostacotacao?.numeroParcelas,
      frete: respostacotacao,
      garantia: resposta.garantia,
      prazoentrega: `${resposta.prazoEntrega} dias`,
      observacoes: resposta.observacoes,
    };
  });
});

/// FORNECEDOR
const showDialogFornecedor = ref<boolean>(false);
const pessoaFornecedor = ref<Pessoa>({} as Pessoa);
const clickFornecedor = (resposta: CotacaoItemResposta) => {
  showDialogFornecedor.value = true;
  pessoaFornecedor.value = resposta.fornecedor || ({} as Pessoa);
};

/// IMPOSTO
const showDialogImposto = ref<boolean>(false);
const imposto = ref<CotacaoItemRespostaImposto>(
  {} as CotacaoItemRespostaImposto
);
const verImpostos = (resposta: CotacaoItemResposta) => {
  imposto.value.cofins = resposta.cofins;
  imposto.value.icms = resposta.icms;
  imposto.value.ipi = resposta.ipi;
  imposto.value.iss = resposta.iss;
  imposto.value.pis = resposta.pis;

  showDialogImposto.value = true;
};

/// PARCELAS
const showDialogParcelas = ref<boolean>(false);
const parcelas = ref<Array<CotacaoRespostaParcela>>([]);

const verParcelas = (resposta: CotacaoItemResposta) => {
  parcelas.value =
    props.cotacao?.cotacoesRespostas?.find(
      (cotacaoResposta: CotacaoResposta) =>
        cotacaoResposta.fornecedorId === resposta.fornecedorId
    )?.cotacoesRespostasParcelas || [];

  showDialogParcelas.value = true;
};

/// FRETE
const showDialogFrete = ref<boolean>(false);
const frete = ref<any>({});

const verFrete = (resposta: CotacaoItemResposta) => {
  const respostacotacao = props.cotacao?.cotacoesRespostas?.find(
    (cotacaoResposta: CotacaoResposta) =>
      cotacaoResposta.fornecedorId === resposta.fornecedorId
  );

  frete.value.Modalidade = tipoItemStore.getBy(
    respostacotacao?.freteId || 0
  )?.codigo;
  frete.value.Valor = numberFormat(respostacotacao?.valorFrete || 0, {
    style: "currency",
    minimumFractionDigits: 2,
  });
  frete.value.Peso = resposta.peso
    ? `${numberFormat(resposta.peso, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} Kg`
    : "-";
  frete.value.Largura = resposta.largura
    ? `${numberFormat(resposta.largura, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} CM`
    : "-";
  frete.value.Altura = resposta.altura
    ? `${numberFormat(resposta.altura, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} CM`
    : "-";
  frete.value.Comprimento = resposta.comprimento
    ? `${numberFormat(resposta.comprimento, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} CM`
    : "-";

  showDialogFrete.value = true;
};

/// OBSERVACAO
const showDialogObservacao = ref<boolean>(false);
const observacao = ref<string>();

const verObservacao = (resposta: CotacaoItemResposta) => {
  observacao.value = resposta.observacoes || "";
  showDialogObservacao.value = true;
};

/// ESCOLHIDO
const clickItem = async (resposta: CotacaoItemResposta) => {
  if (props.respostas.filter((resposta) => resposta.isEscolhida).length >= 3 && !resposta.isEscolhida) {
    props.respostas.forEach((cotacaoItemResposta: CotacaoItemResposta) => {
      if (cotacaoItemResposta.id === resposta.id) {
        cotacaoItemResposta.isEscolhida = false;
      }
    });

    snackbarSet({
      titulo: "MAPA COMPARATIVO",
      mensagem: "selecione até 3 propostas para o mapa comparativo",
      color: "infoSnackbar",
      timeout: 3000,
      isConfirm: false,
    });
  } else {
    resposta.isEscolhida = !resposta.isEscolhida;
    let cotacaoRespostaItem: CotacaoItemResposta = {} as CotacaoItemResposta;
    props.respostas.forEach((cotacaoItemResposta: CotacaoItemResposta) => {
      if (cotacaoItemResposta.id === resposta.id) {
        cotacaoItemResposta.isEscolhida = !cotacaoItemResposta.isEscolhida;
        cotacaoRespostaItem = cotacaoItemResposta;
      }
    });

    await put(`cotacoes-itens-respostas`, cotacaoRespostaItem);
  }

  updateComponent();
};

/// SNACKBAR
const snackbarStore = useSnackbarStore();
const setSnackbar = snackbarStore.set;

const showSnackbar = ref<boolean>(false);

const snackbarSet = (object: snackbarInterface) => {
  showSnackbar.value = true;
  setSnackbar(object);

  setTimeout(() => {
    showSnackbar.value = false;
    setSnackbar(object);
  }, 3500);
};

const closeSnackBar = () => {
  console.log("fechou");
};

const confirmSnackBar = () => {
  console.log("confirmou");
};

/// COMPONENTKEY
const componentKey = ref<number>(0);

const updateComponent = () => {
  componentKey.value += componentKey.value + 1;
};
</script>

<style scoped></style>
