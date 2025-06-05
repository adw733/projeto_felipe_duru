<template>
  <v-expansion-panel :key="componentKey">
    <v-expansion-panel-title>
      <v-row>
        <v-col align="start" cols="10">
          <span class="text-h6 font-weight-medium"> Emails </span>
        </v-col>
        <v-col v-if="!model.id" cols="2">
          <v-icon large color="red"> mdi-circle-small </v-icon>
        </v-col>
      </v-row>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <div class="my-1">
        <div v-if="pageModeView">
          <v-row justify="center">
            <v-col align="center">
              <a :href="`mailto:${model.email}`">{{ model.email }}</a>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-row justify="center">
            <v-col class="mt-n2">
              <v-text-field
                v-model="model.email"
                label="Email"
                variant="underlined"
                type="email"
                @change="changeEmail(model.email)"
              />
            </v-col>
          </v-row>
          <v-row v-if="showBotaoValidarEmail" class="mt-n5" justify="center">
            <v-col align="center">
              <v-btn
                variant="text"
                color="primary"
                @click="clickValidarEmail(model.email)"
              >
                Validar e-mail
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="showOtp" class="mt-n5" justify="center">
            <v-col align="center" style="max-width: 300px">
              codigoOTP
             <v-otp-input
             v-model="codigoOtp"
             length="6"
             ></v-otp-input> 
                          <!-- @change="codigoOTP(email)" -->
            </v-col>
          </v-row>
        </div>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { useUserStore } from "../../../../stores/users/user";
import { PessoaEmail } from "../../../../types/pessoas/pessoa-email";
import { Pessoa } from "../../../../types/pessoas/pessoa";

const props = defineProps({
  modelValue: {
    type: Object as PropType<PessoaEmail>,
    default: [],
  },
  pessoa: {
    type: Object as PropType<Pessoa>,
    required: true,
  },
  pageModeView: {
    type: Boolean,
    required: true,
  },
});

/// USER
const userStore = useUserStore();
const pessoaOriginal = ref<any>(userStore.getPessoa);

/// COMPONENTKEY
const componentKey = ref<number>(0);

const updateComponent = () => {
  componentKey.value += componentKey.value + 1;
};

// EMIT
const emit = defineEmits(["update:modelValue"]);

/// EMAIL
const showBotaoValidarEmail = ref<boolean>(false);
const showOtp = ref<boolean>(false);
const codigoOtp = ref<string>();
const model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

const changeEmail = (email: string) => {
  model.value.isAtivo = pessoaOriginal.value.pessoasEmails[0].email === email;
  showBotaoValidarEmail.value = !model.value.isAtivo;
  updateComponent();
};

const clickValidarEmail = (email: string) => {
    showBotaoValidarEmail.value = false
  showOtp.value = true;
};

/// RULES
const rules = ref({
  CNPJ: [
    (value: string | null) => !!value || "CNPJ é obrigatório",
    (value: string) => (value && value.length <= 18) || "CNPJ inválido",
  ],

  IE: [(value: string | null) => !!value || "IE é obrigatório"],
});
</script>

<style scoped></style>
