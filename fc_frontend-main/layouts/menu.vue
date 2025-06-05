<template>
  <!-- menu home -->
  <MenuHome v-show="mdAndUp && !user.isLoggedIn" :menus="menus">
    <template #entrar>
      <DialogLogin v-if="!user.isLoggedIn" />
    </template>
    <v-main style="height: 100% width: 100%;">
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </MenuHome>

  <!-- menu with drawer -->
  <MenuDrawer v-show="!mdAndUp || user.isLoggedIn" :menus="menus">
    <template #entrar>
      <DialogLogin v-if="!user.isLoggedIn" />
    </template>
    <v-main style="height: 100% width: 100%;">
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </MenuDrawer>
</template>

<script setup lang="ts">
import { useMenuStore } from "../stores/menus/menu";
import { useMenuPerfilStore } from "../stores/menus/menu-perfil";
import { useUserStore } from "../stores/users/user";
import { MenuPerfil } from "../types/menus/menu-perfil";
import { Menu } from "../types/menus/menu";

// menus
const menuStore = useMenuStore();
const menusParsed = JSON.parse(JSON.stringify(menuStore.menus));

// menus_perfis
const menusPerfilStore = useMenuPerfilStore();
const menusPerfisParsed = JSON.parse(
  JSON.stringify(menusPerfilStore.menusPerfis)
);

// user
const userStore = useUserStore();
const user = userStore.user;

const menusIncluded = Array.from(
  new Set(
    menusPerfisParsed
      .filter(
        (menu_perfil: MenuPerfil) =>
          (user.isLoggedIn &&
            user.pessoa.pessoa.pessoasPerfis
              ?.map((pessoaPerfil) => pessoaPerfil.perfilId)
              .includes(menu_perfil.perfilId ? menu_perfil.perfilId : 0)) ||
          (!user.isLoggedIn && menu_perfil.perfilId == null)
      )
      .map((menu_perfil: MenuPerfil) => menu_perfil.menuId)
  )
);

const menus = menusParsed
  .filter((menu: Menu) => menusIncluded.includes(menu.id))
  .filter((menu: Menu) => menu.nome != "Pessoa")
  .filter((menu: Menu) => menu.nome != "Home")
  .map((menu: Menu) => {
    return {
      id: menu.id,
      nome: menu.nome,
      rota: menu.rota,
      icone: menu.icone,
      ordem: menu.ordem,
      observacoes: menu.observacoes,
    };
  });
</script>

<style scoped></style>
