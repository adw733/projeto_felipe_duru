<template>
  <div v-if="integrante">
    <PaginasTitulos title="Integrante"></PaginasTitulos>
    <v-row justify="center">
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
        <v-row class="mt-n2" justify="center">
          <v-col align="center">
            <span class="text-h6 font-weight-medium">
              {{ integrante.nome }}</span
            >
          </v-col>
        </v-row>

        <v-row v-if="integrante.nomeAlternativo" class="mt-n2" justify="center">
          <v-col align="center">
            <span class="text-body-2 font-weight-bold"> Fantasia: </span>
            <span class="text-body-1"> {{ integrante.nomeAlternativo }}</span>
          </v-col>
        </v-row>

        <v-row v-if="integrante.dataNascimento" class="mt-n5">
          <v-col>
            <span class="text-body-2 font-weight-bold"> Data nascimento: </span>

            <span class="text-body-1 font-weight-medium">
              {{ dateFormat(integrante.dataNascimento, "dd/MM/yyyy") }}
            </span>
          </v-col>
        </v-row>

        <v-expansion-panels class="mt-10" multiple v-model="panelOpen">
          <PaginasIntegrantesPanelTelefone
            :pessoa="integrante"
            :pageModeView="true"
          />
          <PaginasIntegrantesPanelEmail
            :pessoa="integrante"
            :pageModeView="true"
          />
          <PaginasIntegrantesPanelPerfil
            v-model="integrante.pessoasPerfis"
            :pessoa="integrante"
            :pageModeView="true"
          />
        </v-expansion-panels>
      </v-col>
    </v-row>
    <PaginasBottomNavigation
      pagina="integrantes"
      :rota="uuid"
      :pageModeView="true"
      :extraButtons="{ hasBack: true, hasEdit: true }"
    ></PaginasBottomNavigation>
  </div>
</template>
<script setup lang="ts">
/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const { uuid } = useRoute().params;
const integrante = ref(await getId(`pessoas/integrantes/${uuid}`));
const panelOpen = ref([0]);

/// HEAD
setTimeout(() => {
  useHead({
    title: `Integrante | ${integrante.value?.nome || ""}`,
    meta: [
      {
        name: integrante.value?.nome || "",
        content: integrante.value?.nome || "",
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
