<template>
  <v-container>
    <v-row v-if="integrante" justify="center">
      <v-col align="center" cols="12" md="8">
        <v-row justify="center">
          <v-col cols="auto">
            <v-avatar size="100">
              <img
                v-if="integrante.foto"
                :src="integrante.foto"
                :alt="integrante.nome"
              />
              <v-icon v-else size="100"> mdi-account </v-icon>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col>
            <v-text-field
              v-model="integrante.nome"
              clearable
              label="Nome"
              variant="underlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col align="start" class="mt-n5" cols="12" md="8">
            <v-text-field
              v-model="integrante.nomeAlternativo"
              clearable
              label="Fantasia"
              variant="underlined"
            ></v-text-field>
          </v-col>
          <v-col align="start" class="mt-n5" cols="12" md="4">
            <span class="text-caption">Data nascimento</span>
            <input
              v-model="integrante.dataNascimento"
              class="v-field v-field--appended v-field--variant-underlined v-theme--light v-locale--is-ltr date"
              placeholder="DD/MM/AAAA"
              type="date"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <PaginasBottomNavigation
    :pagina="`integrantes/${integrante.uuid}`"
    :pageModeView="false"
    @salvar="clickSalvar"
  ></PaginasBottomNavigation>
</template>

<script setup lang="ts">
import { Pessoa } from "../../../types/pessoas/pessoa";

// PINIA
export interface Props {
  integranteProp: Pessoa;
}

const props = defineProps<Props>();
const emit = defineEmits(["salvar"]);

/// INTEGRANTE
const integrante = ref<any>(props.integranteProp);

const clickSalvar = async () => {
  emit("salvar", integrante.value);
};
</script>

<style scoped>
.date {
  margin-top: -3px;
  padding-top: -10px;
  padding-bottom: 0px;
  padding-left: 0px;
  width: 100%;
  border-bottom: 1px solid #7a7a7a7a !important;
}
</style>
