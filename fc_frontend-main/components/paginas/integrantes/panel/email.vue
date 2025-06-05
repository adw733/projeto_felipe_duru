<template>
    <v-expansion-panel :key="componentKey">
      <v-expansion-panel-title>
        <v-row>
          <v-col align="start" cols="10">
            <span class="text-h6 font-weight-medium"> Emails </span>
          </v-col>
          <v-col v-if="!emails[0]?.id" cols="2">
            <v-icon large color="red"> mdi-circle-small </v-icon>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="my-1">
          <div v-if="pageModeView">
            <v-row justify="center">
              <v-col align="center">
                <a :href="`mailto:${emails[0]?.email}`">{{ emails[0]?.email }}</a>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-row justify="center">
              <v-col class="mt-n2">
                <v-text-field
                  v-model="emails[0].email"
                  label="Email"
                  variant="underlined"
                  type="email"
                />
              </v-col>
            </v-row>            
          </div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </template>
  
  <script setup lang="ts">
  import { PessoaEmail } from "../../../../types/pessoas/pessoa-email";
import { Pessoa } from "../../../../types/pessoas/pessoa";
import { useUserStore } from "../../../../stores/users/user";
  
  const props = defineProps({
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
  
  /// EMAIL
  const emails = ref<Array<PessoaEmail>>(props.pessoa.pessoasEmails || new Array<PessoaEmail>)

  </script>
  
  <style scoped></style>
  