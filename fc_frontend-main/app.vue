<template>
  <div style="padding-bottom: 0px; margin-left: 0px; margin-right: 0px">
    <NuxtLayout class="semClass">
      <NuxtPage />
      <v-overlay
        :model-value="loading"
        class="align-center justify-center"
        style="z-index: 999"
      >
        <v-progress-circular indeterminate size="64" />
      </v-overlay>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useCidadeStore } from "./stores/cidades/cidade";
import { useControleStore } from "./stores/variaveis/controle";
import { useEstadoStore } from "./stores/estados/estado";
import { useGrupoItemStore } from "./stores/grupos/grupo-item";
import { useGrupoStore } from "./stores/grupos/grupo";
import { useMenuPerfilStore } from "./stores/menus/menu-perfil";
import { useMenuStore } from "./stores/menus/menu";
import { usePerfilStore } from "./stores/perfis/perfil";
import { useRegiaoStore } from "./stores/regioes/regiao";
import { useStatusStore } from "./stores/status/status";
import { useTipoItemStore } from "./stores/tipos/tipo-item";
import { useTipoStore } from "./stores/tipos/tipo";

// controle
const controleStore = useControleStore();
const loading = computed(() => {
  return controleStore.getLoading;
});

// status
const statusStore = useStatusStore();

// menus
const menuStore = useMenuStore();

// menus_perfis
const menusPerfilStore = useMenuPerfilStore();

// tipos
const tipoStore = useTipoStore();

// tipos_itens
const tipoItemStore = useTipoItemStore();

// perfis
const perfisStore = usePerfilStore();

// regioes
const regioesStore = useRegiaoStore();

// estados
const estadosStore = useEstadoStore();

// cidades
const cidadesStore = useCidadeStore();

// grupos
const grupoStore = useGrupoStore();

// grupos_itens
const gruposItensStore = useGrupoItemStore();

onMounted(async () => {
  await statusStore.setStatus();
  await menuStore.setMenus();
  await menusPerfilStore.setMenusPerfis();
  await tipoStore.setTipos();
  await tipoItemStore.setTiposItens();
  await perfisStore.setPerfis();
  await regioesStore.setRegioes();
  await estadosStore.setEstados();
  await cidadesStore.setCidades();
  await grupoStore.setGrupos();
  await gruposItensStore.setGruposItens();
});
</script>

<style>
.nuxtLink {
  text-decoration: none;
  color: black;
}

.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 0px;
  z-index: 10;
}
.v-sticky-bar {
  position: fixed;
  top: 148px;
  z-index: 5;
  width: 33%;
}

.hide-overflow {
  overflow: hidden !important;
}
</style>
