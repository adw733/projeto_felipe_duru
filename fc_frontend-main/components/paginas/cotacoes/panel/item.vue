<template>
  <v-expansion-panel :key="componentKey">
    <v-expansion-panel-title>
      <v-row>
        <v-col align="start" cols="10">
          <span class="text-h6 font-weight-medium"> Itens </span>
        </v-col>
        <v-col v-if="model.length <= 0" cols="2">
          <v-icon large color="red"> mdi-circle-small </v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text class="mx-n4">
      <v-row v-if="isModoCompras && !pageModeView" justify="end">
        <v-col cols="12" class="text-right">
          <v-btn
            color="green"
            density="compact"
            size="small"
            icon="mdi-plus"
            @click="addItem"
          />
        </v-col>
      </v-row>

      <div class="my-1" v-if="model.filter((item) => !item.deletedAt).length">
        <v-expansion-panels v-model="panelsOpen" multiple class="mx-0 px-0">
          <v-expansion-panel
            v-for="(item, i) in model.filter((item) => !item.deletedAt)"
            :key="`item${i}`"
          >
            <v-expansion-panel-title class="grey lighten-3">
              <v-row justify="space-between">
                <v-col>
                  <span class="text-body-2 font-weight-medium">
                    #{{ item.id }}
                    {{ item.produtos ? produtoFormata(item.produtos) : "" }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text class="mx-n5">
              <v-container v-if="!isModoCompras || pageModeView">
                <v-row v-if="item.produtoId" class="mt-n5">
                  <v-col cols="12">
                    <span class="text-body-2 font-weight-bold">
                      {{ tipoItemStore.getBy(cotacao.tipoId)?.codigo }}:
                    </span>
                    <span v-if="item.produtos" class="text-body-2">{{
                      produtoFormata(item.produtos)
                    }}</span>
                  </v-col>
                </v-row>
                <v-row v-if="item.quantidade" class="mt-n5">
                  <v-col cols="12">
                    <span class="text-body-2 font-weight-bold"
                      >Quantidade:
                    </span>
                    <span class="text-body-2">
                      {{
                        numberFormat(item.quantidade, {
                          minimumFractionDigits:
                            item.produtos && unidadeMedida(item.produtos)
                              ? unidadeMedida(item.produtos).options.precision
                              : 2,
                        })
                      }}
                    </span>
                    <span
                      v-if="item.produtos && unidadeMedida(item.produtos)"
                      class="text-body-2"
                      >{{ ` ${unidadeMedida(item.produtos).codigo}` }}</span
                    >
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="6" cols="12" class="mt-n5">
                    <span
                      v-if="item.dataNecessidade"
                      class="text-body-2 font-weight-bold"
                    >
                      Necessidade:
                    </span>
                    <span v-if="item.dataNecessidade" class="text-body-2">
                      {{ dateFormat(item.dataNecessidade, "dd/MM/yyyy") }}
                    </span>
                  </v-col>
                  <v-col
                    v-if="item.finalidadeId"
                    md="6"
                    cols="12"
                    class="mt-n5"
                  >
                    <span class="text-body-2 font-weight-bold">
                      Finalidade:
                    </span>
                    <span class="text-body-2">
                      {{
                        tipoItemStore.getBy(item.finalidadeId)?.nomeAlternativo
                      }}
                    </span>
                  </v-col>
                </v-row>
                <v-row class="mt-n1">
                  <v-col cols="12">
                    <v-textarea
                      v-model="item.observacoes"
                      label="Observações"
                      readonly
                      color="grey"
                      rows="3"
                      outlined
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-row class="my-n6">
                  <v-col
                    v-if="
                      (respostaItem(item) && respostaItem(item)?.id) ||
                      !isModoCompras
                    "
                  >
                    <v-btn
                      v-if="
                        !isModoCompras &&
                        respostaItem(item) &&
                        respostaItem(item)?.id
                      "
                      size="small"
                      color="primary"
                      @click="clickResponder(item)"
                    >
                      <span class="text-caption">Alterar Resposta</span>
                    </v-btn>
                    <v-btn
                      v-if="!isModoCompras && respostaItem(item)"
                      size="small"
                      class="ml-3"
                      :color="
                        statusStore.getBy('Ativo')?.id ===
                        respostaItem(item)?.statusId
                          ? 'red'
                          : 'green'
                      "
                      dark
                      @click="clickEncaminharRetirarProposta(item)"
                    >
                      <span class="text-caption">{{
                        statusStore.getBy("Ativo")?.id ===
                        respostaItem(item)?.statusId
                          ? "Retirar proposta"
                          : "Encaminhar proposta"
                      }}</span>
                    </v-btn>
                    <v-btn
                      v-if="!isModoCompras && !respostaItem(item)"
                      size="small"
                      color="portalColor"
                      @click="clickResponder(item)"
                    >
                      <span class="text-caption">Responder</span>
                    </v-btn>
                    <v-btn
                      v-if="
                        isModoCompras &&
                        respostaItem(item) &&
                        respostaItem(item)?.id
                      "
                      size="small"
                      color="primary"
                      @click="clickRespostas(item)"
                    >
                      <span class="text-caption">respostas</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
              <v-container v-else>
                <v-row>
                  <v-col>
                    <v-btn
                      class="ml-n4"
                      :disabled="
                        statusStore.getBy('Cadastro')?.id !== cotacao.statusId
                      "
                      icon
                      variant="text"
                      @click="deletarItem(i)"
                    >
                      <v-icon color="red">mdi-minus-circle</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row class="mt-n4">
                  <v-col cols="12">
                    <ui-autocomplete
                      v-model="item.produtos"
                      :itensIniciais="produtosIniciais(item)"
                      label="Produto"
                      :multiple="false"
                      item-title="produtoFormatado"
                      item-value="id"
                      :items-map="itensMap"
                      return-object
                      chips
                      :chipClose="false"
                      :path="`produtos/autocomplete/${controleStore.getContexto}`"
                      @change="changeProduto(item, $event)"
                    >
                    </ui-autocomplete>
                  </v-col>
                </v-row>

                <v-row class="mt-n10 ml-n6">
                  <v-col cols="12">
                    <v-btn
                      variant="text"
                      size="small"
                      color="portalColor"
                      @click="cadastrarProduto()"
                      >Cadastrar Produto</v-btn
                    >
                  </v-col>
                </v-row>

                <v-row v-if="item.produtoId" class="mt-n5">
                  <v-col>
                    <ui-text-money
                      v-model.number="item.quantidade"
                      clearable
                      label="Quantidade"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix:
                          item.produtos && unidadeMedida(item.produtos)
                            ? unidadeMedida(item.produtos).codigo
                            : '',
                        length: 12,
                        precision:
                          item.produtos && unidadeMedida(item.produtos)
                            ? unidadeMedida(item.produtos).options.precision
                            : 2,
                      }"
                      :rules="rules.quantidade"
                    ></ui-text-money>
                  </v-col>
                </v-row>
                <v-row v-if="item.produtoId" class="mt-n5">
                  <v-col cols="6">
                    <!-- class="v-field v-field--appended v-field--single-line v-field--variant-solo v-theme--light v-locale--is-ltr date" -->
                    <input
                      v-model="item.dataNecessidade"
                      class="v-field v-field--appended v-field--variant-filled v-theme--light v-locale--is-ltr date"
                      placeholder="DD/MM/AAAA"
                      type="date"
                    />
                  </v-col>
                </v-row>
                <v-row v-if="item.produtoId" class="mt-n5">
                  <v-col>
                    <v-select
                      v-model="item.finalidadeId"
                      :items="finalidades"
                      label="Finalidade"
                      required
                      item-value="value"
                      item-title="text"
                      :rules="rules.finalidadeId"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row v-if="item.produtoId" class="mt-n5">
                  <v-col cols="12">
                    <v-textarea
                      label="Observações"
                      required
                      v-model="item.observacoes"
                      clearable
                      rows="3"
                      :max="500"
                      :rules="rules.observacoes"
                      counter
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>

  <paginas-cotacoes-dialog-item-resposta
    v-model="showDialogResponder"
    :cotacao="cotacao"
    :cotacao-item="cotacaoItem"
    :resposta="cotacaoItemResposta"
  />

  <paginas-cotacoes-dialog-respostas
  v-if="showDialogRespostas"
    v-model="showDialogRespostas"
    :cotacao="cotacao"
    :cotacao-item="cotacaoItem"
    :respostas="cotacaoItemRespostas"
  />
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
import { CotacaoItemResposta } from "../../../../types/cotacoes/cotacao-item-resposta";

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

const addItem = () => {
  model.value.push({
    statusId: 2,
    cotacaoId: props.cotacao.id as number,
    produtoId: null,
    finalidadeId: null,
    dataNecessidade: null,
    quantidade: 0,
    observacoes: null,
  });

  updateComponent();
};

const deletarItem = (index: number) => {
  model.value.splice(index, 1);
  updateComponent();
};

///PANELS
const panelsOpen = ref<Array<number>>([0]);

/// UNIDADE MEDIDA
const unidadeMedida = (produto: Produto): TipoItem => {
  return tipoItemStore.getBy(produto.unidadeMedidaId as number) as TipoItem;
};

/// PRODUTO
const cadastrarProduto = () => {
  window.open(`${window.location.origin}/produtos/insert`, "_blank");
};

const produtosIniciais = (item: CotacaoItem): Array<any> => {
  return item.produtos
    ? [
        {
          produtoFormatado: produtoFormata(item.produtos),
          ...item.produtos,
        },
      ]
    : [];
};

const itensMap = (itens: Array<Produto>) => {
  itens.forEach((produto: Produto) => {
    produto.produtoFormatado = produtoFormata(produto);
  });

  return itens;
};

const changeProduto = (item: CotacaoItem, produto: Produto) => {
  item.produtoId = produto?.id || null;
};

/// FINALIDADE
const finalidades = computed(() => {
  return tipoItemStore
    .getByTipoId(tipoStore.getBy("finalidade")?.id || 0)
    ?.map((tipo: TipoItem) => {
      return {
        value: tipo.id,
        text: tipo.codigo,
      };
    });
});

/// RESPOSTA
const cotacaoItem = ref<CotacaoItem>();
const cotacaoItemResposta = ref<CotacaoItemResposta>({} as CotacaoItemResposta);
const cotacaoItemRespostas = ref<Array<CotacaoItemResposta>>([]);
const showDialogResponder = ref<boolean>(false);
const showDialogRespostas = ref<boolean>(false);

const respostaItem = (item: CotacaoItem) => {
  return item.cotacoesItensRespostas?.find(
    (cotacaoItemResposta: CotacaoItemResposta) =>
      cotacaoItemResposta.itemId === item.id
  );
};

const clickResponder = (item: CotacaoItem) => {
  cotacaoItem.value = item;

  cotacaoItemResposta.value = respostaItem(item) || ({} as CotacaoItemResposta);
  showDialogResponder.value = true;
};

const clickRespostas = (item: CotacaoItem) => {
  cotacaoItem.value = item;

  cotacaoItemRespostas.value = item.cotacoesItensRespostas?.filter(
    (cotacaoItemResposta: CotacaoItemResposta) =>
      cotacaoItemResposta.itemId === item.id
  ) || [];

  showDialogRespostas.value = true;
};

const clickEncaminharRetirarProposta = async (item: CotacaoItem) => {
  const resposta = respostaItem(item) || ({} as CotacaoItemResposta);
  resposta.dataResposta =
    statusStore.getBy("Ativo")?.id === respostaItem(item)?.statusId
      ? null
      : new Date();

  resposta.statusId =
    statusStore.getBy("Ativo")?.id === respostaItem(item)?.statusId
      ? (statusStore.getBy("Cadastro")?.id as number)
      : (statusStore.getBy("Ativo")?.id as number);

  await put(`cotacoes-itens-respostas`, resposta);
};

/// MODO
const isModoCompras = computed(() => {
  return (
    tipoItemStore.getBy("modalidadeCompras")?.id === controleStore.getModalidade
  );
});

/// RULES
const rules = ref({
  finalidadeId: [(v: number) => !!v || "Finalidade obrigatório"],
  observacoes: [(v: string) => !v || v?.length <= 500 || "Máximo 500 carac"],
  produtoId: [
    (v: number) =>
      v > 0 ||
      `${tipoItemStore.getBy(props.cotacao.tipoId)?.codigo} é obrigatório`,
  ],
  quantidade: [(v: number) => !!v || "Quantidade obrigatório"],
});
</script>

<style scoped></style>
