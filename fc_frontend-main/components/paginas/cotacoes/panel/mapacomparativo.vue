<template>
  <v-expansion-panel :key="componentKey">
    <v-expansion-panel-title>
      <v-row>
        <v-col align="start" cols="7">
          <span class="text-h6 font-weight-medium"> Mapa comparativo </span>
        </v-col>
        <v-col align="end" cols="5">
          <div class="mr-4">
          <span class="text-body-2 font-weight-medium"> Valor total: </span>
          <span class="text-body-2">
            {{ numberFormat(valorTotalbruto, { style: "currency" }) }}
          </span>
        </div>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1 mt-1"    
            locale="pt-BR"                        
            :group-by="[
              {
                key: 'produto',
                order: 'asc',
              },
            ]"
            show-group-by
          >
            <template
              v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }"
            >
              <tr>
                <td :colspan="columns.length">
                  <v-btn
                    size="small"
                    variant="text"
                    :icon="isGroupOpen(item) ? '$expand' : '$next'"
                    @click="toggleGroup(item)"
                  ></v-btn>
                  <span class="text-body-2 font-weight-medium">
                    {{
                      numberFormat(item.items[0].value, {
                        minimumFractionDigits:
                          unidadeMedida(item.value)?.options?.precision || 0,
                      })
                    }}
                    {{ unidadeMedida(item.value)?.codigo }}
                    - {{ produtoFormata(item.value) }}
                  </span>
                </td>
              </tr>
            </template>

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
        </v-col>
      </v-row>
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
import {
  CotacaoItemResposta,
  CotacaoItemRespostaImposto,
} from "../../../../types/cotacoes/cotacao-item-resposta";
import { CotacaoResposta } from "../../../../types/cotacoes/cotacao-resposta";
import { Pessoa } from "types/pessoas/pessoa";
import { CotacaoRespostaParcela } from "../../../../types/cotacoes/cotacao-resposta-parcela";
import { useSnackbarStore } from "../../../../stores/variaveis/snackbar";
import { snackbarInterface } from "../../../../types/variaveis/snackbar";

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<CotacaoItem>>,
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

const items = ref<Array<any>>([]);
onMounted(() => {
  props.cotacao.cotacoesItens?.forEach((cotacaoItem: CotacaoItem) => {
    const cotacoesItensRespostas = cotacaoItem.cotacoesItensRespostas
      ?.filter(
        (cotacaoItemResposta: CotacaoItemResposta) =>
          cotacaoItemResposta.isEscolhida
      )
      .forEach((resposta: CotacaoItemResposta) => {
        const respostacotacao = props.cotacao?.cotacoesRespostas?.find(
          (cotacaoResposta: CotacaoResposta) =>
            cotacaoResposta.fornecedorId === resposta.fornecedorId
        );

        items.value.push({
          ...resposta,
          id: resposta.itemId,
          produto: cotacaoItem.produtos,
          quantidade: cotacaoItem.quantidade,
          isEscolhida: cotacaoItem.respostaId === resposta.id,
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
        });
      });
  });
});

/// HEADER
const headers = ref<Array<any>>([
  { title: "", align: "start", key: "data-table-group", minWidth: "0px" },
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

/// CHECKBOX
const clickItem = async (resposta: CotacaoItemResposta) => {
  try {
    props.cotacao.cotacoesItens
      ?.filter((cotacaoItem: CotacaoItem) => cotacaoItem.id === resposta.itemId)
      ?.forEach((cotacaoItem: CotacaoItem) => {
        cotacaoItem.respostaId =
          cotacaoItem.respostaId === resposta.id ? null : resposta.id;
      });

    const cotacaoItem = props.cotacao.cotacoesItens?.find(
      (cotacaoItem: CotacaoItem) => cotacaoItem.id === resposta.itemId
    );

    await put("cotacoes-itens", cotacaoItem);
  } catch (err) {
    console.log(err);
  }
};

/// TOTAL
const valorTotalbruto = computed(() => {
  return (
    props.cotacao.cotacoesItens
      ?.filter((cotacaoItem: CotacaoItem) => cotacaoItem.respostaId)
      ?.reduce((acc: number, cotacaoItem: CotacaoItem) => {
        const resposta = cotacaoItem.cotacoesItensRespostas?.find(
          (cotacaoItemResposta: CotacaoItemResposta) =>
            cotacaoItemResposta.id === cotacaoItem.respostaId
        );
        acc +=
          parseFloat((resposta?.valorBruto || 0).toString()) *
          parseFloat((cotacaoItem.quantidade || 0).toString());

        return acc;
      }, 0) || 0
  );
});

/// UNIDADE MEDIDA
const unidadeMedida = (produto: Produto): TipoItem => {
  return tipoItemStore.getBy(produto.unidadeMedidaId as number) as TipoItem;
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
</script>

<style>
.v-data-table-footer {
  visibility: hidden;
  margin-top: -60px;
}
</style>
