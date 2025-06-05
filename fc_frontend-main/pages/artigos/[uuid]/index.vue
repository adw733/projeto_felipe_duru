<template>
  <div v-if="artigo">
    <PaginasTitulos :title="artigo.titulo"></PaginasTitulos>
    <v-row justify="center">
      <v-col align="center" cols="12" md="8">
        <v-row class="mb-n8">
          <v-col align="start">
            <span class="text-caption font-weight-bold">Autor: </span>
            <span class="text-body-2">{{ artigo.autor }}</span>
          </v-col>
          <v-col align="end">
            <span class="text-caption font-weight-bold">publicação: </span>
            <span v-if="artigo.dataPublicacao" class="text-body-2">{{
              dateFormat(artigo.dataPublicacao, "dd/MM/yyyy")
            }}</span>
            <span v-else class="text-body-2">Não publicado</span>
          </v-col>
        </v-row>
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
                      v-if="artigo.anexo"
                      class="align-end text-white"
                      max-height="350"
                      cover
                      :src="artigo.anexo.url"
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
        <v-row
          v-if="artigo.tags.length > 0"
          class="mt-n4"
          justify="space-around"
        >
          <v-col align="start">
            <v-chip
              v-for="(tag, i) of artigo.tags.split(',')"
              :key="i"
              class="mr-2"
              color="cyan"
              label
              text-color="white"
              size="small"
            >
              <v-icon start icon="mdi-label"></v-icon>
              {{ tag }}
            </v-chip>
          </v-col>
        </v-row>
        <v-container>
          <v-row>
            <v-col align="start">
              <div v-html="artigo.texto"></div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <dialog-anexo
      v-model="showAnexo"
      pagina="artigo"
      :registroId="artigo.id"
      :tipoId="1303"
      :anexo="artigo.anexo"
      @changeAnexo="changeAnexo"
    />
    <PaginasBottomNavigation
      pagina="artigos"
      :rota="uuid"
      :pageModeView="true"
      :extraButtons="{ hasShare: true, hasBack: true, hasEdit: isLoggedIn }"
      @share="clickShare"
    ></PaginasBottomNavigation>
  </div>
</template>
<script setup lang="ts">
import { Anexo } from "../../../types/anexos/anexo";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const { uuid } = useRoute().params;
const artigo = ref(await getId(`artigos/${uuid}`));

const clickShare = () => {
  const shareData = {
    title: artigo.value.titulo,
    text: artigo.value.resumo,
    url: `${window.location.href}/${artigo.value.uuid}`,
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
  artigo.value.anexo = anexo;

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
    title: `Artigo | ${artigo.value.titulo || ""}`,
    meta: [
      {
        name: artigo.value.titulo || "",
        content: artigo.value.descricao || "",
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
