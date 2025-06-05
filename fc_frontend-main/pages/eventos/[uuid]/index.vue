<template>
  <div v-if="evento">
    <PaginasTitulos title="Evento"></PaginasTitulos>
    <v-row justify="center">
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
                      v-if="evento.anexo"
                      class="align-end text-white"
                      max-height="350"
                      cover
                      :src="evento.anexo.url"
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
          <v-container>
            <v-row>
              <v-col align="start">
                <span class="text-h5">{{ evento.titulo }}</span>
              </v-col>
            </v-row>
            <v-row v-if="evento.data">
              <v-col align="start">
                <v-icon size="small">mdi-calendar-month-outline</v-icon>
                <span class="text-body-1 ml-2">{{
                  dateFormat(evento.data, "EEE, dd 'de' MMMM 'de' yyyy'")
                }}</span>
              </v-col>
            </v-row>
            <v-row class="mt-n4">
              <v-col align="start">
                <v-icon size="small">mdi-clock-outline</v-icon>
                <span class="text-body-1 ml-2"
                  >à partir de {{ evento.hora.substring(0, 5) }}h</span
                >
              </v-col>
            </v-row>
            <v-divider class="my-5" />
            <v-row justify="space-between">
              <v-col v-if="evento.tipoId" align="start" :cols="mdAndUp ? 4 : 12">
                <span class="text-body-2 font-weight-bold"
                  >{{ tipoItemStore.getBy(evento.tipoId)?.codigo }}:</span
                >
                <p class="text-body-2">{{ evento.endereco }}</p>
              </v-col>
              <v-divider :vertical="mdAndUp" />
              <v-col align="start" :cols="mdAndUp ? 4 : 12">
                <span class="text-body-2 font-weight-bold">Organizador:</span>
                <p class="text-body-2">{{ evento.palestrante }}</p>
              </v-col>
              <v-divider :vertical="mdAndUp" />
              <v-col align="start" :cols="mdAndUp ? 4 : 12">
                <span class="text-body-2 font-weight-bold">Duração:</span>
                <p class="text-body-2">{{ evento.duracao.substring(0, 5) }}h</p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-expansion-panels class="mt-10" v-model="panelOpen">
          <v-expansion-panel>
            <v-expansion-panel-title
              expand-icon="mdi-plus"
              collapse-icon="mdi-minus"
            >
              Mais informações
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-container>
                <v-row>
                  <v-col align="start">
                    <div v-html="evento.descricao"></div>
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
      pagina="evento"
      :registroId="(evento.id as number)"
      :tipoId="1302"
      :anexo="(evento.anexo as Anexo)"
      @changeAnexo="changeAnexo"
    />
    <PaginasBottomNavigation
      pagina="eventos"
      :rota="uuid"
      :pageModeView="true"
      :extraButtons="{ hasShare: true, hasBack: true, hasEdit: isLoggedIn }"
      @share="clickShare"
    ></PaginasBottomNavigation>
  </div>
</template>
<script setup lang="ts">
import { Anexo } from "../../../types/anexos/anexo";
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { Evento } from "../../../types/eventos/evento";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// TIPOITEM
const tipoItemStore = useTipoItemStore()

/// CONTEUDO
const { uuid } = useRoute().params;
const evento = ref<Evento>(await getId(`eventos/${uuid}`));
const panelOpen = ref(0);

const clickShare = () => {
  const shareData = {
    title: evento.value.titulo,
    text: evento.value.resumo,
    url: `${window.location.href}/${evento.value.uuid}`,
  };
  navigator.share(shareData);
};

/// ANEXO
const showAnexo = ref<boolean>(false);
const clickAnexo = () => {
  showAnexo.value = true;
};

const changeAnexo = (anexo: Anexo | null) => {
  showAnexo.value = false;
  evento.value.anexo = anexo;

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
    title: `Evento | ${evento.value.titulo || ""}`,
    meta: [
      {
        name: evento.value.titulo || "",
        content: evento.value.descricao || "",
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
</style>
