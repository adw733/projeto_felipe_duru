<template>
  <v-card elevation="0" class="mx-auto">
      <v-layout>
        <v-row>
          <v-col>
            <v-app-bar color="indigo" density="comfortable">
              <v-app-bar-nav-icon
                @click.stop="clickDrawer()"
              ></v-app-bar-nav-icon>

              <v-toolbar-title v-if="user.isLoggedIn">
                <span
                  class="text-body-1 font-weight-medium text-uppercase text-white"
                >
                  {{ empresa.nomeAlternativo || empresa.nome }}
                </span>
              </v-toolbar-title>
              <v-toolbar-title v-else>
                <span
                  class="text-body-1 font-weight-light text-uppercase text-white"
                  >Portal</span
                >
                <span class="text-body-1 font-weight-bold text-white"
                  >FECOM</span
                >
              </v-toolbar-title>

              <slot name="entrar" />
            </v-app-bar>

            <v-navigation-drawer
              v-model="drawer"
              color="indigo"
              location="left"
              :permanent="permanent"
              :rail="rail"
              theme="dark"
            >
              <v-list density="compact" nav>
                <v-list-item
                  v-if="user.isLoggedIn"
                  :title="pessoa.nomeAlternativo || pessoa.nome"
                  :to="`/perfil`"
                  :subtitle="pessoa.pessoasEmails[0].email"
                >
                  <template v-slot:prepend>
                    <v-avatar class="mr-2" size="30px">
                      <v-img v-if="pessoa.anexo" :src="pessoa.anexo.url" />
                      <v-icon v-else dark size="30px"> mdi-account </v-icon>
                    </v-avatar>
                  </template>
                </v-list-item>
                <v-divider v-if="user.isLoggedIn" />
                <v-row v-if="user.isLoggedIn && drawer && !rail" class="mb-n9">
                  <v-col>
                    <v-switch
                      v-model="modalidadeId"
                      class="ml-2"
                      :disabled="!isHome"
                      :label="modalidadeLabel"                      
                      @change="changeModalidade"
                    ></v-switch>
                  </v-col>
                </v-row>
                <v-list-item
                  v-for="menu in menus"
                  :key="menu.uuid"
                  :prepend-icon="menu.icone"
                  :title="menu.nome"
                  :to="menu.rota"
                  @click="clickMenu"
                >
                </v-list-item>
              </v-list>

              <template v-slot:append>
                <div class="pa-2">
                  <v-btn block class="bg-red" theme="dark"  @click="logout()">
                    <v-icon>mdi-logout</v-icon>
                    <span class="text-body-1 ml-1">
                      <span v-if="user.isLoggedIn && drawer && !rail"
                        >Sair</span
                      >
                    </span>
                  </v-btn>
                </div>
              </template>
            </v-navigation-drawer>

            <v-row>
              <v-col cols="12">
                <slot />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <!-- <bases-footer /> -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-layout>
  </v-card>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/users/user";
import { useControleStore } from "../stores/variaveis/controle";
import { useTipoItemStore } from "../stores/tipos/tipo-item";

/// PAGINA
const { menus } = defineProps(["menus"]);

/// CONTROLE
const tipoItemStore = useTipoItemStore();

/// CONTROLE
const controleStore = useControleStore();

/// MODALIDADE
const modalidadeId = ref<boolean>(
  controleStore.getModalidade === tipoItemStore.getBy("modalidadeVendas")?.id
);
const modalidadeLabel = computed(() => {
  return tipoItemStore.getBy(controleStore.getModalidade as number)?.codigo;
});

const changeModalidade = () => {
  const compraId = tipoItemStore.getBy("modalidadeCompras")?.id;
  const vendaId = tipoItemStore.getBy("modalidadeVendas")?.id;

  if (!modalidadeId.value) {
    controleStore.setModalidadeId(compraId as number);
  } else {
    controleStore.setModalidadeId(vendaId as number);
  }
};

/// CONTEUDO
const drawer = ref(mdAndUp.value);
const rail = ref(mdAndUp.value);
const permanent = ref(mdAndUp.value);

const userStore = useUserStore();
const user = userStore.user;
const pessoa = userStore.getPessoa;
const empresa = userStore.getEmpresa;
const setLogout = userStore.setLogout;

const logout = () => {
  setLogout();
  reloadNuxtApp({ path: "/" });
};

const clickDrawer = () => {
  drawer.value = !mdAndUp.value ? !drawer.value : true;
  rail.value = mdAndUp.value ? !rail.value : false;
};

/// HOME
const isHome = computed(() => {
  return useRoute().path === "/dashboard"
})
</script>

<style scoped></style>
