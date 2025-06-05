<template>
  <v-container>
    <v-row v-if="artigo" justify="center">
      <v-col align="center" cols="12" md="8">
        <v-card>
          <v-row v-if="artigo.anexo?.id">
            <v-col>
              <v-img
                class="align-end text-white"
                max-height="350"
                :src="artigo.anexo.url"
                cover
              />
            </v-col>
          </v-row>
          <v-container>
            <v-row>
              <v-col align="start">
                <v-text-field
                  v-model="artigo.titulo"
                  clearable
                  density="compact"
                  label="Título"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="my-5" />
            <v-row>
              <v-col align="start">
                <v-text-field
                  v-model="artigo.autor"
                  clearable
                  density="compact"
                  label="Autor"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="mt-n3" />
            <v-row>
              <v-col align="start">
                <v-text-field
                  v-model="artigo.tags"
                  clearable
                  density="compact"
                  label="Tags"
                  variant="outlined"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider class="mt-n3" />
            <v-row>
              <v-col align="start">
                <v-switch
                 :value="!!artigo.dataPublicacao"
                  color="blue"
                  hide-details
                  inset
                  label="Publicar"
                  @click="changeDataPublicacao"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-row class="my-2">
          <v-col align="start">
            <v-textarea
              v-model="artigo.resumo"
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
              <BasesRichText v-model="artigo.texto" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
  <PaginasBottomNavigation
    pagina="artigos"
    :rota="uuid"
    :pageModeView="false"
    @salvar="clickSalvar"
  ></PaginasBottomNavigation>
</template>

<script setup lang="ts">
import { Artigo } from "../../../types/artigos/artigo";

export interface Rules {
  resumo: any;
}

export interface Props {
  artigoProp: Artigo;
  uuid?: string | string[];
}

const props = defineProps<Props>();
const emit = defineEmits(["salvar"]);

const artigo = ref<Artigo>(props.artigoProp);
const panelOpen = ref(0);
const rules = ref<Rules>({
  resumo: [(v: String) => v.length <= 300 || "Max 300 caracteres"],
});

const clickSalvar = async () => {
  emit("salvar", artigo.value);
};

const changeDataPublicacao = async () => {
  if (artigo.value.dataPublicacao) {
    artigo.value.dataPublicacao = null;
  } else {
    artigo.value.dataPublicacao = new Date();
  }
};
</script>

<style scoped></style>
