<template>
  <NuxtLayout name="menu">
    <v-row>
      <v-col align="center">
        <v-card class="pa-7" max-width="600">
          <template v-slot:title>
            <v-row>
              <v-col align="center">
                <span class="text-h5 font-weight-bold">
                  Página não encontrada
                </span>
              </v-col>
            </v-row>
          </template>

          <template v-slot:text>
            <v-row>
              <v-col align="center">
                <span class="text-body-1">{{ error.message }}</span>
              </v-col>
            </v-row>
          </template>

          <v-card-actions class="mt-5">
            <v-row>
              <v-col align="center">
                <v-btn
                  color="#009F8A"
                  theme="dark"
                  variant="flat"
                  @click="handleClickError"
                  >Voltar para Home</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </NuxtLayout>
</template>

<script setup>
defineProps(["error"]);

const handleClickError = () => clearError({ redirect: "/" });
</script>

<style scoped></style>
