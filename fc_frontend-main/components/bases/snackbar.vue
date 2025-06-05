<template>
  <div>
    <v-snackbar v-model="model" :color="snackbarDados.color" :timeout="snackbarDados.timeout + constantes.extraTimeOut">
      <!-- vertical -->
      <v-progress-linear
        v-model="loading"
        :color="`${snackbarDados.color}Loading`"
        height="5"    
        striped    
        style="width: 100%"
      ></v-progress-linear>

      <v-row class="mt-1">
        <v-col>
          <span class="text-subtitle-1 font-weight-bold">{{
            snackbarDados.titulo
          }}</span>
        </v-col>
      </v-row>
      <v-row
        v-for="(mensagem, i) in snackbarDados.mensagem.split('\n')"
        :key="i"
        class="mt-n5"
      >
        <v-col>
          <span class="text-caption">{{ mensagem }}</span>
        </v-col>
      </v-row>

      <!-- <template v-slot:actions> -->
      <v-row v-if="snackbarDados.isConfirm" class="mt-n5">
        <v-col cols="6">
          <v-btn
            color="red"
            icon
            theme="dark"
            variant="text"
            @click="clickCancel()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col align="end" cols="6">
          <v-btn
            color="green"
            icon
            theme="dark"
            variant="text"
            @click="clickConfirm()"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <!-- </template> -->
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "../../stores/variaveis/snackbar";
import { useConstantesStore } from "../../stores/variaveis/constantes";

/// PROPS
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});

// EMIT
const emit = defineEmits(["update:modelValue", "close", "confirm"]);

/// CONTEUDO
const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

const loading = ref<number>(0);

const constantesStore = useConstantesStore();
const constantes = constantesStore;

const snackbarStore = useSnackbarStore();
const snackbarDados = JSON.parse(JSON.stringify(snackbarStore.snackbar));

const clickCancel = () => {
  model.value = false;
  snackbarStore.set(null);
  emit("close");
};

const clickConfirm = () => {
  model.value = false;
  const callback = snackbarDados.callback;
  snackbarStore.set(null);
  emit("confirm", callback);
};

const interval = setInterval(() => {
  loading.value += 100 / (snackbarDados.timeout / constantes.intervalTime);
}, constantes.intervalTime);

setTimeout(() => {
  clearInterval(interval);
  model.value = true;
}, snackbarDados.timeout + constantes.extraTimeOut);
</script>

<style scoped></style>
