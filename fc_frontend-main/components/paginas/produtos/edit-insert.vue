<template>
  <v-container class="mb-7">
    <v-row v-if="produto" justify="center">
      <v-col align="center" cols="12" md="8">
        <v-card>
          <v-row v-if="produto.anexo?.id">
            <v-col>
              <v-img
                class="align-end text-white"
                max-height="350"
                :src="produto.anexo.url"
                cover
              />
            </v-col>
          </v-row>
          <v-container>
            <v-row class="mb-5">
              <v-col align="center">
                <v-chip class="text-body-1" outlined size="small">
                  {{ tipoItemStore.getBy(produto.tipoId)?.codigo }}
                </v-chip>
                <v-menu
                  v-model="statusMenu"
                  location="bottom"
                  transition="slide-y-transition"
                >
                  <template v-slot:activator="{ props }">
                    <v-chip
                      class="text-body-1 ml-2"
                      :color="statusStore.getBy(produto.statusId)?.options.cor"
                      theme="dark"
                      size="small"
                      v-bind="props"
                    >
                      {{ statusStore.getBy(produto.statusId)?.nome }}
                      <v-icon right small> mdi-pencil-outline </v-icon>
                    </v-chip>
                  </template>
                  <v-card width="250">
                    <v-list style="overflow-x: hidden">
                      <v-subheader>
                        <v-row class="my-n3">
                          <v-col align="center"> STATUS </v-col>
                        </v-row>
                      </v-subheader>
                      <v-divider></v-divider>
                      <v-list-item
                        v-for="(statusCombo, i) of status"
                        :key="i"
                        :class="`pa-0 ${i > 0 ? ' mt-n4 mb-n2' : ''}`"
                        @click="produto.statusId = statusCombo.value"
                      >
                        <v-btn
                          size="small"
                          variant="flat"
                          block
                          :color="
                            statusStore.getBy(statusCombo.value)?.options.cor
                          "
                        >
                          {{ statusCombo.text }}
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mt-n5" align="start" :cols="mdAndUp ? 6 : 12">
                <v-text-field
                  v-model="produto.produto"
                  clearable
                  density="compact"
                  label="Produto"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col class="mt-n5" align="start" :cols="mdAndUp ? 6 : 12">
                <v-select
                  v-model="produto.unidadeMedidaId"
                  :items="tiposItensUnidadeMedidas"
                  density="compact"
                  item-title="nomeAlternativo"
                  item-value="id"
                  label="Unidade Medida"
                  variant="outlined"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mt-n5" :cols="mdAndUp ? 4 : 12">
                <v-text-field
                  v-model="produto.modelo"
                  clearable
                  density="compact"
                  label="Modelo"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col class="mt-n5" :cols="mdAndUp ? 4 : 12">
                <v-text-field
                  v-model="produto.marca"
                  clearable
                  density="compact"
                  label="Marca"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col class="mt-n5" :cols="mdAndUp ? 4 : 12">
                <v-text-field
                  v-model="produto.fabricante"
                  clearable
                  density="compact"
                  label="Fabricante"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mt-n5" :cols="mdAndUp ? 6 : 12">
                <v-text-field
                  v-model="produto.partNumber"
                  clearable
                  density="compact"
                  label="Part number"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-col class="mt-n5" :cols="mdAndUp ? 6 : 12">
                <v-text-field
                  v-model="produto.ncm"
                  v-maska:[maskConfig()]
                  label="NCM"
                  variant="outlined"
                  density="compact"
                  type="tel"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="mt-n5">
                <v-text-field
                  v-model="produto.caracteristicas"
                  clearable
                  counter
                  density="compact"
                  label="Características"
                  variant="outlined"
                  placeholder="Tensão: 220V, Corrente: 20A, Aplicação: Motor elétrico"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="start" class="mt-n5">
                <v-textarea
                  v-model="produto.observacoes"
                  counter
                  label="Observações"
                  density="compact"
                  :rules="rules.observacoes"
                  variant="outlined"
                  rows="3"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-expansion-panels v-model="panelOpen" class="mt-5">
          <v-expansion-panel>
            <v-expansion-panel-title
              expand-icon="mdi-plus"
              collapse-icon="mdi-minus"
            >
              Subgrupos
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ui-autocomplete
                v-model="modelGrupositens"
                :itensIniciais="grupositens"
                label="Subgrupos"
                multiple
                item-text="text"
                item-value="value"
                chips
                closable-chips
                :path="`grupos-itens/autocomplete/${produto.tipoId}`"
              >
                <template
                  v-slot:chip="{ props, item }: { props: any, item: any }"
                >
                  <v-chip v-bind="props" class="py-5 ma-1" close>
                    <span class="text-caption mt-1">
                      <span class="text-caption font-weight-bold mt-1">
                        ({{ item.group }})
                      </span>
                      <br />
                      {{ item.text }}
                    </span>
                  </v-chip>
                </template>
                <template
                  v-slot:item="{ props, item }: { props: any, item: any }"
                >
                  <v-list-item
                    v-bind="props"
                    :title="item.text"
                    :subtitle="item.group"
                  ></v-list-item>
                </template>
              </ui-autocomplete>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
  <PaginasBottomNavigation
    :pagina="`produtos`"
    :rota="uuid"
    :pageModeView="false"
    @salvar="clickSalvar"
  ></PaginasBottomNavigation>
</template>

<script setup lang="ts">
import { useTipoStore } from "../../../stores/tipos/tipo";
import { Produto } from "../../../types/produtos/produto";
import { useStatusStore } from "../../../stores/status/status";
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { useGrupoStore } from "../../../stores/grupos/grupo";
import { useGrupoItemStore } from "../../../stores/grupos/grupo-item";
import { Status } from "../../../types/status/status";

interface Rules {
  observacoes: any;
}

export interface Props {
  produtoProp: Produto;
  uuid?: string | string[];
}
const props = defineProps<Props>();

/// EMIT
const emit = defineEmits(["salvar"]);

/// CONTEUDO
const tipoStore = useTipoStore();
const statusStore = useStatusStore();
const gruposItensStore = useGrupoItemStore();
const gruposStore = useGrupoStore();

const tipoItemStore = useTipoItemStore();
const tipoUnidadeMedida = tipoStore.getBy("unidadeMedida");

const tiposItensUnidadeMedidas = tipoItemStore.getByTipoId(
  tipoUnidadeMedida ? tipoUnidadeMedida.id : 0
);

const produto = ref<Produto>(props.produtoProp);
const statusMenu = ref<boolean>(false);
const panelOpen = ref(0);
const modelGrupositens = ref<Array<number>>(
  produto.value
    ? produto.value.produtosGrupositens.map(
        (grupoitem) => grupoitem.grupoitemId
      )
    : []
);
const rules = ref<Rules>({
  observacoes: [(v: String) => (v && v.length <= 300) || "Max 300 caracteres"],
});

const status = computed(() => {
  return statusStore.status
    .filter((status: Status) =>
      status?.options?.menus?.includes("Produtos/Serviços")
    )
    .filter((status) => produto.value.statusId != status.id)
    .map((status: Status) => {
      return {
        value: status.id,
        text: status.nome,
      };
    });
});

const grupositens = computed(() => {
  const arrayGrupositens = [];

  for (let grupoitem of produto.value.produtosGrupositens) {
    const objetoGrupoitem = gruposItensStore.getBy(grupoitem.grupoitemId);

    if (objetoGrupoitem) {
      const objeto = {
        value: objetoGrupoitem.id,
        text: objetoGrupoitem.nome,
        group: gruposStore.getBy(objetoGrupoitem.grupoId)?.nomeAlternativo,
      };
      arrayGrupositens.push(objeto);
    }
  }

  return arrayGrupositens;
});

watch(modelGrupositens, () => {
  produto.value.produtosGrupositens = [];
  modelGrupositens.value.forEach((modelGrupoitem) => {
    const gruposItens = produto.value.produtosGrupositens;
    produto.value.produtosGrupositens = [
      ...gruposItens,
      {
        produtoId: produto.value.id,
        grupoitemId: modelGrupoitem,
      },
    ];
  });
  console.log(produto.value);
});

const clickSalvar = async () => {
  emit("salvar", produto.value);
};

/// MASK
const maskConfig = () => {
  const options = {
    mask: "########",
  };
  return options;
};
</script>

<style scoped></style>
