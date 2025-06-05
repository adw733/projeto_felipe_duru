<template>
  <v-dialog
    v-model="model"
    max-width="600"
    min-width="350"
    transition="dialog-bottom-transition"
    
  >
    <v-toolbar color="portalColor" class="fixed-bar" density="compact" theme="dark">
      <v-row align="center">
        <v-col cols="3">
          <v-spacer></v-spacer>
        </v-col>
        <v-col align="center" cols="6">
          <v-toolbar-title>FORNECEDOR</v-toolbar-title>
        </v-col>
        <v-col align="end" cols="3">
          <v-btn icon @click="model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-card rounded="0" class="hide-overflow">
      <v-card-text>
        <v-row justify="center">
          <v-col align="center">
            <v-avatar size="80">
              <!-- <img
                v-if="fornecedor.foto"
                :src="fornecedor.foto"
                :alt="fornecedor.nome"
              /> -->
              <v-icon size="80"> mdi-account </v-icon>
            </v-avatar>
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-n5">
          <v-col align="center">
            <span class="text-h6">
              {{ fornecedor.nome }}
            </span>
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-n7">
          <v-col align="center">
            <v-rating
              :model-value="3.5"
              bg-color="orange-lighten-1"
              color="warning"
              half-increments
              size="small"
            ></v-rating>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-n10">
          <v-col align="center">
            <v-btn variant="text">
              <span class="text-body-2"> (3,5 / 5) </span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-n8">
          <v-col cols="6" align="center">
            <span class="text-caption"> 10 pedidos de venda </span>
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-n3">
          <v-col align="center">
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row v-if="fornecedor.areaAtuacao" justify="center" class="mt-n3">
          <v-col align="center">
            <span class="text-subtitle-2 font-weight-bold"> Atuação: </span>
            <span class="text-body-1">
              {{ fornecedor.areaAtuacao }}
            </span>
          </v-col>
        </v-row>

        <v-row v-if="getEndereco" justify="center" class="mt-n5">
          <v-col align="center">
            <span class="text-subtitle-2 font-weight-bold"> Cidade: </span>
            <span class="text-body-1">
              {{ getEndereco }}
            </span>
          </v-col>
        </v-row>

        <v-row
          v-if="fornecedor.pessoasSites?.length"
          justify="center"
          class="mt-n6"
        >
          <v-col align="center">
            <span class="text-subtitle-2 font-weight-bold">Site:</span>
              <v-btn color="blue" class="text-body-1 ml-n3" variant="text" @click="clickSite">
                {{ fornecedor.pessoasSites[0].site }}
              </v-btn>            
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { PessoaEndereco } from "../../../types/pessoas/pessoa-endereco";
import { useCidadeStore } from "../../../stores/cidades/cidade";
import { useEstadoStore } from "../../../stores/estados/estado";
import { Pessoa } from "../../../types/pessoas/pessoa";

const cidadeStore = useCidadeStore();
const estadoStore = useEstadoStore();
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  fornecedor: {
    type: Object as PropType<Pessoa>,
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

const getEndereco = computed(() => {
  const endereco: PessoaEndereco | null = props.fornecedor?.pessoasEnderecos
    ? props.fornecedor?.pessoasEnderecos[0]
    : null;
  if (endereco) {
    const cidade = cidadeStore.getBy(endereco.cidadeId);
    const estado = estadoStore.getBy(endereco.estadoId);

    return `${cidade?.nome} - ${estado?.nomeAlternativo}`;
  }
  return null;
});

const clickSite = () => {
  if (props.fornecedor.pessoasSites?.length) {
    window.open(props.fornecedor.pessoasSites[0].site, "_blank");
  }
};
</script>

<style scoped>

</style>
