<template>
  <v-container class="my-5">
    <v-row>
      <v-col cols="12">
        <p class="text-center">
          <span :class="`text-h4 font-weight-bold text-uppercase`">
            Como podemos ajudar?
          </span>
        </p>
        <p class="text-center">
          <span class="text-subtitle">
            Envie suas dúvidas, críticas ou sugestões.
          </span>
        </p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <v-row>
          <v-col cols="12">
            <v-icon color="green">mdi-whatsapp</v-icon>
            <span class="ml-2">(11) 9 6397-5831</span>
          </v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="12">
            <v-icon color="blue">mdi-at</v-icon>
            <span class="ml-2">contato@portalfecom.com.br</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 text-center mb-1">
                Envie sua mensagem
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-container>
            <v-text-field
              v-model="contato.nome"
              clearable
              label="Nome"
              :rules="rules.required"
            ></v-text-field>
            <v-text-field
              v-model="contato.nomeEmpresa"
              clearable
              label="Nome da empresa"
              :rules="rules.required"
            ></v-text-field>
            <v-text-field
              v-model="contato.email"
              clearable
              label="E-mail"
              :rules="rules.email"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="contato.celular"
              v-maska:[maskConfig()]
              clearable
              label="Celular"
              type="tel"
            />
            <v-select
              v-model="contato.subject"
              :items="assuntos"
              label="Assunto"
              clearable
              :rules="rules.required"
            ></v-select>
            <v-textarea
              v-model="contato.mensagem"
              clearable
              name="mensagem"
              label="Mensagem"
              :rules="rules.required"
            ></v-textarea>
            <v-btn color="portalColor" class="mt-4" @click="clickEnviarEmail()">
              Enviar email
            </v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <BasesSnackbar v-if="showSnackbar" />
</template>

<script setup lang="ts">
import { Contato } from "../types/contatos/contato";
import { SendEmailInterface } from "../types/email/email";
import { snackbarInterface } from "../types/variaveis/snackbar";
import { useControleStore } from "../stores/variaveis/controle";
import { useSnackbarStore } from "../stores/variaveis/snackbar";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
export interface Rules {
  required: any;
  email: any;
}

const contato = ref<Contato>({
  nome: "",
  nomeEmpresa: "",
  email: "",
  celular: "",
  subject: "",
  mensagem: "",
});

const assuntos = ref<Array<String>>([
  "Dúvida",
  "Crítica",
  "Sugestão",
  "Cadastro de subgrupos",
  "Outros",
]);

const maskConfig = () => {
  const options = {
    mask: "+55 (##) # ####-####",
  };

  return options;
};

const controle = useControleStore();

const clickEnviarEmail = async () => {
  controle.setLoading(true);
  try {
    const email: SendEmailInterface = {
      origin: "contato",
      subject: contato.value.subject as string,
      context: {
        nome: contato.value.nome as string,
        nomeempresa: contato.value.nomeEmpresa as string,
        celular: contato.value.celular as string,
        mensagem: contato.value.mensagem as string,
        email: contato.value.email as string,
      },
    };

    const res = await post(`email`, email);
    controle.setLoading(true);

    snackbarSet({
      titulo: "CONTATO",
      mensagem: res,
      color: "successSnackbar",
      timeout: 3000,
      isConfirm: false,
    });

    contato.value = {} as Contato;
  } catch (err) {
    console.log(err);
  } finally {
    controle.setLoading(false);
  }
};

const showSnackbar = ref<boolean>(false);

const snackbarSet = (object: snackbarInterface) => {
  showSnackbar.value = true;
  setSnackbar(object);
};

const snackbarStore = useSnackbarStore();
const setSnackbar = snackbarStore.set;

const rules = ref<Rules>({
  required: [(value: any) => !!value || "Obrigátorio."],
  email: [
    (value: any) => !!value || "Obrigatório",
    (value: any) => /.+@.+\..+/.test(value) || "E-mail inválido",
  ],
});

/// HEAD
useHead({
  title: "Portal Fecom | Contatos",
  meta: [
    {
      name: "Contatos",
      content:
        "Contatos, Atendimento, Ajuda, compras, portal de compras, ferramentas de compras",
    },
  ],
  // script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
});
</script>

<style lang="scss" scoped></style>
