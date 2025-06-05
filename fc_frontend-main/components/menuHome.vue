<template>
  <v-card elevation="0">
    <v-layout>
      <v-row>
        <v-col cols="12">
          <v-app-bar scroll-behavior="elevate">
            <v-toolbar-title>
              <NuxtLink class="nuxtLink" to="/">
                <v-img
                  alt="Portal Fecom Ferramenta de compras"
                  :aspect-ratio="16 / 9"
                  :width="145"
                  height="50"
                  src="https://dsm01pap005files.storage.live.com/y4mmOt5alcnkhvHvWRux25XuFu6q6V8pvIRd9BxvvjG_kgRv7yURPsfSnaAa2zRiMoGZEdKyoRGLEfX8UBbPPcKaCsD5xoqIG8hAiJ6COgc3iIMVI1R9lMkuhx2tS6JKetlsrnFq4BUe3ZeIY--Jahsvw93ofOd6ZlkOaXkIgjcdSuBxyOy3pwXzsLuUZNT7up3?width=256&height=90&cropmode=none"
                ></v-img>
              </NuxtLink>
            </v-toolbar-title>

            <div v-if="menus.length">
              <template v-for="menu in menus" :key="menu.uuid">
                <NuxtLink class="nuxtLink" :to="menu.rota">
                  <v-btn @click="clickMenu">
                    <span class="text-body-1 font-weight-bold">{{
                      menu.nome
                    }}</span>
                  </v-btn>
                </NuxtLink>
              </template>
            </div>
            <slot name="entrar" />
          </v-app-bar>
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
/// PAGINA
const { menus } = defineProps(["menus"]);
</script>

<style scoped>
.nuxtLink {
  text-decoration: none;
  color: black;
}
</style>
