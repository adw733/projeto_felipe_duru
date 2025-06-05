<template>
  <div v-if="convite">
    <PaginasTitulos title="Convite"></PaginasTitulos>
    <PaginasConvitesEditInsert
      :conviteProp="convite"
      :uuid="uuid"
      @salvar="clickSalvar"
    />
  </div>
</template>

<script setup lang="ts">
import { Convite } from "../../../types/convites/convite";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const { uuid } = useRoute().params;
const convite = ref(await getId(`convites/${uuid}`));

const clickSalvar = async (body: Convite) => {
  try {
    const mask = "+55 (##) # ####-####";
    body.celularContato = body.celularContato = unMask(
      body.celularContato,
      mask
    );

    const response = await put(`convites/${uuid}`, body);
    convite.value = response;
    useRouter().push(`/convites/${uuid}`);
  } catch (err) {
    console.log(err);
  }
};

/// HEAD
setTimeout(() => {
  useHead({
    title: `Convite | ${convite.value.nome || ""}`,
    meta: [
      {
        name: convite.value.nomeEmpresa || "",
        content: convite.value.nomeEmpresa || "",
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
