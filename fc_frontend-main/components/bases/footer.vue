<template>
  <v-row align="end">
    <v-footer v-if="!user.isLoggedIn" :app="isFixed" :border="false">
      <v-card class="bg-indigo text-white" width="100%">
        <v-card-text>
          <v-row>
            <v-col align="center">
              <v-btn
                v-for="(redeSocial, i) in redesSociais"
                :key="i"
                class="mx-4"
                :href="redeSocial.link"
                target="_blank"
                color="white"
                variant="text"
                icon
              >
                <v-icon size="24px">
                  {{ redeSocial.icon }}
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="mt-n3">
            <v-col align="center">
              <v-btn variant="text" class="text-caption">
                política de privacidade </v-btn
              >/
              <v-btn variant="text" class="text-caption"> termos de uso </v-btn>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row class="mt-1">
            <v-col align="center">
              <span>
                {{ new Date().getFullYear() }} — <strong>FECOM</strong>
              </span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-row>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/users/user";

/// CONTEUDO
const redesSociais = ref<Array<any>>([
  { icon: "mdi-facebook", link: "https://www.facebook.com/portalfecom" },
  { icon: "mdi-instagram", link: "https://www.instagram.com/portalfecom/" },
  {
    icon: "mdi-linkedin",
    link: "https://www.linkedin.com/company/portal-fecom/about/",
  },
  { icon: "mdi-twitter", link: "https://twitter.com/portalfecom" },
  {
    icon: "mdi-youtube",
    link: "https://www.youtube.com/channel/UC94a4k-RtodotfSUbF_no1Q",
  },
]);

const userStore = useUserStore();
const user = userStore.user;

const isFixed = ref<boolean>(
  window.innerHeight <= (window?.document?.activeElement?.scrollHeight || 0)
);
</script>

<style>
.noscroll {
  scroll-margin-block: inherit;
}
</style>
