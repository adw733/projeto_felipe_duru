<template>
  <div v-if="produto">
    <PaginasTitulos title="Produto"></PaginasTitulos>
    <v-row justify="center" class="mb-7">
      <v-col align="center" cols="12" md="8">
        <v-card>
          <v-row>
            <v-col>
              <v-tooltip text="Adicionar imagem">
                <template v-slot:activator="{ props }">
                  <div
                    v-bind="props"
                    class="overflow-hidden grey avatar"
                    @click="clickAnexo"
                  >
                    <v-img
                      v-if="produto.anexo"
                      class="align-end text-white"
                      max-height="350"
                      cover
                      :src="produto.anexo.url"
                    />
                    <v-img
                      v-else
                      class="align-end text-white"
                      max-height="350"
                      cover
                      src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    />
                  </div>
                </template>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-container class="py-0 my-0">
            <v-row class="mt-n2">
              <v-col align="center">
                <v-chip class="text-body-1" outlined small>
                  {{ tipoItemStore.getBy(produto.tipoId)?.codigo }}
                </v-chip>
                <v-chip
                  class="text-body-1 ml-2"
                  :color="statusStore.getBy(produto.statusId)?.options.cor"
                  dark
                  small
                >
                  {{ statusStore.getBy(produto.statusId)?.nome }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row v-if="produto.produto">
              <v-col align="center">
                <span class="text-h6 font-weight-bold">
                  {{ produto.produto }}
                </span>
              </v-col>
            </v-row>

            <v-row v-if="produto.unidadeMedidaId" class="mt-n4">
              <v-col align="center">
                <span class="text-body-2 font-weight-bold">
                  Unidade de medida:
                </span>
                <span>
                  {{ tipoItemStore.getBy(produto.unidadeMedidaId)?.codigo }}
                </span>
              </v-col>
            </v-row>

            <v-row v-if="produto.marca" class="mt-n4">
              <v-col align="center">
                <span class="text-body-2 font-weight-bold"> Marca: </span>
                <span>
                  {{ produto.marca }}
                </span>
              </v-col>
            </v-row>

            <v-row v-if="produto.modelo" class="mt-n4">
              <v-col align="center">
                <span class="text-body-2 font-weight-bold"> Modelo: </span>
                <span>
                  {{ produto.modelo }}
                </span>
              </v-col>
            </v-row>

            <v-row v-if="produto.fabricante" class="mt-n4">
              <v-col align="center">
                <span class="text-body-2 font-weight-bold"> Fabricante: </span>
                <span>
                  {{ produto.fabricante }}
                </span>
              </v-col>
            </v-row>

            <v-row v-if="produto.partNumber" class="mt-n4">
              <v-col align="center">
                <span class="text-body-2 font-weight-bold"> Part number: </span>
                <span>
                  {{ produto.partNumber }}
                </span>
              </v-col>
            </v-row>

            <v-row v-if="produto.ncm" class="mt-n4">
              <v-col align="center">
                <span class="text-body-2 font-weight-bold"> NCM: </span>
                <span>
                  {{ produto.ncm }}
                </span>
              </v-col>
            </v-row>

            <v-row v-if="produto.caracteristicas" class="mt-n4">
              <v-col align="center">
                <span class="text-body-2 font-weight-bold">
                  Características:
                </span>
                <span>
                  {{ produto.caracteristicas }}
                </span>
              </v-col>
            </v-row>

            <v-row v-if="produto.observacoes" class="mb-n6">
              <v-col>
                <v-textarea
                  label="Observações"
                  v-model="produto.observacoes"
                  readonly
                  color="grey"
                  auto-grow
                  no-resize
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-expansion-panels class="mt-5" v-model="panelOpen">
          <v-expansion-panel>
            <v-expansion-panel-title
              expand-icon="mdi-plus"
              collapse-icon="mdi-minus"
            >
              Grupos
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col align="start">
                    <v-chip
                      v-for="(
                        produtoGrupoItem, i
                      ) of produto.produtosGrupositens"
                      :key="i"
                      class="ma-1"
                      color="cyan"
                      label
                      text-color="white"
                      size="small"
                    >
                      <v-icon start icon="mdi-label"></v-icon>
                      {{
                        gruposItensStore.getBy(produtoGrupoItem.grupoitemId)
                          ?.nome
                      }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <dialog-anexo
      v-model="showAnexo"
      pagina="produto"
      :registroId="produto.id"
      :tipoId="1305"
      :anexo="produto.anexo"
      @changeAnexo="changeAnexo"
    />
    <PaginasBottomNavigation    
      pagina="produtos"
      :rota="uuid"
      :pageModeView="true"
      :extraButtons="{ hasBack: true, hasEdit: true }"
    ></PaginasBottomNavigation>
  </div>
</template>
<script setup lang="ts">
import { useStatusStore } from "../../../stores/status/status";
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { useGrupoItemStore } from "../../../stores/grupos/grupo-item";
import { Anexo } from "../../../types/anexos/anexo";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const statusStore = useStatusStore();
const tipoItemStore = useTipoItemStore();
const gruposItensStore = useGrupoItemStore();

const { uuid } = useRoute().params;
const produto = ref<any>(await getId(`produtos/${uuid}`));

const panelOpen = ref(0);

/// ANEXO
const showAnexo = ref<boolean>(false);
const clickAnexo = () => {
  showAnexo.value = true;
};

const changeAnexo = (anexo: Anexo | null) => {
  showAnexo.value = false;
  produto.value.anexo = anexo;

  updateKey();
};

/// COMPONENTKEY
const componentKey = ref<number>(1);
const updateKey = () => {
  componentKey.value += 1;
};

/// HEAD
setTimeout(() => {
  useHead({
    title: `Produto | ${produto.value.produto || ""}`,
    meta: [
      {
        name: produto.value.produto || "",
        content: produto.value.produto || "",
      },
    ],
  });
}, 150);
</script>
<style scoped>
.date {
  color: #7a7a7a;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 20px;
  border-radius: 5px;
  width: 100%;
}

.avatar {
  cursor: pointer;
}

.avatar:hover {
  background-color: #e0e0e0;
}
</style>
