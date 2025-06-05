<template>
    <v-expansion-panel :key="componentKey">
      <v-expansion-panel-title>
        <v-row>
          <v-col align="start" cols="10">
            <span class="text-h6 font-weight-medium"> Sites </span>
          </v-col>
          <v-col v-if="model.length <= 0" cols="2">
            <v-icon large color="red"> mdi-circle-small </v-icon>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row v-if="!pageModeView" justify="end">
          <v-col cols="12" class="text-right">
            <v-btn
              color="green"
              density="compact"
              size="small"
              icon="mdi-plus"
              :disabled="model.length >= maxRegistro"
              @click="addSite"
            />
          </v-col>
        </v-row>
        <div class="my-1" v-for="(site, i) in model" :key="`site${i}`">
          <div v-if="pageModeView">
            <v-row justify="center">
              <v-col align="center">
                <a :href="site.site" target="_blank">{{ site.site }}</a>
                <v-divider v-if="i < model.length - 1" class="mt-2"></v-divider>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-row justify="center">              
              <v-col class="mt-n2" cols="11">
                <v-text-field
                  v-model="site.site"
                  label="Site"
                  variant="underlined"
                  type="text"
                />
              </v-col>
              <v-col v-if="!pageModeView" cols="1">
                <v-btn
                  color="red"
                  density="compact"
                  size="small"
                  icon="mdi-minus"
                  @click="deletaSite(i)"
                />
              </v-col>
            </v-row>
          </div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </template>
  
  <script setup lang="ts">
  import { useTipoItemStore } from "../../../../stores/tipos/tipo-item";
  import { useTipoStore } from "../../../../stores/tipos/tipo";
  import { useStatusStore } from "../../../../stores/status/status";
  import { PessoaSite } from "../../../../types/pessoas/pessoa-site";
  import { Pessoa } from "../../../../types/pessoas/pessoa";
  
  const props = defineProps({
    modelValue: {
      type: Array as PropType<Array<PessoaSite>>,
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
  
  const maxRegistro = ref<number>(4);
  
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
  
  /// DOCUMENTO
  const sites = computed(() => {
    return tipoItemStore.getByTipoId(tipoStore.getBy("site")?.id || 0);
  });
  
  const addSite = () => {
    model.value.push({
      id: null,
      site: "",
      statusId: statusStore.getBy("Ativo")?.id || 0,
      pessoaId: props.pessoa.id as number,
    });
  
    updateComponent();
  };
  
  const deletaSite = (index: number) => {
    model.value.splice(index, 1);
    updateComponent();
  };
  
  /// RULES
  const rules = ref({
    CNPJ: [
      (value: string | null) => !!value || "CNPJ é obrigatório",
      (value: string) => (value && value.length <= 18) || "CNPJ inválido",
    ],
  
    IE: [(value: string | null) => !!value || "IE é obrigatório"],
  });
  </script>
  
  <style scoped></style>
  