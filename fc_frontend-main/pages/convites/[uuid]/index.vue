<template>
  <div v-if="convite">
    <PaginasTitulos title="Convite"></PaginasTitulos>
    <v-row justify="center">
      <v-col align="center" cols="12" md="8">
        <v-row justify="center">
          <v-col align="center">
            <span class="text-h6 font-weight-bold">
              {{ convite.nomeEmpresa }}</span
            >
          </v-col>
        </v-row>
        <v-row class="mt-n5" justify="center">
          <v-col align="center">
            <span class="text-body-2 font-weight-bold"> Documento: </span>
            <span class="text-body-1">
              {{ mask(convite.documentoEmpresa, "##.###.###/####-##") }}</span
            >
          </v-col>
        </v-row>
        <v-row class="mt-n5" justify="center">
          <v-col align="center">
            <span class="text-body-2 font-weight-bold"> Contato: </span>
            <span class="text-body-1"> {{ convite.nomeContato }}</span>
          </v-col>
        </v-row>
        <v-row class="mt-n5" justify="center">
          <v-col align="center">
            <span class="text-body-2 font-weight-bold"> Email contato: </span>
            <span class="text-body-1"> {{ convite.emailContato }}</span>
          </v-col>
        </v-row>
        <v-row class="mt-n5" justify="center">
          <v-col align="center">
            <span class="text-body-2 font-weight-bold"> Celular contato: </span>
            <span class="text-body-1">
              {{ mask(convite.celularContato, ["(##) # ####-####"]) }}</span
            >
          </v-col>
        </v-row>
        <v-row class="mt-n5" justify="center">
          <v-col align="center">
            <span class="text-body-2 font-weight-bold"> Data convite: </span>
            <span class="text-body-1">
              {{ dateFormat(convite.createdAt, "dd/MM/yyyy") }}</span
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <PaginasBottomNavigation
      pagina="convites"
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
const convite = ref(await getId(`convites/${uuid}`));

/// HEAD
setTimeout(() => {
  useHead({
    title: `Convite | ${convite.value?.nome || ""}`,
    meta: [
      {
        name: convite.value?.nomeEmpresa || "",
        content: convite.value?.nomeContato || "",
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
