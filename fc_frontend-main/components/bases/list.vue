<template>
  <PaginasTitulos :title="titulo"></PaginasTitulos>
  <v-row v-if="contextos?.length" justify="center">
    <v-chip-group v-model="contextoId" mandatory>
      <v-chip
        v-for="(contexto, i) in contextos"
        :key="i"
        class="text-body-1"
        :color="contexto.value === contextoId ? 'blue' : 'pink'"
        :variant="contexto.value === contextoId ? 'outlined' : 'outlined'"
        size="small"
        :value="contexto.value"
      >
        {{ contexto.text }}
      </v-chip>
    </v-chip-group>
  </v-row>


  <PaginasSearch
    :extraFilter="extraFilter"
    :rota="rota"
    :rotaFrontend="rotaFrontend"
    :menu="titulo"
    @clickSearch="clickSearch"
  />
  <v-row v-if="layout === 'grid'">
    <v-col
      v-for="dataset of datasets"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      :key="dataset.uuid"
    >
      <slot :dataset="dataset"></slot>
    </v-col>
  </v-row>
  <v-row v-if="layout === 'list'" justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-list class="overflow-hidden">
        <template v-for="dataset of datasets" :key="dataset.uuid">
          <slot :dataset="dataset"></slot>
        </template>
      </v-list>
    </v-col>
  </v-row>
  <PaginasPagination />
</template>

<script setup lang="ts">
import { useConstantesStore } from "../../stores/variaveis/constantes";
import { useControleStore } from "../../stores/variaveis/controle";
import { useMenuStore } from "../../stores/menus/menu";
import { useTipoItemStore } from "../../stores/tipos/tipo-item";
import { TipoItem } from "../../types/tipos/tipo-item";

const props = defineProps({
  extraFilter: {
    type: Object,
    default: {},
  },
  rota: {
    type: String,
    default: "",
  },
  rotaFrontend: {
    type: String,
    default: "",
  },
  titulo: {
    type: String,
    default: "",
  },
  layout: {
    type: String,
    default: "grid",
  },
  hasModalidade: {
    type: Boolean,
    default: false,
  },
});

/// CONTEUDO
const route = useRoute();
const constantesStore = useConstantesStore();
const menusStore = useMenuStore();
const tipoItemStore = useTipoItemStore();
const constantes = constantesStore;

const controleStore = useControleStore();

const menu = computed(() => {
  return menusStore.getBy(useRoute().path);
});

const contextoId = ref<number | null>(menu?.value?.contextoId || null);
const contextos = computed(() => {
  controleStore.setContextoId(contextoId.value);
  if (contextoId.value) {
    const paiId = tipoItemStore.getBy(contextoId.value)?.tipoId;

    if (paiId) {
      return tipoItemStore.getByTipoId(paiId).map((tipoItem: TipoItem) => {
        return {
          value: tipoItem.id,
          text: tipoItem.codigo,
        };
      });
    }
  }
});

watch(contextoId, () => {
  controleStore.setContextoId(contextoId.value);
  clickSearch();
});

const modalidadeId = computed(() => {
  return controleStore.getModalidade
})

watch(modalidadeId, () => {
  clickSearch();
});

const { rota } = props;

controleStore.setSkip(constantes.take * (controleStore.page - 1));

const buildUrl = (): string => {
  let url: string = `${rota}?take=${constantes.take}&skip=${controleStore.skip}`;

  if (contextoId.value) {
    url += `&contextoId=${contextoId.value}`;
  }

  if (modalidadeId.value) {
    url += `&modalidadeId=${modalidadeId.value}`;
  }
  Object.keys(route.query).forEach((key, i) => {
    url += `&${key}=${route.query[key]}`;
  });

  return url;
};
const url = ref<string>(buildUrl());

const response = await get(url.value);
const datasets = ref(response.data);
controleStore.setTotalRecord(response.total);

const clickSearch = async (urlSearch?: string | null) => {
  controleStore.setLoading(true);
  try {
    url.value = urlSearch || buildUrl();

    const response = await get(url.value);
    controleStore.setTotalRecord(response.total);
    datasets.value = response.data;
  } catch (err) {
    console.log(err);
  } finally {
    controleStore.setLoading(false);
  }
};
</script>

<style></style>
