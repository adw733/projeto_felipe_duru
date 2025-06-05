<template>
  <v-expansion-panel :key="componentKey">
    <v-expansion-panel-title>
      <v-row>
        <v-col align="start" cols="10">
          <span class="text-h6 font-weight-medium"> Subgrupo </span>
        </v-col>
        <v-col v-if="model.length <= 0" cols="2">
          <v-icon large color="red"> mdi-circle-small </v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div>
        <v-row v-if="pageModeView" justify="center">
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
        <v-row class="mt-n1 ml-n6">
          <v-col align="center">
            <v-btn variant="text" color="blue" @click="openContato()">
              <span class="text-body-2">Solicitar cadastro</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-if="pageModeView">
        <v-row>
          <v-col align="start">
            <v-text-field
              v-model="search"
              label="Busca"
              variant="underlined"
              type="text"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col align="center">
            <v-table density="compact" fixed-header hover>
              <thead>
                <tr>
                  <th class="text-left">Grupo</th>
                  <th class="text-left">Subgrupo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(grupoitem, i) in gruposItens" :key="i">
                  <td>
                    {{
                      grupoStore.getBy(
                        gruposItensStore.getBy(grupoitem.grupoitemId)
                          ?.grupoId || 0
                      )?.nomeAlternativo
                    }}
                  </td>
                  <td>
                    {{ gruposItensStore.getBy(grupoitem.grupoitemId)?.nome }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row justify="center">
          <v-col align="center">
            <ui-autocomplete
              v-model="modelGrupositens"
              :itensIniciais="grupositens"
              label="Subgrupos"
              multiple
              item-text="text"
              item-value="value"
              chips
              closable-chips
              :path="`grupos-itens/autocomplete/0`"
            >
              <template v-slot:chip="{ props, item }">
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
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.text"
                  :subtitle="item.group"
                ></v-list-item>
              </template>
            </ui-autocomplete>
          </v-col>
        </v-row>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { useTipoItemStore } from "../../../../stores/tipos/tipo-item";
import { useTipoStore } from "../../../../stores/tipos/tipo";
import { useStatusStore } from "../../../../stores/status/status";
import { useGrupoStore } from "../../../../stores/grupos/grupo";
import { useGrupoItemStore } from "../../../../stores/grupos/grupo-item";
import { PessoaGrupoitem } from "../../../../types/pessoas/pessoa-grupoitem";
import { Pessoa } from "../../../../types/pessoas/pessoa";
import { TipoItem } from "../../../../types/tipos/tipo-item";

const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<PessoaGrupoitem>>,
    default: [],
  },
  pessoa: {
    type: Object as PropType<Pessoa>,
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

/// GRUPO
const grupoStore = useGrupoStore();

/// GRUPO ITEM
const gruposItensStore = useGrupoItemStore();

const gruposItens = computed(() => {
  return model.value.filter((grupoitem: PessoaGrupoitem) => {
    const grupo = grupoStore.getBy(
      gruposItensStore.getBy(grupoitem.grupoitemId)?.grupoId || 0
    );
    const nomeGrupoitem: any =
      gruposItensStore.getBy(grupoitem.grupoitemId)?.nome || "";

    const searchValue = search.value
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const nomeGrupoitemValue = nomeGrupoitem
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return (
      nomeGrupoitemValue.search(searchValue) >= 0 &&
      grupo?.tipoId === contextoId.value
    );
  });
});

const grupositens = computed(() => {
  const arrayGrupositens = [];

  for (let grupoitem of model.value) {
    const objetoGrupoitem = gruposItensStore.getBy(grupoitem.grupoitemId);

    if (objetoGrupoitem) {
      const objeto = {
        value: objetoGrupoitem.id,
        text: objetoGrupoitem.nome,
        group: grupoStore.getBy(objetoGrupoitem.grupoId)?.nomeAlternativo,
      };
      arrayGrupositens.push(objeto);
    }
  }

  return arrayGrupositens;
});

const modelGrupositens = ref<Array<number>>(
  model.value ? model.value.map((grupoitem) => grupoitem.grupoitemId) : []
);

watch(modelGrupositens, () => {
  model.value = [];
  modelGrupositens.value.forEach((modelGrupoitem) => {
    const gruposItens = model.value;
    model.value = [
      ...gruposItens,
      {
        statusId: statusStore.getBy("Ativo")?.id || 0,
        pessoaId: props.pessoa.id as number,
        grupoitemId: modelGrupoitem,
      },
    ];
  });
});

/// SEARCH
const search = ref<any>("");

/// CONTEXTO
const contextoId = ref<number | null>(501);
const contextos = computed(() => {
  if (contextoId.value) {
    const paiId = tipoItemStore.getBy(contextoId.value)?.tipoId;

    if (paiId) {
      return tipoItemStore
        .getByTipoId(paiId)
        .map((tipoItem: TipoItem) => {
          return {
            value: tipoItem.id,
            text: tipoItem.codigo,
          };
        });
    }
  }
});

/// CONTATO
const openContato = () => {
  const route = useRouter().resolve({ path: "/contatos" });

  window.open(route.href, "_blank");
};
</script>

<style scoped></style>
