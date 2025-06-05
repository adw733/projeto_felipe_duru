<template>
  <v-row class="mt-n3 mb-3">
    <v-col align="center">
      <span class="text-h5 font-weight-bold"> {{ title }} </span>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const { title } = defineProps(["title"]);
</script>

<style scoped></style>