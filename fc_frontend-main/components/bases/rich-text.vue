<template>
  <v-container>
    <v-row class="mb-12">
      <v-col align="start">
        <QuillEditor
          v-model:content="model"
          theme="snow"
          contentType="html"
          toolbar="essential"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const props = defineProps({
  modelValue: {
    type: String,
  },
});

// EMIT
const emit = defineEmits(["update:modelValue"]);

/// CONTEUDO
const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

if (!process.server) {
  const { QuillEditor } = await import("@vueup/vue-quill");
  const { vueApp } = useNuxtApp();
  if (!vueApp._context.components.QuillEditor)
    vueApp.component("QuillEditor", QuillEditor);
}
</script>

<style></style>
