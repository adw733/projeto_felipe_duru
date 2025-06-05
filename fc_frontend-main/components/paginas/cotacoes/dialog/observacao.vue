<template>
  <v-dialog
    v-model="model"
    max-width="800"
    min-width="350"
    transition="dialog-bottom-transition"
  >
    <v-toolbar
      color="portalColor"
      class="fixed-bar"
      density="compact"
      theme="dark"
    >
      <v-row align="center">
        <v-col cols="2"></v-col>
        <v-col align="center" cols="8">
          <v-toolbar-title>Observação</v-toolbar-title>
        </v-col>
        <v-col align="center" cols="2">
          <v-btn icon @click="model = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-card rounded="0" class="hide-overflow">
      <v-card-text class="px-2">
        <v-container>
          <v-textarea
            :model-value="observacao"
            label="Observações"
            readonly
            color="grey"
            rows="3"
            outlined
          ></v-textarea>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  observacao: {
    type: String,
  },
});

// EMIT
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>

<style scoped></style>
