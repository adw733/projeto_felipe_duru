<template>
  <v-container>
    <v-form v-model="form">
      <v-row v-if="convite" justify="center">
        <v-col align="center" cols="12" md="8">
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="convite.nomeEmpresa"
                clearable
                label="Nome da empresa"
                variant="underlined"
                :rules="rules.nomeEmpresa"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="convite.documentoEmpresa"
                v-maska:[maskDocumentoConfig()]
                label="CNPJ"
                variant="underlined"
                type="tel"
                :readonly="!!convite.id"
                :rules="rules.CNPJ"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="convite.nomeContato"
                clearable
                label="contato da empresa"
                variant="underlined"
                :rules="rules.nomeContato"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="convite.emailContato"
                clearable
                label="E-mail do contato"
                variant="underlined"
                type="email"
                :rules="rules.email"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="convite.celularContato"
                v-maska:[maskTelefoneConfig()]
                clearable
                label="Celular do contato"
                variant="underlined"
                type="tel"
                :rules="rules.celular"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

  <BasesSnackbar v-if="showSnackbar" />

  <PaginasBottomNavigation
    :pagina="`convites/${convite.uuid}`"
    :pageModeView="false"
    @salvar="clickSalvar"
  ></PaginasBottomNavigation>
</template>

<script setup lang="ts">
import { snackbarInterface } from "../../../types/variaveis/snackbar";
import { Convite } from "../../../types/convites/convite";
import { useSnackbarStore } from "../../../stores/variaveis/snackbar";

export interface Rules {
  required: any;
  email: any;
  CNPJ: any;
  nomeEmpresa: any;
  nomeContato: any;
  celular: any;
}

// PINIA
export interface Props {
  conviteProp: Convite;
}

const props = defineProps<Props>();
const emit = defineEmits(["salvar"]);

/// CONVITE
const convite = ref<any>(props.conviteProp);

/// FORM
const form = ref<boolean>(false);

/// MASK
const maskDocumentoConfig = () => {
  const options = {
    mask: "##.###.###/####-##",
  };
  return options;
};
const maskTelefoneConfig = () => {
  const options = {
    mask: "(##) # ####-####",
  };
  return options;
};

const clickSalvar = async () => {
  if (form.value) {
    emit("salvar", convite.value);
  } else {
    snackbarSet({
      titulo: "CAMPOS OBRIGATÓRIOS",
      mensagem: "Prrencher os campos obrigatórios corretamente",
      color: "errorSnackbar",
      timeout: 3000,
      isConfirm: false,
    });
  }
};

// SNACKBAR
const showSnackbar = ref<boolean>(false);

const snackbarSet = (object: snackbarInterface) => {
  showSnackbar.value = true;
  setSnackbar(object);
};

const snackbarStore = useSnackbarStore();
const snackbarDados = JSON.parse(JSON.stringify(snackbarStore.snackbar));
const setSnackbar = snackbarStore.set;

const rules = ref<Rules>({
  required: [(value: any) => !!value || "Obrigátorio."],
  email: [
    (value: any) => !!value || "Obrigatório",
    (value: any) => /.+@.+\..+/.test(value) || "E-mail inválido",
  ],
  CNPJ: [
    (value: any) => !!value || "CNPJ é obrigatório",
    (value: any) => (value && value.length <= 18) || "CNPJ inválido",
  ],
  nomeEmpresa: [(value: any) => !!value || "Nome da empresa é obrigatório"],
  nomeContato: [(value: any) => !!value || "Nome do contato é obrigatório"],
  celular: [
    (value: any) => !!value || "Obrigatório",
    (value: any) => (value && value.length === 16) || "Celular inválido",
  ],
});
</script>

<style scoped>
.date {
  margin-top: -3px;
  padding-top: -10px;
  padding-bottom: 0px;
  padding-left: 0px;
  width: 100%;
  border-bottom: 1px solid #7a7a7a7a !important;
}
</style>
