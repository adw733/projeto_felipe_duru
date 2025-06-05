<template>
  <v-dialog
    v-model="model"
    max-width="600"
    min-width="350"
    transition="dialog-bottom-transition"
    persistent
  >
    <v-toolbar
      color="portalColor"
      class="fixed-bar"
      density="compact"
      theme="dark"
    >
      <v-row align="center">
        <v-col cols="3">
          <v-spacer></v-spacer>
        </v-col>
        <v-col align="center" cols="6">
          <v-toolbar-title>ARQUIVO</v-toolbar-title>
        </v-col>
        <v-col align="end" cols="3">
          <v-btn icon @click="model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-card rounded="0" class="hide-overflow">
      <v-card-text class="px-2">
        <v-row>
          <v-col>
            <v-file-input
              v-model="arquivo"
              label="Escolher arquivo"
              show-size
              :rules="rules.anexo"
            >
              <template v-slot:selection="{ fileNames }">
                <template v-for="fileName in fileNames" :key="fileName">
                  <span class="text-caption">
                    {{ fileName }}
                  </span>
                </template>
              </template>
            </v-file-input>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col align="center">
            <v-avatar
              v-if="previewImage"
              v-bind="props"
              class="overflow-hidden grey"
              size="200px"
              rounded=""
            >
              <v-img :src="previewImage" size="200px"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row v-if="previewImage">
          <v-col v-if="anexo?.id" align="start" cols="6">
            <v-btn block color="red" @click="deletarImagem">
              Deletar imagem
            </v-btn>
          </v-col>
          <v-col align="start" :cols="anexo?.id ? 6 : 12">
            <v-btn block color="portalColor" @click="salvarAnexo">
              Salvar imagem
            </v-btn>
          </v-col>          
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Anexo } from "../../types/anexos/anexo";
export interface Rules {
  anexo: any;
}

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  pagina: {
    type: String,
    required: true,
  },
  registroId: {
    type: Number,
    required: true,
  },
  tipoId: {
    type: Number,
    required: true,
  },
  anexo: {
    type: Object as PropType<Anexo>,
  },
});

// EMIT
const emit = defineEmits(["update:modelValue", "changeAnexo"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

/// URL
const arquivo = ref<Array<File>>([]);
const previewImage = computed(() => {
  if (arquivo.value && arquivo.value.length) {
    return URL.createObjectURL(arquivo.value[0]);
  } else if (props.anexo?.id) {
    return props.anexo.url;
  } else {
    return null;
  }
});

/// ANEXO
const salvarAnexo = async () => {
  const anexoId = props.anexo?.id
    ? {
        id: props.anexo.id,
        uuid: props.anexo.uuid,
      }
    : {};

  const newAnexo: Anexo = {
    ...anexoId,
    tipoId: props.tipoId,
    registroId: props.registroId,
    key: "",
    mimetype: arquivo.value[0].type,
    nome: arquivo.value[0].name,
    size: arquivo.value[0].size,
    url: "",
    pagina: props.pagina,
  };

  const formData = new FormData();
  formData.append("file", arquivo.value[0]);
  formData.append("anexo", JSON.stringify(newAnexo));
  
  let response: Anexo = {} as Anexo

  if (anexoId?.id) {
    response = await put("anexos", formData);
  } else {
    response = await post("anexos", formData);
  }

  emit("changeAnexo", response);
};

const deletarImagem = async () => {
  await put("anexos/remove", props.anexo);
  emit("changeAnexo", null);  
};

/// RULES
const rules = ref<Rules>({
  anexo: [
    (v: any) =>
      !v ||
      !v.length ||
      v[0].size < 2000000 ||
      "Anexo deve ser menor do que 2MB!",
  ],
});
</script>

<style scoped></style>
