<template>
  <v-row class="mb-5" justify="center">
    <v-col cols="12" md="8" lg="6">
      <v-text-field
        v-model="search"
        :append-icon="hasExtraFilter ? 'mdi-tune' : ''"
        append-inner-icon="mdi-magnify"
        density="compact"
        hide-details
        label="Busca"
        single-line
        variant="solo"
        @click:append="showExtraFilter = !showExtraFilter"
        @click:append-inner="clickSearch"
        @keypress.enter="clickSearch"
      ></v-text-field>
    </v-col>
  </v-row>
  <div v-if="showExtraFilter">
    <v-row v-if="extraFilter.prioridade" class="mb-n10 mt-n6" justify="center">
      <v-col align="start" xs="12" md="6">
        <v-select
          v-model="prioridadesId"
          :items="prioridades"
          label="Prioridade"
          multiple
          closable-chips
          hide-no-data
          item-title="codigo"
          item-value="id"
        >
          <template v-slot:selection="{ item }">
            <v-chip>
              <span>{{ item.title }}</span>
            </v-chip>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row v-if="extraFilter.status" class="mb-n10" justify="center">
      <v-col align="start" xs="12" md="6">
        <v-select
          v-model="statusId"
          :items="status"
          label="status"
          multiple
          closable-chips
          hide-no-data
          item-title="nome"
          item-value="id"
        >
          <template v-slot:selection="{ item }">
            <v-chip>
              <span>{{ item.title }}</span>
            </v-chip>
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row
      v-if="extraFilter.dataInicio || extraFilter.dataFim"
      class="mb-5"
      justify="center"
    >
      <v-col align="start" v-if="extraFilter.dataInicio" cols="6" md="4" lg="3">
        <input
          v-model="dataInicio"
          class="v-field v-field--appended v-field--single-line v-field--variant-solo v-theme--light v-locale--is-ltr date"
          placeholder="DD/MM/AAAA"
          type="date"
        />
      </v-col>
      <v-col v-if="extraFilter.dataFim" cols="6" md="4" lg="3">
        <input
          v-model="dataFim"
          class="v-field v-field--appended v-field--single-line v-field--variant-solo v-theme--light v-locale--is-ltr date"
          placeholder="DD/MM/AAAA"
          type="date"
        />
      </v-col>
    </v-row>
    <v-row v-if="extraFilter.estado || extraFilter.cidade" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-row>
          <v-col v-if="extraFilter.estado" cols="12" md="6" lg="4">
            <v-select
              v-model="estadosIds"
              :items="estados"
              label="Estados"
              multiple
              closable-chips
              hide-no-data
              item-title="nome"
              item-value="id"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ estadosIds.length - 1 }})
                </span>
              </template>
            </v-select>
          </v-col>
          <v-col v-if="extraFilter.cidade" cols="12" md="6" lg="4">
            <v-select
              v-model="cidadesIds"
              :items="cidades"
              label="Cidades"
              multiple
              closable-chips
              hide-no-data
              item-title="nome"
              item-value="id"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span
                  v-if="index === 2"
                  class="text-grey text-caption align-self-center"
                >
                  (+{{ estadosIds.length - 1 }})
                </span>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="extraFilter.tipoGrupo" class="mt-n7" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-row>
          <v-col cols="auto">
            <v-switch
              v-model="tipoGrupoProduto"
              color="portalColor"
              label="Produto"
            />
          </v-col>
          <v-col cols="auto">
            <v-switch
              v-model="tipoGrupoServico"
              color="portalColor"
              label="Serviço"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="extraFilter.resposta" class="mt-n10" justify="center">
      <v-col align="start" xs="12" md="6">
        <v-switch
          v-model="respondidas"
          inset
          color="portalColor"
          label="Só cotações respondidas"
        ></v-switch>
      </v-col>
    </v-row>
    <v-row v-if="extraFilter.busca" class="mt-n10" justify="center">
      <v-col align="start" xs="12" md="6">
        <v-btn block color="portalColor" @click="clickSearch">
          <span>buscar</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useConstantesStore } from "../../stores/variaveis/constantes";
import { useControleStore } from "../../stores/variaveis/controle";
import { useTipoItemStore } from "../../stores/tipos/tipo-item";
import { useTipoStore } from "../../stores/tipos/tipo";
import { useStatusStore } from "../../stores/status/status";
import { Estado } from "../../types/estados/estado";
import { TipoItem } from "../../types/tipos/tipo-item";
import { Status } from "../../types/status/status";

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
  menu: {
    type: String,
    default: "",
  },
});

/// CONTEUDO
const router = useRouter();
const route = useRoute();

const constantesStore = useConstantesStore();
const constantes = constantesStore;

const controleStore = useControleStore();
const controle = controleStore;

const tipoStore = useTipoStore();
const tipoItemStore = useTipoItemStore();

const statusStore = useStatusStore();

const emit = defineEmits(["clickSearch"]);

const { rota, extraFilter } = props;

const showExtraFilter = ref(false);
const dataInicio = ref(route.query.dataInicio || null);
const dataFim = ref(route.query.dataFim || null);
const search = ref(route.query.search || null);
const tipoGrupoProduto = ref<boolean>(true);
const tipoGrupoServico = ref<boolean>(true);
const estadosIds = ref<Array<number>>([]);
const estados = ref<Array<Estado>>();
const cidadesIds = ref<Array<number>>([]);
const cidades = ref<Array<Estado>>();
const prioridadesId = ref<Array<number>>([]);
const statusId = ref<Array<number>>([]);
const respondidas = ref<boolean>(false);

const hasExtraFilter = computed(() => {
  return Object.keys(extraFilter).length > 0;
});

const prioridades = computed((): Array<TipoItem> => {
  const tipoId = tipoStore.getBy("prioridade");
  return tipoItemStore.getByTipoId(tipoId?.id || 0);
});

const status = computed((): Array<Status> => {
  return statusStore.getAll?.filter((statu: Status) =>
    statu.options.menus?.includes(props.menu)
  );
});

const modalidadeId = computed(() => {
  return controleStore.getModalidade
})

const contextoId = computed(() => {
  return controleStore.getContexto
})

const buildURL = (): string => {
  let url: string = `${rota}?`;
  let query: {} = {};

  if (search.value) {
    console.log('search.value', search.value)
    url += `search=${search.value}&`;
    query = {
      search: search.value,
    };
  }

  if (modalidadeId.value) {
    url += `modalidadeId=${modalidadeId.value}&`;
  }

  if (contextoId.value) {
    url += `contextoId=${contextoId.value}&`;
  }

  if (dataInicio.value) {
    url += `dataInicio=${dataInicio.value}&`;
    query = {
      ...query,
      dataInicio: dataInicio.value,
    };
  }

  if (dataFim.value) {
    url += `dataFim=${dataFim.value}&`;
    query = {
      ...query,
      dataFim: dataFim.value,
    };
  }

  if (tipoGrupoProduto.value && !tipoGrupoServico.value) {
    const tipoItemId = tipoItemStore.getBy("prestacaoProduto")?.id;

    url += `tipoGrupoId=${tipoItemId}&`;
    query = {
      ...query,
      tipoGrupoId: tipoGrupoProduto.value,
    };
  }

  if (tipoGrupoServico.value && !tipoGrupoProduto.value) {
    const tipoItemId = tipoItemStore.getBy("prestacaoServico")?.id;

    url += `tipoGrupoId=${tipoItemId}&`;
    query = {
      ...query,
      tipoGrupoId: tipoGrupoServico.value,
    };
  }

  if (estadosIds.value.length) {
    url += `estadosIds=${JSON.stringify(estadosIds.value)}&`;
    query = {
      ...query,
      estadosIds: JSON.stringify(estadosIds.value),
    };
  }

  if (cidadesIds.value.length) {
    url += `cidadesIds=${JSON.stringify(cidadesIds.value)}&`;
    query = {
      ...query,
      cidadesIds: JSON.stringify(cidadesIds.value),
    };
  }

  if (prioridadesId.value.length) {
    url += `prioridadesId=${JSON.stringify(prioridadesId.value)}&`;
    query = {
      ...query,
      prioridadesId: JSON.stringify(prioridadesId.value),
    };
  }

  if (statusId.value.length) {
    url += `statusId=${JSON.stringify(statusId.value)}&`;
    query = {
      ...query,
      statusId: JSON.stringify(statusId.value),
    };
  }

  if (respondidas.value) {
    url += `respondidas=${respondidas.value}&`;
    query = {
      ...query,
      respondidas: respondidas.value,
    };
  }

  url += `take=${constantes.take}&skip=${controle.skip}`;

  Object.keys(route.query).forEach((key, i) => {
    url += `&${key}=${route.query[key]}`;
  });

  query = {
    ...query,
    page: controle.page,
  };

  router.push({ path: props.rotaFrontend || rota, query: query });

  return url;
};

const skip = computed(() => {
  return controle.skip;
});

watch(skip, () => {
  changePage();
});

const clickSearch = async () => {
  controle.resetPage();
  const url: string = buildURL();
  emit("clickSearch", url);
};

const changePage = async () => {
  const url: string = buildURL();
  emit("clickSearch", url);
};

onMounted(async () => {
  const query = route.query;

  if (extraFilter.estado) {
    const estadosQueryIds: string = query.estadosIds as string;

    if (estadosQueryIds?.length) {
      estadosIds.value = JSON.parse(estadosQueryIds);
    }

    estados.value = await get("estados/lista/fornecedores");
  }

  if (extraFilter.cidade) {
    const cidadesQueryIds: string = query.cidadesIds as string;

    if (cidadesQueryIds?.length) {
      cidadesIds.value = JSON.parse(cidadesQueryIds);
    }
  }
});

watch(estadosIds, async () => {
  if (estadosIds.value?.length) {
    cidades.value = await get(
      `cidades/lista/fornecedores?estadosIds=${JSON.stringify(
        estadosIds.value
      )}`
    );
  }
});
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
</style>
