<template>
  <div v-if="pessoa" :key="componentKey">
    <PaginasTitulos title="Perfil"></PaginasTitulos>
    <v-row justify="center">
      <v-col align="center" cols="12" md="8">
        <v-row>
          <v-col>
            <v-tooltip text="Adicionar imagem">
              <template v-slot:activator="{ props }">
                <v-avatar
                  v-bind="props"
                  class="overflow-hidden grey avatar"
                  size="70px"
                  @click="clickAnexo"
                >
                  <v-img
                    v-if="pessoa.anexo"
                    aspect-ratio="1"
                    :src="pessoa.anexo.url"
                  />
                  <v-icon v-else dark size="70px"> mdi-account </v-icon>
                </v-avatar>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
        <!-- <v-row class="my-n7">
          <v-col>  
            <v-btn variant="text" class="text-body-2">
              <v-icon size="large"> mdi-camera </v-icon> <span class="ml-1"> adicionar imagem</span>
            </v-btn>         
          </v-col>
        </v-row> -->
        <v-row v-if="isPessoaJuridica">
          <v-col>
            <v-col cols="12" md="6" class="text-center">
              <v-chip
                v-if="pessoa.isFornecedor"
                class="text-body-1"
                variant="outlined"
                size="x-small"
              >
                Fornecedora
              </v-chip>
              <v-chip
                v-else
                class="text-body-1"
                variant="outlined"
                size="x-small"
              >
                Compradora
              </v-chip>
            </v-col>
          </v-col>
        </v-row>

        <v-row v-if="pessoa.nome">
          <v-col>
            <span class="text-h6 font-weight-bold">
              {{ pessoa.nome }}
            </span>
          </v-col>
        </v-row>

        <v-row v-if="pessoa.nomeAlternativo" class="mt-n3">
          <v-col>
            <span class="text-body-2 font-weight-bold"> Fantasia: </span>

            <span class="text-body-1 font-weight-medium">
              {{ pessoa.nomeAlternativo }}
            </span>
          </v-col>
        </v-row>

        <v-row v-if="pessoa.dataNascimento" class="mt-n5">
          <v-col>
            <span class="text-body-2 font-weight-bold">
              {{ `Data ${isPessoaJuridica ? "abertura" : "nascimento"}:` }}
            </span>

            <span class="text-body-1 font-weight-medium">
              {{ dateFormat(pessoa.dataNascimento, "dd/MM/yyyy") }}
            </span>
          </v-col>
        </v-row>

        <v-row
          v-if="isPessoaJuridica && pessoa.formatoJuridicoId"
          class="mt-n3"
        >
          <v-col>
            <span class="text-body-2 font-weight-bold">
              Formato jurídico:
            </span>

            <span class="text-body-1 font-weight-medium">
              {{
                tipoItemStore.getBy(pessoa.formatoJuridicoId)?.nomeAlternativo
              }}
            </span>
          </v-col>
        </v-row>

        <v-row
          v-if="isPessoaJuridica && pessoa.regimeTributarioId"
          class="mt-n3"
        >
          <v-col>
            <span class="text-body-2 font-weight-bold">
              Regime tributário:
            </span>

            <span class="text-body-1 font-weight-medium">
              {{
                tipoItemStore.getBy(pessoa.regimeTributarioId)?.nomeAlternativo
              }}
            </span>
          </v-col>
        </v-row>

        <v-row v-if="isPessoaJuridica && pessoa.porteId" class="mt-n3">
          <v-col>
            <span class="text-body-2 font-weight-bold"> Porte: </span>

            <span class="text-body-1 font-weight-medium">
              {{ tipoItemStore.getBy(pessoa.porteId)?.nomeAlternativo }}
            </span>
          </v-col>
        </v-row>

        <v-row v-if="isPessoaJuridica && pessoa.areaAtuacao" class="mt-n3">
          <v-col>
            <span class="text-body-2 font-weight-bold">
              Atuação principal:
            </span>

            <span class="text-body-1 font-weight-medium">
              {{ pessoa.areaAtuacao }}
            </span>
          </v-col>
        </v-row>

        <v-row
          v-if="isPessoaJuridica && pessoa.valorDiretorAprova"
          class="mt-n3"
        >
          <v-col>
            <span class="text-body-2 font-weight-bold">
              Diretor aprova a partir de:
            </span>

            <span class="text-body-1 font-weight-medium">
              {{
                numberFormat(pessoa.valorDiretorAprova, { style: "currency" })
              }}
            </span>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-expansion-panels multiple v-model="panels">
              <PaginasPerfilPanelDocumento
                v-if="isPessoaJuridica"
                v-model="pessoa.pessoasDocumentos"
                :pessoa="pessoa"
                :pageModeView="true"
              />
              <PaginasPerfilPanelTelefone
                v-model="pessoa.pessoasTelefones"
                :pessoa="pessoa"
                :pageModeView="true"
              />
              <PaginasPerfilPanelEndereco
                v-if="isPessoaJuridica"
                v-model="pessoa.pessoasEnderecos[0]"
                :pessoa="pessoa"
                :pageModeView="true"
              />
              <PaginasPerfilPanelEmail
                v-model="pessoa.pessoasEmails[0]"
                :pessoa="pessoa"
                :pageModeView="true"
              />
              <PaginasPerfilPanelSite
                v-if="isPessoaJuridica"
                v-model="pessoa.pessoasSites"
                :pessoa="pessoa"
                :pageModeView="true"
              />
              <PaginasPerfilPanelPerfil
                v-model="pessoa.pessoasPerfis"
                :pessoa="pessoa"
                :pageModeView="true"
              />
              <PaginasPerfilPanelGrupoItem
                v-if="isPessoaJuridica"
                v-model="pessoa.pessoasGruposItens"
                :pessoa="pessoa"
                :pageModeView="true"
              />
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <dialog-anexo
      v-model="showAnexo"
      pagina="perfil"
      :registroId="pessoa.id"
      :tipoId="1301"
      :anexo="pessoa.anexo"
      @changeAnexo="changeAnexo"
    />
    <PaginasBottomNavigation
      pagina="perfil"
      :pageModeView="true"
      :extra-buttons="{
        hasEdit: true,
      }"
    ></PaginasBottomNavigation>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "../../stores/users/user";
import { useTipoItemStore } from "../../stores/tipos/tipo-item";
import { Anexo } from "../../types/anexos/anexo";

/// PAGINA
definePageMeta({
  layout: "menu",
});

/// CONTEUDO
const userStore = useUserStore();
const pessoa = ref<any>(JSON.parse(JSON.stringify(userStore.getPessoa)));

const tipoItemStore = useTipoItemStore();

const panels = ref<Array<any>>([]);

const isPessoaJuridica = computed(() => {
  return pessoa.value.tipoId === tipoItemStore.getBy("pessoaJuridica")?.id;
});

/// ANEXO
const showAnexo = ref<boolean>(false);
const clickAnexo = () => {
  showAnexo.value = true;
};

const changeAnexo = (anexo: Anexo | null) => {
  showAnexo.value = false;
  pessoa.anexo = anexo;  
  userStore.user.pessoa.pessoa.anexo = anexo;
  pessoa.value = JSON.parse(JSON.stringify(userStore.getPessoa));
  
  updateKey();
}

/// COMPONENTKEY
const componentKey = ref<number>(1)
const updateKey = () => {
  componentKey.value += 1;
}

/// HEAD
setTimeout(() => {
  useHead({
    title: "Portal Fecom | Perfil",
  });
}, 150);
</script>
<style scoped>
.date {
  color: #7a7a7a;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 20px;
  border-radius: 5px;
  width: 100%;
}

.avatar {
  cursor: pointer;
}

.avatar:hover {
  background-color: #e0e0e0;
}
</style>
