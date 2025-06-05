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
    <v-card rounded="0" class="hide-overflow">
      <v-card-text class="px-2">
        <v-container>
          <v-expansion-panels v-model="panelOpen" multiple class="mt-5">
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-row>
                  <v-col cols="4"> Valor / Impostos </v-col>
                  <v-col cols="8" align="end" class="ml-n5">
                    <span class="font-weight-medium">Total Bruto:</span>
                    <span>
                      {{
                        numberFormat(
                          parseFloat((resposta?.valorBruto || 0).toString()) *
                            parseFloat(
                              (cotacaoItem?.quantidade || 0).toString()
                            ),
                          { style: "currency" }
                        )
                      }}</span
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text v-if="cotacaoItem">
                <v-row class="mt-4">
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="resposta.valorLiquido"
                      label="Valor líquido unitário"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: 'R$',
                        suffix: '',
                        length: 12,
                        precision: 2,
                      }"
                      :rules="rules.valorLiquido"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="resposta.valorBruto"
                      label="Valor bruto unitário"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: 'R$',
                        suffix: '',
                        length: 12,
                        precision: 2,
                      }"
                      :rules="rules.valorBruto"
                    ></ui-text-money>
                  </v-col>
                  <v-col
                    v-if="cotacaoItem.produtos"
                    cols="12"
                    sm="6"
                    md="4"
                    class="mt-n6"
                  >
                    <ui-text-money
                      v-model.number="cotacaoItem.quantidade"
                      label="Quantidade"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: 'R$',
                        suffix:
                          unidadeMedida(cotacaoItem.produtos)?.codigo || '',
                        length: 12,
                        precision:
                          unidadeMedida(cotacaoItem.produtos)?.options
                            ?.precision || 2,
                      }"
                      readonly
                    ></ui-text-money>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="(resposta.pis as number)"
                      label="PIS"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: '%',
                        length: 4,
                        precision: 2,
                      }"
                      :rules="rules.pis"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="(resposta.cofins as number)"
                      label="COFINS"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: '%',
                        length: 4,
                        precision: 2,
                      }"
                      :rules="rules.cofins"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="(resposta.icms as number)"
                      label="ICMS"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: '%',
                        length: 4,
                        precision: 2,
                      }"
                      :rules="rules.icms"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="(resposta.ipi as number)"
                      label="IPI"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: '%',
                        length: 4,
                        precision: 2,
                      }"
                      :rules="rules.ipi"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="(resposta.iss as number)"
                      label="ISS"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: '%',
                        length: 4,
                        precision: 2,
                      }"
                      :rules="rules.iss"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="(resposta.desconto as number)"
                      label="Desconto"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: '%',
                        length: 4,
                        precision: 2,
                      }"
                    ></ui-text-money>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-row>
                  <v-col> Entrega </v-col>
                </v-row>
              </v-expansion-panel-title>
              <v-expansion-panel-text v-if="resposta">
                <v-row class="mt-4">
                  <v-col :class="mdAndUp ? '' : 'mt-n6'" cols="6" md="4">
                    <ui-text-money
                      v-model.number="(resposta.prazoEntrega as number)"
                      label="Prazo"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: 'dias',
                        length: 3,
                        precision: 0,
                      }"
                      :rules="rules.prazoEntrega"
                    ></ui-text-money>
                  </v-col>
                </v-row>
                <v-row
                  v-if="
                    cotacao?.cotacoesRespostas &&
                    cotacao?.cotacoesRespostas[0].freteId &&
                    tipoItemStore.getBy(cotacao?.cotacoesRespostas[0].freteId)
                      ?.nome === 'freteFOB'
                  "
                >
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="resposta.altura"
                      label="Altura"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: 'CM',
                        length: 12,
                        precision: 4,
                      }"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="resposta.altura"
                      label="Altura"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: 'CM',
                        length: 12,
                        precision: 4,
                      }"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="resposta.largura"
                      label="Largura"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: 'CM',
                        length: 12,
                        precision: 4,
                      }"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="resposta.comprimento"
                      label="Comprimento"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: 'CM',
                        length: 12,
                        precision: 4,
                      }"
                    ></ui-text-money>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" class="mt-n6">
                    <ui-text-money
                      v-model.number="resposta.peso"
                      label="Peso"
                      variant="filled"
                      :options="{
                        locale: 'pt-BR',
                        prefix: '',
                        suffix: 'CM',
                        length: 12,
                        precision: 4,
                      }"
                    ></ui-text-money>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-row v-if="resposta" class="mt-4">
            <v-col cols="12" sm="6" md="4">
              <ui-text-money
                v-model.number="(resposta.ncm as string)"
                label="NCM"
                variant="filled"
                :options="{
                  locale: 'pt-BR',
                  prefix: '',
                  suffix: '',
                  length: 8,
                  precision: 0,
                }"
                :rules="rules.ncm"
              ></ui-text-money>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="resposta.garantia"
                label="Garantia"
                maxLength="30"
                variant="filled"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="resposta" class="mt-n5">
            <v-col cols="12">
              <v-textarea
                v-model.trim="resposta.observacoes"
                label="Observações"
                required
                clearable
                rows="3"
                :max="500"
                counter
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col align="end">
            <v-btn color="portalColor" variant="tonal" @click="clickSalvar">
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useTipoItemStore } from "../../../../stores/tipos/tipo-item";
import { Produto } from "../../../../types/produtos/produto";
import { TipoItem } from "../../../../types/tipos/tipo-item";
import { Cotacao } from "../../../../types/cotacoes/cotacao";
import { CotacaoItem } from "../../../../types/cotacoes/cotacao-item";
import { CotacaoItemResposta } from "../../../../types/cotacoes/cotacao-item-resposta";
import { useUserStore } from "../../../../stores/users/user";
import { useStatusStore } from "../../../../stores/status/status";

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
  resposta: {
    type: Object as PropType<CotacaoItemResposta>,
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

/// STATUS
const statusStore = useStatusStore();

/// TIPO ITEM
const tipoItemStore = useTipoItemStore();

/// USER
const userStore = useUserStore();
const user = userStore.user;
const pessoa = userStore.getPessoa;
const empresa = userStore.getEmpresa;

/// UNIDADE MEDIDA
const unidadeMedida = (produto: Produto): TipoItem => {
  return tipoItemStore.getBy(produto.unidadeMedidaId as number) as TipoItem;
};

/// SALVAR
const clickSalvar = async () => {
  props.resposta.itemId = props.cotacaoItem?.id as number;
  props.resposta.statusId =
    props.resposta.statusId || (statusStore.getBy("Cadastro")?.id as number);
  props.resposta.vendedorId = pessoa.id;
  props.resposta.fornecedorId = empresa.id;
  props.resposta.isEscolhida = false;
  try {
    if (!props.resposta.id) {
      await post(`cotacoes-itens-respostas`, props.resposta);
    } else  {
      await put(`cotacoes-itens-respostas`, props.resposta);
    }
  } catch (err) {
    console.log(err);
  }
};

/// PANEl
const panelOpen = ref(0);

/// RULES
const rules = ref<any>({
  valorLiquido: [(v: number) => !!v || "Valor líquido obrigatório"],
  valorBruto: [(v: number) => !!v || "Valor bruto obrigatório"],
  pis: [(v: number) => !!v || "PIS obrigatório"],
  confins: [(v: number) => !!v || "COFINS obrigatório"],
  icms: [(v: number) => !!v || "ICMS obrigatório"],
  IPI: [(v: number) => !!v || "IPI obrigatório"],
  iss: [(v: number) => !!v || "ISS obrigatório"],
  prazoEntrega: [(v: number) => !!v || "Prazo obrigatório"],
  ncm: [(v: number) => !!v || "NCM obrigatório"],
});
</script>

<style scoped></style>
