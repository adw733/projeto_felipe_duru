<template>
  <v-container>
    <v-row v-if="evento" justify="center">
      <v-col align="center" cols="12" md="8">
        <v-card>
          <v-row v-if="evento.anexo?.id">
            <v-col>
              <v-img
                class="align-end text-white"
                max-height="350"
                :src="evento.anexo.url"
                cover
              />
            </v-col>
          </v-row>
          <v-container>
            <v-row>
              <v-col align="start">
                <v-text-field
                  v-model="evento.titulo"
                  clearable
                  density="compact"
                  label="Título"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n10">
              <v-col align="start" :cols="mdAndUp ? 4 : 12">
                <span class="text-caption">Data</span>
                <input
                  v-model="evento.data"
                  class="v-field v-field--appended v-field--single-line v-field--variant-solo v-theme--light v-locale--is-ltr date"
                  placeholder="DD/MM/AAAA"
                  type="date"
                />
              </v-col>
              <v-col align="start" :cols="mdAndUp ? 3 : 6">
                <span class="text-caption">Hora</span>
                <input
                  v-model="evento.hora"
                  class="v-field v-field--appended v-field--single-line v-field--variant-solo v-theme--light v-locale--is-ltr date"
                  placeholder="HH:MM"
                  type="time"
                />
              </v-col>
              <v-col align="start" :cols="mdAndUp ? 3 : 6">
                <span class="text-caption">Duração</span>
                <input
                  v-model="evento.duracao"
                  class="v-field v-field--appended v-field--single-line v-field--variant-solo v-theme--light v-locale--is-ltr date"
                  placeholder="HH:MM"
                  type="time"
                />
              </v-col>
            </v-row>
            <v-divider class="my-5" />
            <v-row>
              <v-col align="start" :cols="mdAndUp ? 6 : 12">
                <v-select
                  v-model="evento.tipoId"
                  :items="tiposItensEvento"
                  density="compact"
                  item-title="nomeAlternativo"
                  item-value="id"
                  label="Modalidade"
                  variant="outlined"
                ></v-select>
              </v-col>
              <v-col align="start" :cols="mdAndUp ? 6 : 12">
                <v-text-field
                  v-model="evento.endereco"
                  clearable
                  density="compact"
                  label="Endereço"
                  variant="outlined"
                ></v-text-field>
              </v-col>
              <v-divider class="mt-n3" />
              <v-col align="start" :cols="mdAndUp ? 6 : 12">
                <v-text-field
                  v-model="evento.palestrante"
                  clearable
                  density="compact"
                  label="Organizador"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-row class="my-2">
          <v-col align="start">
            <v-textarea
              v-model="evento.resumo"
              counter
              label="Resumo"
              :rules="rules.resumo"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-expansion-panels v-model="panelOpen">
          <v-expansion-panel>
            <v-expansion-panel-title
              expand-icon="mdi-plus"
              collapse-icon="mdi-minus"
            >
              Mais informações
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <BasesRichText v-model="evento.descricao" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
  <PaginasBottomNavigation
    pagina="eventos"
    :rota="uuid"
    :pageModeView="false"
    @salvar="clickSalvar"
  ></PaginasBottomNavigation>
</template>

<script setup lang="ts">
import { useTipoStore } from "../../../stores/tipos/tipo";
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { Evento } from "../../../types/eventos/evento";

// PINIA
// tipos
const tipoStore = useTipoStore();

// tiposItens
const tipoItemStore = useTipoItemStore();

export interface Rules {
  resumo: any;
}

export interface Props {
  eventoProp: Evento;
  uuid?: string | string[];
}

const props = defineProps<Props>();
const emit = defineEmits(["salvar"]);

const tipoEvento = tipoStore.getBy("evento");
const tiposItensEvento = tipoItemStore.getByTipoId(tipoEvento ? tipoEvento.id : 0)

const evento = ref<Evento>(props.eventoProp);
const panelOpen = ref(0);
const rules = ref<Rules>({
  resumo: [(v: String) => v.length <= 300 || "Max 300 caracteres"],
});

const clickSalvar = async () => {
  emit("salvar", evento.value);
};
</script>

<style scoped></style>
