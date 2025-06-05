<template>
  <div class="text-center">
    <v-btn
      append-icon="mdi-login"
      class="ml-10 mr-5"
      color="#009F8A"
      size="small"
      theme="dark"
      variant="flat"
    >
      Entrar

      <v-dialog
        v-model="dialog"
        activator="parent"
        scrollable
        max-width="500"
        persistent
        theme="light"
        transition="dialog-top-transition"
      >
        <v-card>
          <v-toolbar color="#009F8A" density="comfortable" theme="dark">
            <v-row align="center">
              <v-col cols="2">
                <v-btn v-if="esqueceuSenha" icon @click="clickVoltar">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer v-else />
              </v-col>
              <v-col align="center" cols="8">
                <span class="text-h5 text-uppercase">
                  {{ esqueceuSenha ? "Alterar senha" : "Login" }}
                </span>
              </v-col>
              <v-col align="end" cols="2">
                <v-btn icon @click="clickClose">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-toolbar>
          <v-card-text style="min-height: 180px">
            <div v-if="!esqueceuSenha">
              <v-form v-model="form" @submit.prevent="onSubmitFazerLogin">
                <v-row justify="center">
                  <v-col align="center">
                    <v-text-field
                      v-model="email"
                      class="mb-2"
                      label="E-mail"
                      prepend-icon="mdi-account"
                      :readonly="loading"
                      :rules="[rules.email]"
                      type="email"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col align="center">
                    <v-text-field
                      v-model="password"
                      autocomplete="on"
                      label="Senha"
                      prepend-icon="mdi-lock-outline"
                      :readonly="loading"
                      :rules="[rules.senha]"
                      type="password"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <br />

                <v-row justify="center">
                  <v-col align="center">
                    <v-btn
                      block
                      color="success"
                      :disabled="!form"
                      :loading="loading"
                      size="large"
                      type="submit"
                      variant="flat"
                    >
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <v-row class="mt-4" justify="center" size="small">
                <v-col align="center">
                  <span class="text-subtitle-1">
                    Esqueceu sua senha?
                    <v-btn
                      color="blue"
                      variant="text"
                      @click="esqueceuSenha = !esqueceuSenha"
                    >
                      clique aqui
                    </v-btn>
                  </span>
                </v-col>
              </v-row>

              <v-divider class="mt-2" />

              <v-row class="mt-3" justify="center">
                <v-col align="center" cols="8">
                  <span class="text-h6"> Não tem cadastro? </span>
                </v-col>
              </v-row>

              <v-row class="mt-n2 mb-2" justify="center">
                <v-col align="center" cols="8">
                  <v-btn
                    block
                    color="success"
                    elevation="5"
                    @click="clickCadastrar"
                    >Cadastre-se</v-btn
                  >
                </v-col>
              </v-row>
            </div>
            <div v-else>
              <v-form v-model="form" @submit.prevent="onSubmitAlterarSenha">
                <v-row justify="center">
                  <v-col align="center">
                    <v-text-field
                      v-model="email"
                      class="mb-2"
                      label="E-mail"
                      prepend-icon="mdi-account"
                      :readonly="loading"
                      :rules="[rules.email]"
                      type="email"
                      variant="underlined"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center">
                  <v-col align="center">
                    <v-btn
                      block
                      color="success"
                      :disabled="!form"
                      :loading="loading"
                      size="large"
                      type="submit"
                      variant="flat"
                    >
                      Enviar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-btn>
    <BasesSnackbar
      v-if="showSnackbar"
      v-model="showSnackbar"
      @close="closeSnackBar()"
      @confirm="confirmSnackBar()"
    />
  </div>

</template>

<script setup lang="ts">
import { Login } from "../../types/login/login";
import { useSnackbarStore } from "../../stores/variaveis/snackbar";
import { useConstantesStore } from "../../stores/variaveis/constantes";
import { snackbarInterface } from "../../types/variaveis/snackbar";
import { useUserStore } from "../../stores/users/user";

// CONTEUDO
const router = useRouter();
const dialog = ref<boolean>(false);
const esqueceuSenha = ref<boolean>(false);
const form = ref<boolean>(false);
const email = ref<string>("");
const password = ref<string>("");
const loading = ref<boolean>(false);
const rules = ref({
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "E-mail inválido.";
  },

  senha: (value: string) => {
    return !!value || "E-mail inválido.";
  },
});

const snackbarStore = useSnackbarStore();
const snackbarDados = JSON.parse(JSON.stringify(snackbarStore.snackbar));
const setSnackbar = snackbarStore.set;

const constantesStore = useConstantesStore();
const constantes = constantesStore;

const userStore = useUserStore();
const setUser = userStore.setUser;

const clickCadastrar = () => {
  clickClose();
  setTimeout(() => {
    router.push("/cadastro");
  }, 20);
};

const clickClose = () => {
  dialog.value = false;
  esqueceuSenha.value = false;
  form.value = false;
  email.value = "";
  password.value = "";
  loading.value = false;
};

const clickVoltar = () => {
  esqueceuSenha.value = false;
};

const onSubmitFazerLogin = async () => {
  if (!form) return;
  loading.value = true;

  try {
    const body: Login = {
      email: email.value,
      senha: password.value,
    };

    const res = await post("auth/login", body);

    console.log(res)
    setUser(res, true);
    clickClose();
    reloadNuxtApp({ path: "/dashboard" });
  } catch (err: any) {
    snackbarSet({
      titulo: "LOGIN",
      mensagem: err.response._data.message,
      color: "errorSnackbar",
      timeout: 3000,
      isConfirm: false,
    });
  } finally {
    console.log(snackbarDados.timeout + constantes.extraTimeOut)
    setTimeout(() => {
      showSnackbar.value = false;
      loading.value = false;
    }, snackbarDados.timeout + constantes.extraTimeOut);
  }
};

const onSubmitAlterarSenha = () => {
  if (!form) return;
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
};

const showSnackbar = ref<boolean>(false);

const snackbarSet = (object: snackbarInterface) => {
  showSnackbar.value = true;
  setSnackbar(object);
};

const closeSnackBar = () => {
  console.log("fechou");
};

const confirmSnackBar = () => {
  console.log("confirmou");
};
</script>

<style scoped></style>
