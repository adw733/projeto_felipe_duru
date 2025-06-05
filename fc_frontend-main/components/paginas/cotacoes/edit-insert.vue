<template>
  <v-form v-if="cotacao" ref="formCotacao">
    <v-container class="my-5" fluid>
      <v-row>
        <v-col cols="12" md="6">
          <div :class="mdAndUp ? 'v-sticky-bar' : ''">
            <v-card class="pa-4">
              <v-row>
                <v-col cols="6">
                  <span class="text-h6 font-weight-medium">
                    #{{ cotacao.id }}
                  </span>
                </v-col>
                <v-col v-if="cotacao.data" align="end" cols="6">
                  <span class="text-h6 font-weight-medium">
                    {{ dateFormat(cotacao.data, "dd/MM/yyyy") }}
                  </span>
                </v-col>
              </v-row>

              <v-row class="mt-n2">
                <v-col align="center">
                  <v-chip
                    v-if="controleStore.getModalidade"
                    class="text-body-1"
                    outlined
                    size="x-small"
                  >
                    {{
                      tipoItemStore.getBy(controleStore.getModalidade)?.codigo
                    }}
                  </v-chip>
                  <v-menu
                    v-if="cotacao.statusId"
                    v-model="menuStatus"
                    :disabled="
                      !cotacao.id ||
                      !isModoCompras ||
                      statusStore.getBy('Cadastro')?.id !== cotacao.statusId
                    "
                    bottom
                    right
                    transition="scale-transition"
                    origin="top left"
                  >
                    <template v-slot:activator="{ props: propsMenu }">
                      <v-chip
                        v-bind="propsMenu"
                        class="text-body-1 ml-2"
                        :color="
                          statusStore.getBy(cotacao.statusId)?.options.cor
                        "
                        size="x-small"
                      >
                        {{ statusStore.getBy(cotacao.statusId)?.nome }}
                        <v-icon
                          v-if="
                            cotacao.id &&
                            statusStore.getBy('Cadastro')?.id ===
                              cotacao.statusId
                          "
                          right
                          size="x-small"
                        >
                          mdi-pencil-outline
                        </v-icon>
                      </v-chip>
                    </template>
                    <v-card width="300">
                      <v-list max-height="300" density="compact">
                        <v-list-item
                          v-for="(statusCombo, i) of status"
                          density="compact"
                          class="py-1"
                          :key="i"
                          @click="clickStatus(statusCombo.value)"
                        >
                          <v-row>
                            <v-col align="center">
                              <v-btn
                                class="text-body-2"
                                :color="
                                  statusStore.getBy(statusCombo.value)?.options
                                    .cor
                                "
                                size="small"
                                block
                                rounded
                              >
                                {{ statusCombo.text }}
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>

                  <v-menu
                    v-model="menuPrioridades"
                    :disabled="
                      !isModoCompras ||
                      statusStore.getBy('Cadastro')?.id !== cotacao.statusId
                    "
                    bottom
                    right
                    transition="scale-transition"
                    origin="top left"
                  >
                    <template v-slot:activator="{ props: propsPrioridade }">
                      <v-chip
                        v-bind="propsPrioridade"
                        class="text-body-1 ml-2"
                        :color="
                          tipoItemStore.getBy(cotacao.prioridadeId || '')
                            ?.options.cor
                        "
                        size="x-small"
                      >
                        {{
                          tipoItemStore.getBy(cotacao.prioridadeId || "")
                            ?.codigo
                        }}
                        <v-icon
                          v-if="
                            statusStore.getBy('Cadastro')?.id ===
                            cotacao.statusId
                          "
                          right
                          size="x-small"
                        >
                          mdi-pencil-outline
                        </v-icon>
                      </v-chip>
                    </template>
                    <v-card width="300">
                      <v-list max-height="300" density="compact">
                        <v-list-item
                          v-for="(prioridadeCombo, i) of prioridades"
                          density="compact"
                          class="py-1"
                          :key="i"
                          @click="clickPrioridade(prioridadeCombo.value)"
                        >
                          <v-row>
                            <v-col align="center">
                              <v-btn
                                class="text-body-2"
                                :color="
                                  tipoItemStore.getBy(prioridadeCombo.value)
                                    ?.options.cor
                                "
                                size="small"
                                block
                                rounded
                              >
                                {{ prioridadeCombo.text }}
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="cotacao.nome"
                    :disabled="!isModoCompras"
                    label="Nome"
                    required
                    clearable
                    :rules="rules.nome"
                  />
                </v-col>
              </v-row>

              <v-row class="mt-n7">
                <v-col>
                  <v-menu offset-y :disabled="!isModoCompras">
                    <template v-slot:activator="{ props: propsEntrega }">
                      <v-text-field
                        v-model="cotacao.enderecoEntrega"
                        v-bind="propsEntrega"
                        :disabled="!isModoCompras"
                        label="Endereço entrega"
                        required
                        :rules="rules.enderecoEntrega"
                        clearable
                      />
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(item, index) in enderecoFormat1"
                        :key="index"
                        @click="clickEnderecoEntrega(item)"
                      >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row class="mt-n7">
                <v-col>
                  <v-menu offset-y :disabled="!isModoCompras">
                    <template v-slot:activator="{ props: propsCobranca }">
                      <v-text-field
                        v-model="cotacao.enderecoCobranca"
                        v-bind="propsCobranca"
                        :disabled="!isModoCompras"
                        label="Endereço cobrança"
                        required
                        :rules="rules.enderecoCobranca"
                        clearable
                      />
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(item, index) in enderecoFormat1"
                        :key="index"
                        @click="clickEnderecoCobranca(item)"
                      >
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row class="mt-n7">
                <v-col>
                  <v-text-field
                    v-model="cotacao.centroCusto"
                    :disabled="!isModoCompras"
                    label="Centro de custo"
                    required
                    clearable
                    :rules="rules.centroCusto"
                  />
                </v-col>
              </v-row>
              <v-row class="mt-n7">
                <v-col cols="12">
                  <v-select
                    v-model="cotacao.regioes"
                    :disabled="
                      !isModoCompras ||
                      statusStore.getBy('Cadastro')?.id !== cotacao.statusId
                    "
                    clearable
                    :items="regioes"
                    label="Região do fornecedor"
                    itemValue="value"
                    itemTitle="text"
                    multiple
                  >
                    <template
                      v-slot:selection="{
                        item,
                        index,
                      }: {
                        item: any,
                        index: number,
                      }"
                    >
                      <v-chip size="small">
                        <span>{{ item.title }}</span>
                      </v-chip>
                    </template>
                  </v-select>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.tipoId" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold">Tipo: </span>
                  <span class="text-body-2">
                    {{ tipoItemStore.getBy(cotacao.tipoId)?.codigo }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.empresaId && !isModoCompras" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold">Cliente: </span>
                  <span class="text-body-2">
                    {{ cotacao.empresa?.nome }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="isModoCompras" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold"
                    >Solicitante:
                  </span>
                  <span class="text-body-2">
                    {{
                      cotacao.solicitante?.nomeAlternativo ||
                      cotacao.solicitante?.nome
                    }}
                  </span>
                </v-col>
              </v-row>

              <v-row v-if="cotacao.compradorId && isModoCompras" class="mt-n4">
                <v-col>
                  <span class="text-body-2 font-weight-bold">Comprador: </span>
                  <span class="text-body-2">
                    {{
                      cotacao.comprador?.nomeAlternativo ||
                      cotacao.comprador?.nome
                    }}
                  </span>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>
        <v-col cols="12" md="6" :class="mdAndUp ? 'mt-n3' : 'px-0 '">
          <v-container class="py-0 mx-0 px-3">
            <v-row>
              <v-col>
                <v-expansion-panels multiple v-model="panels">
                  <PaginasCotacoesPanelResposta
                    v-if="!isModoCompras"
                    v-model="cotacao.cotacoesRespostas"
                    :cotacao="cotacao"
                    :pageModeView="false"
                  />
                  <PaginasCotacoesPanelItem
                    v-model="cotacao.cotacoesItens"
                    :cotacao="cotacao"
                    :pageModeView="false"
                  />
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  <PaginasBottomNavigation
    :pagina="`cotacoes/${uuid}`"
    :rota="uuid"
    :pageModeView="false"
    @salvar="clickSalvar"
  ></PaginasBottomNavigation>
</template>

<script setup lang="ts">
import { useStatusStore } from "../../../stores/status/status";
import { useTipoItemStore } from "../../../stores/tipos/tipo-item";
import { useControleStore } from "../../../stores/variaveis/controle";
import { useRegiaoStore } from "../../../stores/regioes/regiao";
import { useMenuStore } from "../../../stores/menus/menu";
import { Cotacao } from "../../../types/cotacoes/cotacao";
import { Status } from "../../../types/status/status";
import { useTipoStore } from "../../../stores/tipos/tipo";
import { useUserStore } from "../../../stores/users/user";
import { PessoaEndereco } from "../../../types/pessoas/pessoa-endereco";
import { useCidadeStore } from "../../../stores/cidades/cidade";
import { useEstadoStore } from "../../../stores/estados/estado";
import { Regiao } from "../../../types/regioes/regiao";
import { CotacaoResposta } from "../../../types/cotacoes/cotacao-resposta";

export interface Props {
  cotacaoProp: Cotacao;
  uuid?: string | string[];
}
const props = defineProps<Props>();

/// EMIT
const emit = defineEmits(["salvar"]);

/// PINIA
const statusStore = useStatusStore();
const menuStore = useMenuStore();
const tipoStore = useTipoStore();
const tipoItemStore = useTipoItemStore();
const controleStore = useControleStore();
const cidadeStore = useCidadeStore();
const estadoStore = useEstadoStore();
const regiaoStore = useRegiaoStore();
const userStore = useUserStore();

/// COTACAO
const cotacao = ref<Cotacao>(props.cotacaoProp);

const cotacaoResposta = ref<CotacaoResposta>(
  cotacao?.value?.cotacoesRespostas
    ? cotacao.value.cotacoesRespostas[0]
    : ({} as CotacaoResposta)
);

/// STATUS
const menuStatus = ref<boolean>(false);
const status = computed(() => {
  return statusStore.getAll
    .filter((status: Status) =>
      status?.options?.menus?.includes(
        menuStore.getBy("Cotações")?.nome as string
      )
    )
    .filter((status) => cotacao.value.statusId != status.id)
    .map((status) => {
      return {
        value: status.id,
        text: status.nome,
      };
    });
});
const clickStatus = (statusId: number) => {
  cotacao.value.statusId = statusId;
};

/// PRIORIDADE
const menuPrioridades = ref<boolean>(false);
const prioridades = computed(() => {
  return tipoItemStore
    .getByTipoId(tipoStore.getBy("prioridade")?.id || 0)
    .map((status) => {
      return {
        value: status.id,
        text: status.codigo,
      };
    });
});

const clickPrioridade = (prioridadeId: number) => {
  cotacao.value.prioridadeId = prioridadeId;
};

/// ENDERECO
const clickEnderecoEntrega = (item: string) => {
  cotacao.value.enderecoEntrega = item;
};

const clickEnderecoCobranca = (item: string) => {
  cotacao.value.enderecoCobranca = item;
};

const enderecoFormat1 = computed(() => {
  const enderecos = userStore.getEmpresa.pessoasEnderecos.map(
    (pessoaEndereco: PessoaEndereco) => {
      const endereco1 = `${pessoaEndereco.logradouro}, ${pessoaEndereco.numero}, ${pessoaEndereco.complemento} - ${pessoaEndereco.bairro}`;
      const endereco2 = `${
        cidadeStore.getBy(pessoaEndereco.cidadeId)?.nome
      } - ${estadoStore.getBy(pessoaEndereco.estadoId)?.nomeAlternativo}, ${
        pessoaEndereco.cep
      }`;

      return `${endereco1} ${endereco2}`;
    }
  );

  return enderecos;
});

/// REGIAO
const regioes = computed(() => {
  return regiaoStore.getRegioes.map((regiao: Regiao) => {
    return {
      value: regiao.id,
      text: regiao.nome,
    };
  });
});

/// MODO
const isModoCompras = computed(() => {
  return (
    tipoItemStore.getBy("modalidadeCompras")?.id === controleStore.getModalidade
  );
});

/// PANEL
const panels = ref<Array<any>>([]);

/// SALVAR
const clickSalvar = async () => {
  emit("salvar", cotacao.value);
};

/// RULES
interface RulesCotacao {
  nome: any;
  enderecoEntrega: any;
  enderecoCobranca: any;
  centroCusto: any;
}

const rules = ref<RulesCotacao>({
  nome: [
    (v: String) => (v && v.length > 0) || "Nome obrigatório",
    (v: String) => v.length <= 30 || "Max 30 caracteres",
  ],
  enderecoEntrega: [
    (v: String) => (v && v.length > 0) || "Endereço de entrega obrigatório",
    (v: String) => v.length <= 300 || "Max 300 caracteres",
  ],
  enderecoCobranca: [
    (v: String) => (v && v.length > 0) || "Endereço de cobrança obrigatório",
    (v: String) => v.length <= 300 || "Max 300 caracteres",
  ],
  centroCusto: [
    (v: String) => (v && v.length > 0) || "Centro de custo obrigatório",
    (v: String) => v.length <= 300 || "Max 300 caracteres",
  ],
});
</script>

<style scoped></style>
